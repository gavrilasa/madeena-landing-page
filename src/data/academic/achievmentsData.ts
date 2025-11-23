// src/data/academic/achievmentsData.ts

export interface AchievementItem {
  id: number;
  title: string;
  metric: string;
  metricLabel: string;
  image: string;
  link: string;
}

export interface AchievementPageData {
  intro: string;
  closing: string;
  items: AchievementItem[];
}

export const achievementsData: Record<"preschool" | "primary", AchievementPageData> = {
  preschool: {
    intro: `Meskipun masih di usia dini, anak-anak <strong>Preschool Al Madeena Islamic School</strong> telah menunjukkan semangat belajar dan kompetisi yang luar biasa. Melalui bimbingan guru dan dukungan orang tua, mereka berani tampil, berusaha, dan memberikan yang terbaik dalam berbagai ajang perlombaan baik di tingkat sekolah maupun luar sekolah.<br/><br/>
    Prestasi yang diraih bukan hanya menjadi kebanggaan sekolah, tetapi juga bukti nyata bahwa pendidikan di Al Madeena mampu menumbuhkan anak-anak yang <strong>percaya diri, berakhlak mulia, dan bersemangat meraih cita-cita.</strong>`,
    closing:
      "Prestasi ini menjadi motivasi bagi seluruh keluarga besar <strong>Preschool Al Madeena Islamic School</strong> untuk terus menumbuhkan generasi Qur’ani yang <strong>cerdas, kreatif, dan berkarakter mulia.</strong>",
    items: [
      {
        id: 1,
        title: "Juara Lomba Tahfizh Tingkat PAUD",
        metric: "Juara",
        metricLabel: "Tingkat PAUD",
        image:
          "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1000&auto=format&fit=crop",
        link: "#",
      },
      {
        id: 2,
        title: "Juara Lomba Renang Antar Sekolah",
        metric: "Juara",
        metricLabel: "Antar Sekolah",
        image:
          "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1000&auto=format&fit=crop",
        link: "#",
      },
      {
        id: 3,
        title: "Juara Lomba Berhitung Cepat",
        metric: "Winner",
        metricLabel: "Kompetisi Akademik",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
        link: "#",
      },
      {
        id: 4,
        title: "Juara Kolase & Kreativitas Seni",
        metric: "Juara",
        metricLabel: "Seni & Kreativitas",
        image:
          "https://images.unsplash.com/photo-1596464716127-f9a82741cacb?q=80&w=1000&auto=format&fit=crop",
        link: "#",
      },
      {
        id: 5,
        title: "Partisipasi Festival Anak Sholeh",
        metric: "Aktif",
        metricLabel: "Event Edukatif",
        image:
          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop",
        link: "#",
      },
    ],
  },
  primary: {
    intro: `Siswa-siswi <strong>Primary Al Madeena Islamic School</strong> tidak hanya berprestasi dalam bidang akademik, tetapi juga dalam berbagai ajang non-akademik. Semangat belajar, kepercayaan diri, dan karakter tangguh yang ditanamkan di sekolah menjadi fondasi utama dalam setiap pencapaian yang diraih.<br/><br/>
    Melalui bimbingan guru dan dukungan penuh dari orang tua, peserta didik berhasil menunjukkan kemampuan terbaiknya di berbagai kompetisi, baik di tingkat <strong>kota, provinsi, maupun nasional.</strong>`,
    closing:
      "Deretan prestasi ini menjadi bukti bahwa <strong>Primary Al Madeena Islamic School</strong> tidak hanya menumbuhkan anak yang <strong>cerdas secara akademik</strong>, tetapi juga <strong>berkarakter, percaya diri, dan berdaya saing tinggi</strong> di berbagai bidang.",
    items: [
      {
        id: 1,
        title: "Juara Lomba Matematika",
        metric: "Juara",
        metricLabel: "Kota & Nasional",
        image:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
        link: "#",
      },
      {
        id: 2,
        title: "Juara Lomba Bahasa Inggris",
        metric: "Juara",
        metricLabel: "Kota & Nasional",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
        link: "#",
      },
      {
        id: 3,
        title: "Prestasi Taekwondo",
        metric: "Winner",
        metricLabel: "Berbagai Kategori",
        image:
          "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1000&auto=format&fit=crop",
        link: "#",
      },
      {
        id: 4,
        title: "Prestasi Renang",
        metric: "Winner",
        metricLabel: "Kejuaraan Daerah",
        image:
          "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1000&auto=format&fit=crop",
        link: "#",
      },
    ],
  },
};