import PageHeader from "~/components/common/PageHeader";
import { Timeline, type TimelineEntry } from "~/components/common/Timeline";
import AboutQuickLinks from "~/components/about/AboutQuickLinks";

const historyData: TimelineEntry[] = [
  {
    date: "Awal Mula",
    title: "Pondasi Pendidikan Nonformal",
    content:
      "Perjalanan kami bermula dari pengalaman panjang lebih dari <strong>12 tahun</strong> mengelola bimbingan belajar. Fokus kami adalah meningkatkan kemampuan akademik siswa di berbagai jenjang, yang menumbuhkan tekad kuat untuk memberikan kontribusi lebih nyata bagi dunia pendidikan Indonesia.",
  },
  {
    date: "Era Pandemi",
    title: "Inovasi di Tengah Tantangan",
    content:
      "Pandemi COVID-19 menjadi titik balik. Kami berinovasi mengubah fungsi lembaga bimbingan belajar menjadi <strong>Pusat Pendidikan dan Persiapan Pengajar Qiroati</strong>. Ini menjadi wadah pelatihan guru Al-Qur'an yang melahirkan inspirasi untuk membangun lembaga pendidikan formal berbasis nilai Islam.",
  },
  {
    date: "14 Juli 2021",
    title: "Lahirnya Al Madeena Islamic Preschool",
    content:
      "Secara resmi, <strong>Al Madeena Islamic School</strong> berdiri di bawah naungan Yayasan Al Madeena Cendekia Muslim. Kami memulai dengan jenjang <strong>Preschool</strong> (usia 3–5 tahun), memadukan metode Qiroati, Tahfiz, Bilingual, dan Islamic Character.",
  },
  {
    date: "Juli 2023",
    title: "Ekspansi ke Jenjang Primary",
    content:
      "Menjawab aspirasi orang tua, kami membuka <strong>Primary Al Madeena Islamic School</strong>. Jenjang ini melanjutkan program unggulan Preschool dengan tambahan <strong>Assessment Cambridge</strong> dan muatan kurikulum madrasah, mengintegrasikan pendidikan umum, agama, dan standar internasional.",
  },
  {
    date: "Masa Kini",
    title: "Menuju Generasi Global Berkarakter",
    content:
      "Al Madeena Islamic School terus berkomitmen menjadi lembaga pendidikan Islam yang unggul dan modern. Visi kami adalah mencetak generasi Global yang cerdas, mandiri, dan berakhlak mulia — siap menjadi pemimpin masa depan yang berlandaskan iman dan ilmu.",
  },
];

export default function HistoryPage() {
  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Sejarah Al Madeena"
        subtitle="Dari Bimbingan Belajar Menuju Lembaga Pendidikan Islam"
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />
      
      <Timeline 
        data={historyData} 
      />

      <AboutQuickLinks />
    </div>
  );
}