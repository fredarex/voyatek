import type { Metadata } from "next";
import { Work_Sans as FontSans } from "next/font/google"

// ** styles
import "../styles/globals.scss";
import '@smastrom/react-rating/style.css'
import 'react-toastify/dist/ReactToastify.css';
// ** Libs
import { cn } from "@/lib/utils"

// ** Store
import Providers from "./providers";
import { ToastContainer } from "react-toastify";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "voyatekgroup",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <html lang="en">
        <body   
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}>
            <Providers>
              <ToastContainer />
            {children}
            </Providers>
        </body>
      </html>
  );
}
