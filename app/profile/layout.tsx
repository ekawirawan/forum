import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Aside from "@/components/sections/Aside";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile user",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Aside />
      {children}
    </>
  );
}
