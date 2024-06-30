import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/ProgressBar";
import AuthWrapper from "@/auth/auth-wrapper";
import { dbConnect } from "@/lib/mongo";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: {
    default: "Logos Construction Office",
    template: "Logos - %s",
  },
  description: "Logos Construction Office",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-primary`}>
        <AuthWrapper>
          <Providers>{children}</Providers>
          <Toaster position="top-center" />
        </AuthWrapper>
      </body>
    </html>
  );
}
