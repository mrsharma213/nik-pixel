import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nik Sharma Analytics Pixel',
  description: 'Lightweight analytics pixel for tracking page views, conversions, and user behavior across nik.co properties.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
