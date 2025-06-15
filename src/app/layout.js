import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Links | Share Smarter, Track Better",
  description: "Create, manage, and track smart links with real-time analytics. Make every click count with beautifully branded, data-driven links.",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
