import React from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

const Header = () => {
  const router = useRouter();

  return (
    <header className="container mx-auto flex items-center justify-between p-6">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">CodeSmith</span>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <Button variant="ghost" onClick={() => router.push("/explore")}>
          Explore Templates
        </Button>
        <Button variant="ghost" onClick={() => router.push("/generate")}>
          Custom Project
        </Button>
      </nav>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
