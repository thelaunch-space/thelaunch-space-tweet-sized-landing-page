"use client";

interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return <p className="section-label">{text}</p>;
}
