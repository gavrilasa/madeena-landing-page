// src/data/navigation-links.ts

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
        href: "/tentang/sejarah",
        label: "Sejarah",
        description: "Perjalanan berdirinya Al Madeena.",
      },
      {
        href: "/tentang/visi-misi",
        label: "Visi dan Misi",
        description: "Arah, tujuan, dan nilai inti sekolah.",
      },
      {
        href: "/tentang/dewan-yayasan",
        label: "Dewan Yayasan",
        description: "Struktur pengurus yayasan.",
      },
      {
        href: "/tentang/guru-dan-karyawan",
        label: "Guru & Karyawan",
        description: "Profil pendidik dan staf.",
      },
      {
        href: "/tentang/partner",
        label: "Partner Kerjasama",
        description: "Kolaborasi institusi dan program.",
      },
    ],
  },

  {
    label: "Akademik",
    submenu: true,
    type: "simple",
    items: [
      { href: "/akademik/tk", label: "TK" },
      { href: "/akademik/sd", label: "SD" },
    ],
  },

  {
    label: "Program",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/program/tahfiz-qiroati",
        label: "Tahfiz Qiroati",
        icon: "BookOpenIcon",
      },
      {
        href: "/program/islamic-character",
        label: "Islamic Character",
        icon: "InfoIcon",
      },
      { href: "/program/bilingual", label: "Bilingual", icon: "LifeBuoyIcon" },
    ],
  },

  {
    label: "Fasilitas",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/fasilitas/sarana-prasarana",
        label: "Sarana Prasarana",
        icon: "InfoIcon",
      },
    ],
  },

  { href: "/prestasi", label: "Prestasi" },

  {
    label: "Berita",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/berita/terbaru",
        label: "Berita Terbaru",
        icon: "BookOpenIcon",
      },
      {
        href: "/berita/galeri-kegiatan",
        label: "Galeri Kegiatan",
        icon: "LifeBuoyIcon",
      },
      { href: "/berita/kegiatan", label: "Kegiatan", icon: "InfoIcon" },
    ],
  },

  {
    label: "Pendaftaran",
    submenu: true,
    type: "simple",
    items: [
      { href: "/pendaftaran/alur", label: "Alur Pendaftaran" },
      { href: "/pendaftaran/form", label: "Form Pendaftaran" },
      { href: "/pendaftaran/faq", label: "FAQ" },
    ],
  },

  {
    label: "Kontak",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "https://instagram.com/al-madeena",
        label: "Instagram",
        icon: "LifeBuoyIcon",
      },
      {
        href: "https://tiktok.com/@al-madeena",
        label: "Tiktok",
        icon: "LifeBuoyIcon",
      },
      { href: "/kontak/alamat", label: "Alamat", icon: "InfoIcon" },
      {
        href: "https://wa.me/628XXYYYYZZZZ",
        label: "CTA WA Admin",
        icon: "LifeBuoyIcon",
      },
      {
        href: "/kontak/karir",
        label: "Karir (Lowongan Pekerjaan)",
        icon: "BookOpenIcon",
      },
    ],
  },
];
