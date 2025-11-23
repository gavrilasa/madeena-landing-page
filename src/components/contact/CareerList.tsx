"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake 
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { benefits, careerOpenings } from "~/data/contact/careerData";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export function CareerList() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-1">Why Join Us?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Berkarya & Beribadah
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Bergabunglah dengan tim kami untuk membangun generasi Qur'ani yang berwawasan global.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                variants={fadeIn}
                className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Job Openings Section */}
        <div id="openings">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Lowongan Tersedia</h2>
              <p className="text-muted-foreground mt-2">
                Temukan posisi yang sesuai dengan kualifikasi dan minat Anda.
              </p>
            </div>
            <div className="hidden md:block">
               {/* Optional: Filter buttons could go here */}
            </div>
          </div>

          <div className="grid gap-6">
            {careerOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:items-start justify-between">
                  
                  {/* Job Header & Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                            {job.department}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            Posted 2 days ago
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>

                    {/* Requirements List */}
                    <div className="pt-4">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/80 mb-3">
                        Kualifikasi:
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col gap-3 lg:w-48 shrink-0">
                    <Button className="w-full rounded-full h-11 font-semibold shadow-md" asChild>
                      <a href={`mailto:recruitment@almadeena.sch.id?subject=Lamaran Kerja - ${job.title}`}>
                        Lamar Sekarang
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Kirim CV & Portofolio ke email kami
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}

            {careerOpenings.length === 0 && (
              <div className="text-center py-20 rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/30">
                <p className="text-lg font-medium text-muted-foreground">
                  Saat ini belum ada posisi yang tersedia.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Silakan cek kembali secara berkala.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}