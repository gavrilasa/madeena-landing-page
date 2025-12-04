// prisma/seed.ts

import "dotenv/config";
import { db } from "~/server/db";
import { subDays } from "date-fns";
import crypto from "crypto";

// Data master untuk variasi
const PATHS = [
  { url: "/", weight: 10 }, // Homepage paling ramai
  { url: "/news", weight: 6 },
  { url: "/contact/information", weight: 3 },
  { url: "/about/vision-mission", weight: 4 },
  { url: "/preschool/programs", weight: 5 },
  { url: "/primary/activities", weight: 5 },
  { url: "/registration/flow", weight: 8 }, // Halaman penting
  { url: "/about/staff-profile", weight: 2 },
];

const REFERRERS = [
  { name: "Direct/Internal", weight: 40 },
  { name: "Google", weight: 35 },
  { name: "Facebook", weight: 15 },
  { name: "Instagram", weight: 8 },
  { name: "WhatsApp", weight: 2 },
];

// Helper: Random integer
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper: Generate dummy hashes
const generateHashes = (count: number) => {
  return Array.from({ length: count }).map(() => crypto.randomUUID());
};

async function main() {
  console.log("🌱 Start seeding analytics data...");

  // 1. Bersihkan data lama agar tidak duplikat/konflik
  await db.dailyAnalytics.deleteMany({});
  console.log("🧹 Cleared old analytics data.");

  const dataToInsert = [];
  const DAYS_TO_SEED = 90; // Generate data 3 bulan ke belakang

  // 2. Loop mundur dari hari ini ke 90 hari lalu
  for (let i = 0; i < DAYS_TO_SEED; i++) {
    const date = subDays(new Date(), i);
    date.setUTCHours(0, 0, 0, 0); // Normalisasi ke tengah malam

    // Simulasi: Trafik lebih sepi di akhir pekan (Sabtu=6, Minggu=0)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const dailyVolumeModifier = isWeekend ? 0.6 : 1.0;

    // Loop setiap kombinasi Path x Referrer
    for (const pathObj of PATHS) {
      for (const refObj of REFERRERS) {
        // Tentukan apakah kombinasi ini dapat hit hari ini (probabilitas)
        // Semakin kecil weight, semakin jarang muncul
        if (Math.random() * 100 > pathObj.weight * refObj.weight) continue;

        // Hitung Views
        // Base view * Random factor * Weekend factor * Path popularity
        const baseViews = randomInt(5, 50);
        const views = Math.floor(
          baseViews * dailyVolumeModifier * (pathObj.weight / 5),
        );

        if (views === 0) continue;

        // Hitung Visitors (selalu <= Views, misal 70-90% dari views)
        const uniqueRatio = 0.7 + Math.random() * 0.25; // 0.7 - 0.95
        const visitors = Math.max(1, Math.floor(views * uniqueRatio));

        // Generate visitor hashes (hanya jika data terbaru untuk hemat storage simulasi)
        // Simpan hash hanya untuk 7 hari terakhir agar seeding tidak terlalu berat/lama
        const visitorHashes = i < 7 ? generateHashes(visitors) : [];

        dataToInsert.push({
          date,
          path: pathObj.url,
          referrerGroup: refObj.name,
          views,
          visitors,
          visitorHashes,
        });
      }
    }
  }

  // 3. Insert Batch menggunakan createMany (jauh lebih cepat)
  // Catatan: createMany tidak men-trigger @unique check di aplikasi level,
  // tapi karena kita sudah deleteMany di awal, ini aman.
  await db.dailyAnalytics.createMany({
    data: dataToInsert,
  });

  console.log(`✅ Seeding finished. Inserted ${dataToInsert.length} records.`);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
