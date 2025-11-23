"use client";

import { motion } from "framer-motion";
import { 
  UserPlus, 
  CreditCard, 
  FileText, 
  Users, 
  MailCheck, 
  School 
} from "lucide-react";
import { cn } from "~/lib/utils";

const flowSteps = [
  {
    id: 1,
    title: "Pendaftaran Online",
    description: "Calon orang tua menghubungi nomor whatsapp sekolah atau mengunjungi bagian administrasi. Pastikan nomor yang dihubungi sesuai dengan nomor yang tertera di website ini.",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Pembayaran Biaya Pendaftaran",
    description: "Melakukan pembayaran biaya pendaftaran melalui transfer bank ke rekening yayasan atau pembayaran tunai di sekolah. Bukti bayar wajib diunggah atau diserahkan.",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "Observasi & Tes Penempatan",
    description: "Calon siswa mengikuti observasi (untuk Preschool) atau tes pemetaan akademik (untuk Primary) guna mengetahui potensi dan kesiapan belajar anak.",
    icon: FileText,
  },
  {
    id: 4,
    title: "Wawancara Orang Tua",
    description: "Sesi diskusi antara orang tua dan pihak sekolah untuk menyamakan visi misi pendidikan serta pola asuh di rumah dan di sekolah.",
    icon: Users,
  },
  {
    id: 5,
    title: "Pengumuman Hasil",
    description: "Sekolah akan menginformasikan hasil seleksi melalui Email atau WhatsApp resmi sekolah dalam waktu 3-5 hari kerja setelah tes.",
    icon: MailCheck,
  },
  {
    id: 6,
    title: "Daftar Ulang",
    description: "Orang tua melengkapi berkas administrasi dan melunasi biaya masuk (Uang Pangkal) untuk meresmikan status siswa.",
    icon: School,
  },
];

export function RegistrationFlow() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="relative">
          {/* Vertical Line (Hidden on mobile, visible on md+) */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-ml-0.5" />

          <div className="space-y-12">
            {flowSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-center gap-8",
                    isEven ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Step Number Badge (Mobile: Left, Desktop: Center) */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold z-10 ring-4 ring-background">
                    {step.id}
                  </div>

                  {/* Content Card */}
                  <div className={cn(
                    "ml-16 md:ml-0 w-[calc(100%-4rem)] md:w-[calc(50%-2rem)]",
                    "p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-300"
                  )}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <step.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Empty div for the other side on desktop to maintain balance */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-muted/50 border border-border">
            <h3 className="text-2xl font-bold text-foreground">Siap untuk Mendaftar?</h3>
            <p className="text-muted-foreground max-w-md">
              Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan mengenai alur pendaftaran di atas.
            </p>
            <a 
              href="/contact" 
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Hubungi Kami
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}