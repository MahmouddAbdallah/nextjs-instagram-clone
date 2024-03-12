/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'], // Add this line to specify the Cloudinary domain
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.cloudinary.com',
                port: '',
                pathname: '/account123/**',
            },
        ],
    },
};

export default nextConfig;
