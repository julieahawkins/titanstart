/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['media.dndbeyond.com'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.dndbeyond.com',
            port: '',
            pathname: 'mega-menu/5188e9cd133362e349708cd3c859a6d2.gif',
          },
        ],
      },
};

export default nextConfig;
