/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://orphelinat-newsletter.vercel.app/api/:path*', // Proxy vers l'API
        },
      ];
    },
  };
  
  export default nextConfig;
  