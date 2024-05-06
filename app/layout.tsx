import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppContextProvider from "./context/ContextApp";
import StoreProvider from "@/redux/StoreProvider";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram",
  description: "Generated by create next app",
  icons: {
    icon: "./icon.png"
  }
};

export default async function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider >
          < AppContextProvider >
            {children}
          </ AppContextProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
