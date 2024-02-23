"use client";

import React from "react";
import Link from "next/link";
import ProfilePhoto from "../ui/ProfilePhoto";
import Button from "../ui/Button";
import SignOutNav from "../ui/SignOutNav";
import { useSession } from "next-auth/react";
import Dropdown from "../ui/dropdown/Dropdown";
import MenuDropdown from "../ui/dropdown/MenuDropdown";
import MobileNav from "./MobileNav";

const Header = () => {
  const { data } = useSession();
  return (
    <header className="sticky top-0 border-b bg-white/10 backdrop-blur-sm z-10">
      <nav className="flex items-center justify-between h-16 px-6">
        <Link href="/" className="font-semibold text-xl">
          TheForum
        </Link>
        <Dropdown className="hidden lg:block success">
          <Button type="button" className="solid p-0">
            <ProfilePhoto character={data?.user.fullName} />
          </Button>
          <MenuDropdown className="bottom-left">
            <SignOutNav />
          </MenuDropdown>
        </Dropdown>
        <MobileNav />
      </nav>
    </header>
  );
};

export default Header;
