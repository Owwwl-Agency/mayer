import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import FontFaces from "@/components/FontFaces";
import SmoothScroll from "@/components/SmoothScroll";

import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mayer Aesthetics Group",
  description: "Совершенство не придумывают. Его делают заметным.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-[#202020]">
        <FontFaces />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
