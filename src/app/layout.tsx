import type { Metadata } from 'next';
import { Playfair_Display, Sora } from 'next/font/google';
import './globals.css';

const headingFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800']
});

const bodyFont = Sora({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Ke Trancas | Catalogo Profissional',
  description: 'Site profissional com catalogo, videos, avaliacoes e painel admin com autonomia total.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}
