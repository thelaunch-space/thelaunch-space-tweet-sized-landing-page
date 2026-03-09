"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-border-color/40 origin-left"
      />
    </div>
  );
}
