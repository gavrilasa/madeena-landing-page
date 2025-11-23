import PageHeader from "~/components/common/PageHeader";
import { Mail, MapPin, Phone, Instagram, Youtube, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Hubungi Kami - Al Madeena Islamic School",
  description:
    "Informasi kontak lengkap Al Madeena Islamic School: Alamat, Nomor Telepon, Email, dan Sosial Media.",
};

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Hubungi Kami"
        subtitle="Kami siap membantu menjawab pertanyaan Anda seputar pendidikan di Al Madeena."
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <section className="bg-background py-16 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <h1 className="mb-3 mt-2 text-balance text-3xl font-semibold md:text-4xl">
              Kontak Utama
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Silakan hubungi kami melalui kontak di bawah ini sesuai dengan jenjang pendidikan yang Anda tuju.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Alamat Section */}
            <div className="bg-muted rounded-lg p-6">
              <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
                <MapPin className="h-6 w-auto text-black" />
              </span>
              <p className="mb-2 text-lg font-semibold">Alamat</p>
              
              <div className="mb-4">
                <p className="font-medium text-sm text-primary mb-1">Preschool</p>
                <p className="text-muted-foreground">
                  Jl. KS Tubun No. 29 Kejaksan<br/>Kota Cirebon 45123
                </p>
              </div>
              
              <div>
                <p className="font-medium text-sm text-primary mb-1">Primary School</p>
                <p className="text-muted-foreground">
                  Jl. Pamitran No. 7 Kejaksan<br/>Kota Cirebon 45123
                </p>
              </div>
            </div>

            {/* WhatsApp Section */}
            <div className="bg-muted rounded-lg p-6">
              <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
                <Phone className="h-6 w-auto text-black" />
              </span>
              <p className="mb-2 text-lg font-semibold">WhatsApp</p>
              
              <div className="mb-4">
                <p className="font-medium text-sm text-primary mb-1">Preschool</p>
                <a 
                  href="https://wa.me/6282119222822" 
                  className="text-muted-foreground font-semibold hover:underline block"
                >
                  0821-1922-2822
                </a>
              </div>
              
              <div>
                <p className="font-medium text-sm text-primary mb-1">Primary</p>
                <a 
                  href="https://wa.me/6285215599906" 
                  className="text-muted-foreground font-semibold hover:underline block"
                >
                  08521-55999-06
                </a>
              </div>
            </div>

            {/* Email Section */}
            <div className="bg-muted rounded-lg p-6">
              <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
                <Mail className="h-6 w-auto text-black" />
              </span>
              <p className="mb-2 text-lg font-semibold">Email</p>
              
              <div className="mb-4">
                <p className="font-medium text-sm text-primary mb-1">Preschool</p>
                <a 
                  href="mailto:halo.almadeena@gmail.com" 
                  className="text-muted-foreground font-semibold hover:underline block"
                >
                  halo.almadeena@gmail.com
                </a>
              </div>
              
              <div>
                <p className="font-medium text-sm text-primary mb-1">Primary</p>
                <a 
                  href="mailto:primary.almadeena@gmail.com" 
                  className="text-muted-foreground font-semibold hover:underline block"
                >
                  primary.almadeena@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-muted rounded-lg p-6">
              <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
                <MessageCircle className="h-6 w-auto text-black" />
              </span>
              <p className="mb-2 text-lg font-semibold">Sosial Media</p>
              <p className="text-muted-foreground mb-4">Ikuti kegiatan terbaru kami.</p>
              
              <div className="flex flex-col gap-3">
                <a 
                  href="https://instagram.com/almadeena.islamic.school" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground font-semibold hover:underline"
                >
                  <Instagram className="h-5 w-5 text-black" />
                  @almadeena.islamic.school
                </a>
                <a 
                  href="https://www.youtube.com/@almadeenaislamicschool4379" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground font-semibold hover:underline"
                >
                  <Youtube className="h-5 w-5 text-black" />
                  Al Madeena Islamic School
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}