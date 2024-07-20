/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://www.visiteauxorphelins.com/api/:path*', // Proxy vers l'API
        },
      ];
    },
  };
  
  export default nextConfig;
  