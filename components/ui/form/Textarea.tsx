import React, { RefObject } from "react";
import { cn } from "@/libs/utils";

type TextareaProps = {
  forwardedRef?: RefObject<HTMLTextAreaElement>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ forwardedRef, className, ...props }: TextareaProps) => {
  return (
    <textarea
      ref={forwardedRef}
      {...props}
      className={cn("input", className)}
    ></textarea>
  );
};

export default Textarea;
