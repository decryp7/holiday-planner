/** @type {import('next').NextConfig} */
const nextConfig = (process.env.CODE_SERVER == undefined) ? {
    output: 'standalone',
} :
{
    assetPrefix: '/proxy/3000',
}

module.exports = nextConfig
