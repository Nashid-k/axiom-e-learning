import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
            {
                source: '/fonts/(.*)',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            {
                source: '/images/(.*)',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=31536000' }],
            },
        ];
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**.alphacoders.com' },
            { protocol: 'https', hostname: 'i.imgur.com' },
            { protocol: 'https', hostname: 'i.ytimg.com' },
            { protocol: 'https', hostname: 'images.weserv.nl' },
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
        ]
    }
};

export default bundleAnalyzer(nextConfig);