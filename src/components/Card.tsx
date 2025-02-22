import { cn } from "@/utils/cn";
import React from "react";
import Button from "./Button";

interface CardProps {
  text: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
  className?: string;
}

const Card = ({
  text,
  description,
  buttonText,
  onClick,
  className,
}: CardProps) => {
  return (
    <div
      className={cn(
        "relative border-2 border-cosmic-text rounded-2xl text-2xl p-4 flex flex-col min-w-72 min-h-48 bg-inkpaper-secondary",
        className
      )}
    >
      <span className="font-bold">{text}</span>
      <span className="text-sm">{description}</span>
      <Button
        text={buttonText}
        className="absolute bottom-4 right-4"
        onClick={onClick}
      />
    </div>
  );
};

export default Card;
