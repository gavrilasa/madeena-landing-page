// src/data/home/programData.ts

export interface ProgramDataType {
  id: string;
  category: string;
  title: string;
  src: string;
  description: string;
  purpose: string;
  targets: string[];
  link: string; // Properti baru untuk navigasi
}

export const programData: ProgramDataType[] = [
  {
    id: "tahfizh",
    category: "Unggulan",
    title: "Tahfizh & Qiroati",
    src: "https://images.unsplash.com/photo-1598556674446-9c47503282e0?q=80&w=3556&auto=format&fit=crop",
    description:
      "Pengenalan Al-Qur'an melalui metode Qiroati dan hafalan surah-surah pendek (Juz 30) yang disesuaikan dengan kemampuan anak.",
    purpose:
      "Mencetak generasi yang mencintai Al-Qur'an, mampu membacanya dengan tartil, dan memiliki hafalan yang mutqin.",
    targets: [
      "Hafal Juz 30 dengan tajwid yang benar",
      "Lulus kenaikan jilid metode Qiroati",
      "Terbiasa murojaah mandiri",
    ],
    link: "/primary/programs", // Diarahkan ke Primary
  },
  {
    id: "character",
    category: "Karakter",
    title: "Islamic Character",
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=3556&auto=format&fit=crop",
    description:
      "Penanaman nilai-nilai Islam sejak dini melalui pembiasaan karakter Islami, doa harian, dan pengenalan dasar-dasar ibadah.",
    purpose:
      "Membentuk pribadi anak yang berakhlakul karimah, santun, mandiri, dan taat beribadah sesuai tuntunan Rasulullah SAW.",
    targets: [
      "Terbiasa sholat Dhuha & Wajib berjamaah",
      "Hafal doa harian & hadits pilihan",
      "Memiliki adab sopan santun",
    ],
    link: "/preschool/programs", // Diarahkan ke Preschool
  },
  {
    id: "cambridge",
    category: "Akademik",
    title: "Cambridge Assessment",
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2333&auto=format&fit=crop",
    description:
      "Menerapkan standar internasional melalui Cambridge Assessment untuk mata pelajaran inti guna membekali siswa keterampilan global.",
    purpose:
      "Mempersiapkan siswa dengan kualifikasi yang diakui secara internasional untuk jenjang pendidikan selanjutnya.",
    targets: [
      "Kemampuan Matematika & Sains standar global",
      "Kesiapan menghadapi ujian internasional",
      "Pola pikir kritis dan analitis",
    ],
    link: "/primary/programs", // Diarahkan ke Primary
  },
  {
    id: "bilingual",
    category: "Bahasa",
    title: "Bilingual Education",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2515&auto=format&fit=crop",
    description:
      "Menciptakan lingkungan dwibahasa (Indonesia & Inggris) untuk meningkatkan kepercayaan diri dan kemampuan komunikasi siswa.",
    purpose:
      "Mempersiapkan siswa menghadapi tantangan global dengan kemampuan berbahasa Inggris aktif maupun pasif.",
    targets: [
      "Percaya diri berbicara bahasa Inggris",
      "Memahami instruksi kelas dalam bahasa Inggris",
      "Penguasaan kosakata (Vocabulary) luas",
    ],
    link: "/preschool/programs", // Diarahkan ke Preschool
  },
];