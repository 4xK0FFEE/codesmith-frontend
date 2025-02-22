import React, { ChangeEvent } from "react";
import { cn } from "@/utils/cn";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input = ({ value, onChange, placeholder, className }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "rounded-xl px-4 py-2 text-cosmic-text border-2 border-cosmic-text",
        className
      )}
    />
  );
};

export default Input;
