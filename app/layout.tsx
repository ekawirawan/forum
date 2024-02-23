import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProgressProvider from "@/components/providers/ProgressProvider";
import TanstackProvider from "@/components/providers/TanstackProvider";
import { Toaster } from "sonner";
import NextAuthSessionProvider from "@/components/providers/NextAuthSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <NextAuthSessionProvider>
          <TanstackProvider>
            <ProgressProvider>
              {children}
              <Toaster />
            </ProgressProvider>
          </TanstackProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
