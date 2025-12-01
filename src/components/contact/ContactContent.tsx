"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export function ContactContent() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-12 max-w-2xl"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Kontak Utama
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Silakan hubungi kami melalui kontak di bawah ini sesuai dengan
            jenjang pendidikan yang Anda tuju atau kunjungi lokasi kami secara
            langsung.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Address Card */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            variants={fadeIn}
          >
            <Card className="border-border bg-card h-full transition-shadow duration-300 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                    <MapPin className="size-5" />
                  </div>
                  <CardTitle className="text-xl">Alamat Sekolah</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <h4 className="text-foreground font-semibold">Preschool</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Jl. KS Tubun No. 29 Kejaksan
                    <br />
                    Kota Cirebon 45123
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-foreground font-semibold">
                    Primary School
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Jl. Pamitran No. 7 Kejaksan
                    <br />
                    Kota Cirebon 45123
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* WhatsApp Card */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={fadeIn}
          >
            <Card className="border-border bg-card h-full transition-shadow duration-300 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                    <Phone className="size-5" />
                  </div>
                  <CardTitle className="text-xl">WhatsApp & Telepon</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-foreground font-semibold">Preschool</h4>
                  <a
                    href="https://wa.me/6282119222822"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="size-4" />
                    0821-1922-2822
                  </a>
                </div>
                <div className="space-y-2">
                  <h4 className="text-foreground font-semibold">Primary</h4>
                  <a
                    href="https://wa.me/6285215599906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="size-4" />
                    08521-55999-06
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email Card */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            variants={fadeIn}
          >
            <Card className="border-border bg-card h-full transition-shadow duration-300 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                    <Mail className="size-5" />
                  </div>
                  <CardTitle className="text-xl">Email Korespondensi</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-foreground font-semibold">Preschool</h4>
                  <a
                    href="mailto:halo.almadeena@gmail.com"
                    className="text-muted-foreground hover:text-primary block transition-colors hover:underline"
                  >
                    halo.almadeena@gmail.com
                  </a>
                </div>
                <div className="space-y-2">
                  <h4 className="text-foreground font-semibold">Primary</h4>
                  <a
                    href="mailto:primary.almadeena@gmail.com"
                    className="text-muted-foreground hover:text-primary block transition-colors hover:underline"
                  >
                    primary.almadeena@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Media Card */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            variants={fadeIn}
          >
            <Card className="border-border bg-card h-full transition-shadow duration-300 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                    <Instagram className="size-5" />
                  </div>
                  <CardTitle className="text-xl">Sosial Media</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Ikuti kegiatan terbaru dan dokumentasi harian siswa kami di
                  media sosial.
                </p>
                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="h-12 justify-start"
                    asChild
                  >
                    <a
                      href="https://instagram.com/almadeena.islamic.school"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="text-primary mr-2 size-5" />
                      <span className="font-medium">
                        @almadeena.islamic.school
                      </span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 justify-start"
                    asChild
                  >
                    <a
                      href="https://www.youtube.com/@almadeenaislamicschool4379"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="text-primary mr-2 size-5" />
                      <span className="font-medium">
                        Al Madeena Islamic School
                      </span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
