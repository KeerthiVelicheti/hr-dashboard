'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ❌ metadata is removed, as it's not allowed in client components

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <header className="flex justify-between items-center p-4 border-b bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700">
            <h1 className="text-2xl font-bold">HR Dashboard</h1>
            <ThemeToggle />
          </header>
          <main className="p-4 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
