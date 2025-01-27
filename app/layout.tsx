import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ferdinand Halim Santoso",
  description: "Ferdinand Halim Santoso's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
