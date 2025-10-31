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
  icon?: "BookOpenIcon" | "LifeBuoyIcon" | "InfoIcon";
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
      },
      {
        href: "/about/vision-mission",
        label: "Visi dan Misi",
        description: "Arah, tujuan, dan nilai inti sekolah.",
      },
      {
        href: "/about/foundation-board",
        label: "Dewan Yayasan",
        description: "Struktur pengurus yayasan.",
      },
      {
        href: "/about/staff",
        label: "Guru & Karyawan",
        description: "Profil pendidik dan staf.",
      },
      {
        href: "/about/partners",
        label: "Partner Kerjasama",
        description: "Kolaborasi institusi dan program.",
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
      },
      {
        href: "/preschool/curriculum",
        label: "Kurikulum",
        description: "Kurikulum integratif untuk potensi anak usia dini.",
      },
      {
        href: "/preschool/achievements",
        label: "Prestasi",
        description: "Prestasi dan semangat kompetisi siswa.",
      },
      {
        href: "/preschool/activities",
        label: "Kegiatan",
        description: "Kegiatan akademik untuk potensi menyeluruh.",
      },
      {
        href: "/preschool/extracurricular",
        label: "Ekstrakurikuler",
        description: "Wadah penyaluran minat, bakat, dan kreativitas.",
      },
      {
        href: "/preschool/facilities",
        label: "Fasilitas",
        description: "Fasilitas modern untuk perkembangan anak.",
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
      },
      {
        href: "/primary/curriculum",
        label: "Kurikulum",
        description: "Kurikulum terpadu untuk peserta didik unggul.",
      },
      {
        href: "/primary/achievements",
        label: "Prestasi",
        description: "Prestasi akademik dan non-akademik siswa.",
      },
      {
        href: "/primary/activities",
        label: "Kegiatan",
        description: "Keseimbangan intelektual, spiritual, & sosial.",
      },
      {
        href: "/primary/extracurricular",
        label: "Ekstrakurikuler",
        description: "Wadah pengembangan potensi, minat, dan bakat.",
      },
      {
        href: "/primary/facilities",
        label: "Fasilitas",
        description: "Fasilitas modern untuk pembelajaran efektif.",
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
        icon: "BookOpenIcon",
      },
      {
        href: "/news/gallery",
        label: "Galeri Kegiatan",
        icon: "LifeBuoyIcon",
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
        icon: "BookOpenIcon",
      },
      {
        href: "/registration/form",
        label: "Form Pendaftaran",
        icon: "LifeBuoyIcon",
      },
      { href: "/registration/faq", label: "FAQ", icon: "InfoIcon" },
    ],
  },

  {
    label: "Kontak",
    submenu: true,
    type: "icon",
    items: [
      { href: "/contact", label: "Kontak & Alamat", icon: "InfoIcon" },
      {
        href: "/career",
        label: "Karir (Lowongan Pekerjaan)",
        icon: "BookOpenIcon",
      },
    ],
  },
];
