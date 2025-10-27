"use client";

import { motion } from "framer-motion";

export default function Motto() {
  return (
    <section className="container mx-auto px-4 py-12 md:px-8">
      <div className="mx-auto flex flex-col space-y-8 p-4 md:gap-12 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="items-left flex flex-col gap-4 text-left"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-4xl font-bold text-[#0193DC]"
          >
            Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-md max-w-3xl leading-relaxed font-medium text-gray-700 md:text-xl"
          >
            To nurture a golden generation who learns with faith, character, and{" "}
            <br />
            excellence — becoming future leaders grounded in Islamic values.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="items-left flex flex-col gap-4 md:ml-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-4xl font-bold text-[#0193DC]"
          >
            Mission
          </motion.h2>
          <motion.ol
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-md max-w-3xl list-inside list-decimal space-y-3 text-justify leading-relaxed font-medium text-gray-700 md:text-xl"
          >
            <motion.li
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              Integrate faith and knowledge to build balanced intelectual and
              spiritual growth.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            >
              Cultivate Islamic character through daily practice and positive
              culture.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
            >
              Encourage creativity, confidence, and lifelong learning.
            </motion.li>
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}
