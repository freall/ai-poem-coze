import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '古诗词大冒险',
    template: '%s | 古诗词大冒险',
  },
  description: '通过游戏化的方式学习24节气和传统节日的诗词，让诗词学习变得有趣又好记！',
  keywords: [
    '古诗词',
    '24节气',
    '传统节日',
    '诗词学习',
    '游戏化学习',
    '诗词教育',
  ],
  generator: 'Next.js',
  openGraph: {
    title: '古诗词大冒险 - 让诗词学习变得有趣',
    description: '通过游戏化的方式学习24节气和传统节日的诗词',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
