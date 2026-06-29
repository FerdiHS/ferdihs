import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ferdinand Halim Santoso",
  description: "Portfolio of Ferdinand Halim Santoso, focused on systems, data, and software engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
