import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pattys",
  description: "A blog for Pattys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
