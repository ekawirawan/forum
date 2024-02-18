import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Aside from "@/components/sections/Aside";

export const metadata: Metadata = {
  title: "Forum",
  description: "Discuss in forum",
};

export default function ForumLayout({
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
