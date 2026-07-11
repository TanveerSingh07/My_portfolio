/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github-readme-stats.vercel.app" },
      { protocol: "https", hostname: "ghchart.rshah.org" },
      { protocol: "https", hostname: "leetcard.jacoblin.cool" },
    ],
  },
};

export default nextConfig;
