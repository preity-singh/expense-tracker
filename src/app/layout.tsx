import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import Layout from "@/components/layout/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker - Manage Your Personal Finances",
  description: "A modern, intuitive expense tracking application to help you manage your personal finances, categorize expenses, and analyze spending patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ExpenseProvider>
          <Layout>
            {children}
          </Layout>
        </ExpenseProvider>
      </body>
    </html>
  );
}
