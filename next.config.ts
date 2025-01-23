import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [{
            protocol: 'https',
            hostname: '*',
        }
        ]
    },
    experimental: {
        ppr: 'incremental',
        after: true,
    },
    devIndicators: {    // this is for visualizing the build process(what's happening with ppr)
        appIsrStatus: true,
        buildActivity: true,
        buildActivityPosition: 'bottom-right',
    },
};

export default nextConfig;
