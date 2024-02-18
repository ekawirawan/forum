import React from "react";
import { cn } from "@/libs/utils";

type Dropdown = React.HTMLProps<HTMLDivElement>;

const Dropdown = ({ children, className }: Dropdown) => {
  return <div className={cn("dropdown", className)}>{children}</div>;
};

export default Dropdown;
