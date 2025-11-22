// src/app/(main)/primary/curriculum/page.tsx

import PageHeader from "~/components/common/PageHeader"; // Pastikan path ini benar
import CurriculumContent from "~/components/academic/CurriculumContent";
import { curriculumData } from "~/data/academic/curriculumData";
// Tidak perlu mengimpor GraduationCap

export const metadata = {
  title: 'Kurikulum Primary School - Al Madeena',
  description: 'Program pendidikan Primary School Al Madeena yang mengintegrasikan Kurikulum Nasional, Cambridge Assessment, dan Tahfizh Al-Qur’an.',
};

const sharedTagline = "Global Generation, Islamic Character";
const headerImageUrl = "https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp";

export default function PrimaryCurriculumPage() {
  return (
    <div className="bg-white text-neutral-800">
      <PageHeader
        title="Global & Islamic Excellence"
        subtitle="Program kami memadukan kurikulum nasional dan standar internasional dengan fokus intensif pada Tahfizh dan pembentukan karakter Islami."
        imageUrl={headerImageUrl}
      />
      
      <CurriculumContent
        level="primary"
        data={curriculumData.primary}
        title=""
        subtitle=""
        visualAlt="Gambar siswa primary school sedang belajar di depan Smartboard"
        visualImage="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763224535/Primary-Academic_yadxyh.webp" 
      />
    </div>
  );
}