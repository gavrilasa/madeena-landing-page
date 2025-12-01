"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";
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
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6">
        {/* Benefits Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-1">
              Why Join Us?
            </Badge>
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Berkarya & Beribadah
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Bergabunglah dengan tim kami untuk membangun generasi Qur&apos;ani
              yang berwawasan global.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                variants={fadeIn}
                className="border-border bg-card rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Job Openings Section */}
        <div id="openings">
          <div className="mb-10 flex flex-col items-end justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-foreground text-3xl font-bold">
                Lowongan Tersedia
              </h2>
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
                className="group border-border bg-card hover:border-primary/50 relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all hover:shadow-lg md:p-8"
              >
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
                  {/* Job Header & Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-foreground group-hover:text-primary text-xl font-bold transition-colors md:text-2xl">
                            {job.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className="border-primary/30 text-primary bg-primary/5"
                          >
                            {job.department}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
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
                      <h4 className="text-foreground/80 mb-3 text-sm font-semibold tracking-wider uppercase">
                        Kualifikasi:
                      </h4>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {job.requirements.map((req, idx) => (
                          <li
                            key={idx}
                            className="text-muted-foreground flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex shrink-0 flex-col gap-3 lg:w-48">
                    <Button
                      className="h-11 w-full rounded-full font-semibold shadow-md"
                      asChild
                    >
                      <a
                        href={`mailto:recruitment@almadeena.sch.id?subject=Lamaran Kerja - ${job.title}`}
                      >
                        Lamar Sekarang
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <p className="text-muted-foreground text-center text-xs">
                      Kirim CV & Portofolio ke email kami
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {careerOpenings.length === 0 && (
              <div className="border-muted-foreground/30 bg-muted/30 rounded-2xl border border-dashed py-20 text-center">
                <p className="text-muted-foreground text-lg font-medium">
                  Saat ini belum ada posisi yang tersedia.
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
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
