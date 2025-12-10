import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "https://bioveti.ro"; // TODO: Update with actual domain

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Clinica Veterinara Bioveti Timisoara",
    template: "%s | Clinica Bioveti",
  },
  description: "Servicii veterinare complete în Timișoara: consultații, chirurgie, analize laborator, vaccinări, ecografie și urgențe veterinare. Echipa noastră de medici veterinari vă așteaptă cu drag.",
  keywords: [
    "veterinar Timisoara",
    "clinica veterinara",
    "consultatii veterinare",
    "chirurgie animale",
    "vaccin caine",
    "deparazitare pisica",
    "analize veterinare",
    "urgente veterinare Timisoara",
    "cabinet veterinar",
    "Bioveti"
  ],
  authors: [{ name: "Bioveti Team" }],
  creator: "Bioveti",
  publisher: "Bioveti",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Clinica Veterinara Bioveti Timisoara",
    description: "Servicii veterinare de top pentru prietenul tău necuvântător. Suntem aici pentru a oferi cea mai bună îngrijire.",
    url: baseUrl,
    siteName: "Clinica Bioveti",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/hero4.jpg", // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: "Clinica Veterinara Bioveti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinica Veterinara Bioveti Timisoara",
    description: "Servicii veterinare complete și îngrijire cu compasiune.",
    images: ["/hero4.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        <Nav />
        <main className="flex-auto min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
