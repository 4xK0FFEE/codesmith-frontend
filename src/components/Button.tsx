import { cn } from "@/utils/cn";
import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <div className={cn("bg-cosmic-card rounded-full w-fit", className)}>
      <button
        className={cn(
          "bg-cosmic-primary px-6 py-3 text-2xl font-black text-cosmic-text rounded-full border-2 border-cosmic-text",
          "transition duration-150 ease-in-out transform hover:translate-x-1 hover:-translate-y-1"
        )}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
