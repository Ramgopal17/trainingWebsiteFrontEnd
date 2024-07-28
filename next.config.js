/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: false,
  trailingSlash: true,
  output: "export",
  images: {
    loader: "imgix",
    path: "/",
  },
};
module.exports = nextConfig;
