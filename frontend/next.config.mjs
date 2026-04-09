/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // generates static HTML/CSS/JS in 'out' folder
  trailingSlash: true, // optional, helps with file serving
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
