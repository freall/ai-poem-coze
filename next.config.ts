import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/ai-poem-coze', // GitHub Pages 子路径
  assetPrefix: '/ai-poem-coze', // 静态资源前缀
  trailingSlash: true, // 确保所有 URL 以斜杠结尾
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
