// import React from "react";

// const Input = () => {
//   return <div>Input</div>;
// };

// export default Input;

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
    <div className={cn("rounded-full", className)}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "px-6 py-3 text-2xl text-cosmic-text rounded-full border-2 border-cosmic-text bg-inkpaper-text"
        )}
      />
    </div>
  );
};

export default Input;
