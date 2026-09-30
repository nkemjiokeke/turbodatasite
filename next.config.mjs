/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The old case-study page was removed; send existing links somewhere useful.
      { source: "/impact", destination: "/how-it-works", permanent: true },
    ]
  },
}

export default nextConfig
