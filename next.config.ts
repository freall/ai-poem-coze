import type { NextConfig } from 'next';

// 检测是否是 GitHub Pages 部署
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  /* config options here */
  // 只在 GitHub Pages 部署时使用 basePath
  ...(isGitHubPages ? {
    basePath: '/ai-poem-coze',
    assetPrefix: '/ai-poem-coze',
  } : {}),
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
