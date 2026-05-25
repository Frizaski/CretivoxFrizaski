import React from "react";
import type { Metadata } from "next";
import InfoPageClient from "./InfoPageClient";

export const metadata: Metadata = {
  title: "Info | Frizaski Al Fath - Software Engineering Portfolio",
  description: "Detailed information about Frizaski Al Fath, including background, experience, specialized tech stack in Frontend, Backend, Animation, and Tools.",
  keywords: [
    "Frizaski Al Fath Info",
    "Frizaski Tech Stack",
    "Frizaski Skills",
    "Software Engineering student",
    "IPB University",
  ],
};

export default function InfoPage() {
  return <InfoPageClient />;
}
