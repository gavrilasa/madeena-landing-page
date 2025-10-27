"use client";

import { motion } from "framer-motion";

export default function Quote() {
  return (
    <section className="relative -mt-8 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f4f8fc] text-center">
      <motion.div
        initial={{ x: -100, y: -100, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="absolute top-0 left-0 h-24 w-24 bg-[#F77F00] sm:h-28 sm:w-28 md:h-36 md:w-36"
      />
      <motion.div
        initial={{ x: 100, y: -100, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="absolute top-8 right-6 h-20 w-20 bg-[#0094D9] sm:top-10 sm:right-10 sm:h-20 sm:w-20 md:top-16 md:right-16 md:h-24 md:w-24"
      />
      <motion.div
        initial={{ x: -100, y: 100, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-10 left-6 h-20 w-20 bg-[#0094D9] sm:bottom-12 sm:left-10 sm:h-20 sm:w-20 md:bottom-16 md:left-16 md:h-24 md:w-24"
      />
      <motion.div
        initial={{ x: 100, y: 100, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="absolute right-0 bottom-10 h-24 w-24 bg-[#FFD500] sm:h-24 sm:w-24 md:h-28 md:w-28"
      />

      <div className="container flex flex-col items-center gap-8">
        <motion.img
          src="https://res.cloudinary.com/reswara/image/upload/v1761321700/Frame_7_ihs1mi.svg"
          alt="Al Madeena Logo"
          width={150}
          height={150}
          className="object-contain"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }}
        />

        <motion.p
          className="max-w-2xl px-4 text-center text-base leading-relaxed font-medium text-[#0094D9] sm:text-xl md:text-2xl"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
        >
          Growing golden generation with Islamic character. <br />
          At Al Madeena, we lead them to be a smart generation, well-mannered,
          and ready to face the future.
        </motion.p>
      </div>
    </section>
  );
}
