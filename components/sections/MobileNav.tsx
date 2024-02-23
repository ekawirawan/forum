"use client";

import React, { useState } from "react";
import { links } from "@/libs/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfilePhoto from "../ui/ProfilePhoto";
import SignOutNav from "../ui/SignOutNav";

const MobileNav = () => {
  const { data } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button type="button" onClick={openMenu} className="block lg:hidden">
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="14" y="8.5" width="28" height="3" rx="1.5" fill="#111827" />
          <rect x="14" y="19.5" width="28" height="3" rx="1.5" fill="#111827" />
          <rect x="27" y="30.5" width="15" height="3" rx="1.5" fill="#111827" />
        </svg>
      </button>
      <div
        className={`${
          isOpen ? "left-0" : "left-full"
        } transition-all bg-white absolute w-full h-screen left-0 right-0 bottom-0 top-0`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <span className="block font-semibold text-2xl">Menu</span>
          <button type="button" onClick={closeMenu}>
            <svg
              width="30px"
              height="30px"
              viewBox="-0.5 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 21.32L21 3.32001"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 3.32001L21 21.32"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <nav className="p-4 py-4">
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
          <div className="flex items-center gap-4 px-3 py-2 mt-10">
            <ProfilePhoto character={data?.user.fullName} />
            <SignOutNav />
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
