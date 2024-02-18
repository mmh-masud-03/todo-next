import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo App",
  description: "Get Things Done Easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center ">
        {children}
      </body>
    </html>
  );
}
