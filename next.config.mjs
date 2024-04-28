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
};

export default nextConfig;