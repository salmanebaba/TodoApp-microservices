import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TodoApp - Microservices',
  description: 'A modern todo application built with microservices architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
