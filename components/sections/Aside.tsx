"use client";

import React from "react";
import { links } from "@/libs/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Aside = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:block fixed w-80 left-0 h-screen right-0 lg:top-16">
      <nav className="pl-14 pr-4 py-4">
        <ul className="space-y-2">
          {links.map((link, idx) => (
            <li key={idx} className="w-full">
              <Link
                href={link.hash}
                className={`${
                  pathname === link.hash ? "active" : "hover:bg-primary/20"
                } flex items-center gap-4 rounded-lg text-base font-medium px-3 py-2`}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
