"use client";

import Header from "../sections/Header";
import Aside from "../sections/Aside";
import { usePathname } from "next/navigation";

type AppShellProps = {
  children: React.ReactNode;
};
const disableNavbar = ["/sign-in", "/sign-up"];

const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  return (
    <>
      {!disableNavbar.includes(pathname) && (
        <>
          <Header />
          <Aside />
        </>
      )}
      {children}
    </>
  );
};

export default AppShell;
