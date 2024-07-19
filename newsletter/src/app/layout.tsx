import { Providers } from "../providers/providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "@chakra-ui/react";
import LargeWithLogoCentered from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.visiteauxorphelins.org/"),
  title: "Visite aux Orphelins",
  description:
    "Visite aux Orphelins est une association à but non lucratif dédiée à soutenir les orphelins et les personnes dans le besoin à travers diverses initiatives communautaires.",
  openGraph: {
    title: "Visite aux Orphelins",
    description:
      "Visite aux Orphelins est une association à but non lucratif dédiée à soutenir les orphelins et les personnes dans le besoin à travers diverses initiatives communautaires.",
    images: ["/avatars/logo.jpeg"], 
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          {children}
          <LargeWithLogoCentered />
          <Link
            href="https://wa.me/+242066924278?text=Bonjour,je souhaite en savoir plus."
            className="circle-ripple"
            fontSize={"40px"}
          >
            <FaWhatsapp />
          </Link>
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
