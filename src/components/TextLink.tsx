import { cn } from "@/utils/cn";
import Link from "next/link";
import React, { HTMLAttributeAnchorTarget } from "react";

interface TextLinkProps {
  text: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
}

const TextLink = ({
  text,
  href,
  target = "_self",
  className,
}: TextLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-block no-underline font-bold",
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current",
        "after:transition-all after:duration-300 after:ease-in-out",
        "hover:after:w-full",
        className
      )}
      target={target}
    >
      {text}
    </Link>
  );
};

export default TextLink;
