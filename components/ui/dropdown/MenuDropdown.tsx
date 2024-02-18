import React from "react";
import { cn } from "@/libs/utils";

type MenuDropdown = React.HTMLProps<HTMLDivElement>;

const MenuDropdown = ({ children, className }: MenuDropdown) => {
  return <div className={cn("menu", className)}>{children}</div>;
};

export default MenuDropdown;
