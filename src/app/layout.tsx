import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "ArogyaMitra AI — स्वास्थ्य सहायक",
  description: "Free AI health assistant for rural India.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${montserrat.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
