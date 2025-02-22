import { cn } from "@/utils/cn";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`antialiased scroll-smooth`, inter.className)}>
        {children}
      </body>
    </html>
  );
}
