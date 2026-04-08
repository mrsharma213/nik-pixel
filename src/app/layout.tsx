import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sharmlytics — DTC Analytics Platform',
  description: 'DTC analytics that actually understand e-commerce operations. Smart event tracking, attribution, and insights for scaling brands.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
