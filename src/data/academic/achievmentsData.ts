// src/data/academic/achievmentsData.ts

export interface AchievementItem {
  id: number;
  title: string;
  name: string;
  studentClass: string;
  image: string;
  link: string;
  content?: string;
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
        name: "Ananda Hafizh",
        studentClass: "Kelas B1 - Umar",
        image:
          "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1000&auto=format&fit=crop",
        link: "/preschool/achievements/1",
        content: `
          <p>Alhamdulillah, ananda berhasil meraih Juara 1 dalam lomba Tahfizh tingkat PAUD se-Kota Cirebon. Prestasi ini merupakan buah dari ketekunan dalam menghafal Al-Qur'an setiap hari di sekolah maupun di rumah dengan metode yang menyenangkan.</p>
          <p>Lomba ini diikuti oleh lebih dari 50 peserta dari berbagai sekolah. Ananda tampil dengan percaya diri membacakan surat-surat pendek dari Juz Amma dengan tajwid yang baik, kelancaran yang luar biasa, serta adab yang santun saat berada di atas panggung.</p>
          <p>Pencapaian ini tidak lepas dari dukungan orang tua dan bimbingan para asatidz di sekolah. Semoga prestasi ini menjadi langkah awal bagi ananda untuk menjadi Hafizh Qur'an yang kelak memakaikan mahkota kemuliaan bagi kedua orang tuanya di surga nanti.</p>
        `,
      },
      {
        id: 2,
        title: "Juara Lomba Renang Antar Sekolah",
        name: "Tim Renang",
        studentClass: "Preschool Team",
        image:
          "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1000&auto=format&fit=crop",
        link: "/preschool/achievements/2",
        content: `
          <p>Selamat kepada tim renang Preschool Al Madeena yang berhasil menyabet gelar Juara Umum dalam kompetisi renang antar sekolah. Kompetisi ini tidak hanya melatih kemampuan fisik, tetapi juga keberanian, ketangkasan, dan sportivitas anak sejak dini.</p>
          <p>Anak-anak menunjukkan semangat pantang menyerah dalam setiap gaya renang yang diperlombakan. Meskipun menghadapi lawan dari berbagai sekolah lain, mereka tetap fokus dan ceria, menikmati setiap momen pertandingan dengan penuh semangat kebersamaan.</p>
          <p>Kami bangga melihat tumbuh kembang fisik dan mental siswa melalui kegiatan ekstrakurikuler ini. Kemenangan ini membuktikan bahwa dengan latihan yang rutin dan suasana belajar yang positif, anak-anak usia dini pun mampu mengukir prestasi gemilang.</p>
        `,
      },
      {
        id: 3,
        title: "Juara Lomba Berhitung Cepat",
        name: "Ahmad Saputra",
        studentClass: "Kelas A2 - Abu Bakar",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
        link: "/preschool/achievements/3",
        content: `
          <p>Prestasi membanggakan kembali diraih di bidang akademik. Ananda sukses menjadi pemenang dalam Lomba Berhitung Cepat yang menguji kecepatan dan ketepatan logika matematika dasar. Kompetisi ini menuntut fokus tinggi dan ketelitian.</p>
          <p>Melalui metode pembelajaran yang menyenangkan di sentra persiapan, anak-anak terbiasa dengan konsep angka dan logika sederhana. Ananda berhasil menjawab serangkaian soal dengan cepat dan tepat, mengungguli peserta lain dengan selisih waktu yang sangat tipis.</p>
          <p>Semoga keberhasilan ini semakin memacu semangat belajar ananda, khususnya dalam bidang matematika. Kami percaya bahwa setiap anak memiliki potensi unik yang jika diasah dengan benar akan menghasilkan prestasi yang luar biasa.</p>
        `,
      },
      {
        id: 4,
        title: "Juara Kolase & Kreativitas Seni",
        name: "Siti Aminah",
        studentClass: "Kelas B2 - Utsman",
        image:
          "https://images.unsplash.com/photo-1596464716127-f9a82741cacb?q=80&w=1000&auto=format&fit=crop",
        link: "/preschool/achievements/4",
        content: `
          <p>Kreativitas tanpa batas! Ananda berhasil memukau juri dengan karya kolase yang unik dan rapi, memanfaatkan bahan-bahan alam daur ulang. Tema "Alam Semesta" diterjemahkan dengan sangat indah melalui susunan biji-bijian dan dedaunan kering.</p>
          <p>Kegiatan ini tidak hanya melatih motorik halus, tetapi juga imajinasi dan apresiasi seni. Proses pembuatan yang membutuhkan kesabaran dan ketelatenan berhasil dilalui ananda dengan sangat baik, menghasilkan karya yang bernilai seni tinggi.</p>
          <p>Kami sangat bangga melihat ekspresi kebahagiaan ananda saat menerima piala. Prestasi ini adalah bukti bahwa Al Madeena Islamic School berkomitmen mengembangkan seluruh aspek kecerdasan anak, termasuk kecerdasan visual-spasial dan seni.</p>
        `,
      },
      {
        id: 5,
        title: "Partisipasi Festival Anak Sholeh",
        name: "Rafi Ahmad",
        studentClass: "Kelas A1 - Ali",
        image:
          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop",
        link: "/preschool/achievements/5",
        content: `
          <p>Partisipasi aktif siswa-siswi Preschool dalam Festival Anak Sholeh menunjukkan keberanian mereka untuk tampil di depan umum. Mereka mengikuti berbagai lomba seperti adzan, pildacil, dan busana muslim dengan penuh percaya diri.</p>
          <p>Meskipun tujuan utamanya adalah melatih keberanian dan syiar Islam, beberapa siswa berhasil membawa pulang piala penghargaan. Ananda Rafi Ahmad tampil memukau dalam lomba Adzan, mengumandangkan panggilan sholat dengan suara lantang dan merdu.</p>
          <p>Pengalaman ini sangat berharga untuk membangun karakter kepemimpinan dan rasa percaya diri mereka. Kami berharap semangat berkompetisi dalam kebaikan (fastabiqul khairat) ini akan terus tertanam dalam diri mereka hingga dewasa nanti.</p>
        `,
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
        name: "Tim Olimpiade",
        studentClass: "Grade 5 & 6",
        image:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
        link: "/primary/achievements/1",
        content: `
          <p>Prestasi gemilang di bidang sains dan logika! Tim Olimpiade Matematika Primary Al Madeena berhasil meraih medali emas dalam kompetisi tingkat nasional. Kompetisi ini diikuti oleh ratusan peserta dari berbagai sekolah dasar unggulan di seluruh Indonesia.</p>
          <p>Persiapan intensif melalui Math Club dan bimbingan guru ahli membuahkan hasil manis. Para siswa mampu memecahkan soal-soal problem solving tingkat tinggi dan nalar (HOTS) dengan tenang, tepat, dan penuh strategi.</p>
          <p>Keberhasilan ini membuktikan kualitas kurikulum akademik Al Madeena yang mumpuni. Kami berharap tim ini dapat terus mempertahankan prestasinya dan menginspirasi adik-adik kelas untuk mencintai pelajaran matematika dan sains.</p>
        `,
      },
      {
        id: 2,
        title: "Juara Lomba Bahasa Inggris",
        name: "Rina Ananda",
        studentClass: "Grade 4 - Salahuddin",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
        link: "/primary/achievements/2",
        content: `
          <p>Kemampuan komunikasi global siswa Al Madeena kembali terbukti. Ananda Rina sukses menjadi Juara 1 dalam Story Telling Contest tingkat Kota Cirebon, menyisihkan puluhan peserta lain dengan penampilan yang sangat memukau.</p>
          <p>Dengan pelafalan (pronunciation) yang fasih dan ekspresi yang hidup, ananda membawakan cerita islami yang menyentuh hati para juri. Kepercayaan dirinya di atas panggung menjadi nilai tambah yang membuatnya layak mendapatkan predikat terbaik.</p>
          <p>Prestasi ini adalah bukti keberhasilan program Bilingual Environment di sekolah kami. Kami akan terus mendorong siswa untuk mengembangkan kemampuan bahasa asing sebagai bekal mereka menjadi warga dunia yang kompeten di masa depan.</p>
        `,
      },
      {
        id: 3,
        title: "Prestasi Taekwondo",
        name: "Bagas Pratama",
        studentClass: "Grade 3 - Tariq",
        image:
          "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1000&auto=format&fit=crop",
        link: "/primary/achievements/3",
        content: `
          <p>Di bidang olahraga, atlet muda Taekwondo Al Madeena, Bagas Pratama, berhasil memborong medali emas di Kejuaraan Provinsi. Kompetisi ini mempertemukan atlet-atlet muda berbakat dari berbagai daerah untuk menguji kemampuan bela diri mereka.</p>
          <p>Kedisiplinan, ketahanan fisik, dan mental juara yang dilatih dalam ekstrakurikuler Taekwondo menjadi kunci kemenangan ini. Bagas menunjukkan teknik tendangan dan pertahanan yang solid, serta sikap sportivitas yang tinggi terhadap lawannya.</p>
          <p>Selamat kepada Bagas yang telah mengharumkan nama sekolah. Semoga prestasi ini menjadi motivasi untuk terus berlatih dan mencapai level yang lebih tinggi, serta menjadi inspirasi bagi teman-teman lainnya untuk hidup sehat dan berprestasi.</p>
        `,
      },
      {
        id: 4,
        title: "Prestasi Renang",
        name: "Dinda Kirana",
        studentClass: "Grade 5 - Khalid",
        image:
          "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1000&auto=format&fit=crop",
        link: "/primary/achievements/4",
        content: `
          <p>Kecepatan dan teknik yang prima membawa perenang cilik Al Madeena, Dinda Kirana, meraih podium tertinggi di Kejuaraan Renang Pelajar Daerah. Dinda berhasil memecahkan rekor waktu pribadinya dalam nomor gaya bebas 50 meter.</p>
          <p>Latihan rutin yang disiplin dan fokus yang tinggi membuahkan hasil yang manis. Dukungan sekolah dalam menyediakan fasilitas dan program ekstrakurikuler renang yang berkualitas turut andil dalam pencapaian prestasi ini.</p>
          <p>Kami sangat mengapresiasi kerja keras Dinda. Prestasi ini diharapkan dapat memotivasi siswa lain untuk terus mengembangkan bakat dan minat mereka, tidak hanya di bidang akademik tetapi juga di bidang olahraga dan seni.</p>
        `,
      },
    ],
  },
};