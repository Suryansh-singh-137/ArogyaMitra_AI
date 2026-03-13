import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Sehat AI — स्वास्थ्य सहायक",
  description:
    "Free AI health assistant for rural India. Symptom checker in Hindi and regional languages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${bebas.variable} ${montserrat.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
