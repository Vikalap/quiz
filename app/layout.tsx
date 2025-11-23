import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "./components/providers/SidebarProvider";
import { SearchProvider } from "./components/providers/SearchProvider";
import { AuthProvider } from "./components/providers/AuthProvider";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { MobileMenuButton } from "./components/layout/MobileMenuButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "QuizHub - Interactive Quiz Platform",
  description: "Test your knowledge across multiple categories with our interactive quiz platform",
  keywords: ["quiz", "education", "learning", "knowledge", "test"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <SidebarProvider>
            <SearchProvider>
              <div className="flex min-h-screen flex-col">
                <MobileMenuButton />
                <Sidebar />
                <div className="flex-1 lg:pl-64">
                  <Header />
                  <main className="min-h-[calc(100vh-4rem)]">{children}</main>
                  <Footer />
                </div>
              </div>
            </SearchProvider>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
