/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [ {
      protocol: "https",
      hostname: "j3rzy.dev",
      port: "",
      pathname: "/images/**",
    }, ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1Gb"
    }
  }
};

export default nextConfig;