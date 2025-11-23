interface NavigationItem {
  href?: string;
  label: string;
  active?: boolean;
  submenu?: boolean;
  type?: "description" | "simple" | "icon";
  items?: SubmenuItem[];
}

interface SubmenuItem {
  href: string;
  label: string;
  description?: string;
  icon?: string;
}

export const navigationLinks: NavigationItem[] = [
  { href: "/", label: "Beranda", active: true },

  {
    label: "Tentang Kami",
    submenu: true,
    type: "description",
    items: [
      {
        href: "/about/history",
        label: "Sejarah",
        description: "Perjalanan berdirinya Al Madeena.",
        icon: "History",
      },
      {
        href: "/about/vision-mission",
        label: "Visi dan Misi",
        description: "Arah, tujuan, dan nilai inti sekolah.",
        icon: "Target",
      },
      {
        href: "/about/foundation-board",
        label: "Dewan Yayasan",
        description: "Struktur pengurus yayasan.",
        icon: "Users",
      },
      {
        href: "/about/staff-profile",
        label: "Guru & Karyawan",
        description: "Profil pendidik dan staf.",
        icon: "UserCheck",
      },
      {
        href: "/about/partners",
        label: "Partner Kerjasama",
        description: "Kolaborasi institusi dan program.",
        icon: "Handshake",
      },
    ],
  },

  {
    label: "Preschool",
    submenu: true,
    type: "description",
    items: [
      {
        href: "/preschool/programs",
        label: "Program Unggulan",
        description: "Program unggulan untuk menumbuhkan kecintaan belajar.",
        icon: "Star",
      },
      {
        href: "/preschool/curriculum",
        label: "Kurikulum",
        description: "Kurikulum integratif untuk potensi anak usia dini.",
        icon: "BookOpen",
      },
      {
        href: "/preschool/achievements",
        label: "Prestasi",
        description: "Prestasi dan semangat kompetisi siswa.",
        icon: "Trophy",
      },
      {
        href: "/preschool/activities",
        label: "Kegiatan",
        description: "Kegiatan akademik untuk potensi menyeluruh.",
        icon: "Activity",
      },
      {
        href: "/preschool/extracurricular",
        label: "Ekstrakurikuler",
        description: "Wadah penyaluran minat, bakat, dan kreativitas.",
        icon: "Palette",
      },
      {
        href: "/preschool/facilities",
        label: "Fasilitas",
        description: "Fasilitas modern untuk perkembangan anak.",
        icon: "Building2",
      },
    ],
  },

  {
    label: "Primary",
    submenu: true,
    type: "description",
    items: [
      {
        href: "/primary/programs",
        label: "Program Unggulan",
        description: "Program integrasi kurikulum Islam & internasional.",
        icon: "Star",
      },
      {
        href: "/primary/curriculum",
        label: "Kurikulum",
        description: "Kurikulum terpadu untuk peserta didik unggul.",
        icon: "BookOpen",
      },
      {
        href: "/primary/achievements",
        label: "Prestasi",
        description: "Prestasi akademik dan non-akademik siswa.",
        icon: "Trophy",
      },
      {
        href: "/primary/activities",
        label: "Kegiatan",
        description: "Keseimbangan intelektual, spiritual, & sosial.",
        icon: "Activity",
      },
      {
        href: "/primary/extracurricular",
        label: "Ekstrakurikuler",
        description: "Wadah pengembangan potensi, minat, dan bakat.",
        icon: "Palette",
      },
      {
        href: "/primary/facilities",
        label: "Fasilitas",
        description: "Fasilitas modern untuk pembelajaran efektif.",
        icon: "Building2",
      },
    ],
  },

  {
    label: "Berita",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/news",
        label: "Berita Terbaru",
        icon: "Newspaper",
        description: "Informasi terkini seputar kegiatan dan prestasi sekolah.",
      },
      {
        href: "/news/gallery",
        label: "Galeri Kegiatan",
        icon: "Images",
        description: "Dokumentasi foto dan video kegiatan sekolah.",
      },
    ],
  },

  {
    label: "Pendaftaran",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/registration/flow",
        label: "Alur Pendaftaran",
        icon: "GitMerge",
        description: "Panduan langkah demi langkah pendaftaran siswa baru.",
      },
      {
        href: "/registration/faq",
        label: "FAQ",
        icon: "HelpCircle",
        description: "Pertanyaan yang sering diajukan seputar pendaftaran.",
      },
    ],
  },

  {
    label: "Kontak",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/contact/information",
        label: "Kontak & Alamat",
        icon: "MapPin",
        description: "Informasi kontak dan lokasi sekolah kami.",
      },
      {
        href: "/contact/career",
        label: "Karir (Lowongan Pekerjaan)",
        icon: "Briefcase",
        description: "Bergabunglah dengan tim pendidik dan staf kami.",
      },
    ],
  },
];