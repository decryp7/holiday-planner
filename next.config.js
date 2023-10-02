/** @type {import('next').NextConfig} */
const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require("next/constants");

const nextConfig = (process.env.CODE_SERVER === undefined) ? {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.cwa.gov.tw',
                port: '',
                pathname: '/V8/assets/img/weather_icons/weathers/svg_icon/day/**',
            },
        ],
    }
} :
{
    assetPrefix: '/proxy/3000',
}

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
        const withPWA = require("@ducanh2912/next-pwa").default({
            dest: "public",
            reloadOnOnline: true,
        });
        return withPWA(nextConfig);
    }
    return nextConfig;
};
