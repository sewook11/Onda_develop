// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onda-s3-2025-06-11.s3.amazonaws.com',
        pathname: '/**', // 전체 경로 허용
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/users/verify/email',
        destination: '/users/verify/email', // 실제 페이지 경로
      },
    ];
  },
};

module.exports = nextConfig;
