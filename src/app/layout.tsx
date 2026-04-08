import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sharmlytics — DTC Analytics Platform',
  description: 'Purpose-built analytics for DTC brands. Track customer journeys, conversions, and behavior patterns that matter for e-commerce growth.',
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
