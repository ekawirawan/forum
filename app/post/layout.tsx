import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Aside from "@/components/sections/Aside";

export const metadata: Metadata = {
  title: "My Post",
  description: "My post",
};

export default function PostLayout({
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
