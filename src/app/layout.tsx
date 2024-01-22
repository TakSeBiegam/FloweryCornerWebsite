import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/logic/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kwiecisty zakątek",
  description: "Twoja kwiaciarnia od 1926",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={`${inter.className} bg-primary-bg`}>{children}</body>
      </CartProvider>
    </html>
  );
}
