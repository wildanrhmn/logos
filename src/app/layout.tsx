import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/ProgressBar";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: {
    default: "Logos - Aprenda a criar logos com os melhores",
    template: "Logos - %s",
  },
  description: "Aprenda a criar logos com os melhores do Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-primary`}>
        <Providers>{children}</Providers>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
