import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['*.dev.coze.site'],
  output: 'export', // 生成静态HTML文件，适用于GitHub Pages
  images: {
    unoptimized: true, // 禁用图片优化（静态导出需要）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
