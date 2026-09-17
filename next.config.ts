import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      { source: "/workflows", destination: "/runbooks/spec", permanent: false },
      { source: "/workflows/:slug", destination: "/runbooks/spec", permanent: false },
      { source: "/analysis", destination: "/runbooks/spec", permanent: false },
      { source: "/analysis/:path*", destination: "/runbooks/spec", permanent: false },
      { source: "/runbooks/advanced", destination: "/runbooks/spec", permanent: false },
      { source: "/runbooks/commands", destination: "/runbooks/spec", permanent: false },
      { source: "/runbooks/commands/:slug", destination: "/runbooks/spec", permanent: false },
      { source: "/runbooks/101", destination: "/runbooks/spec", permanent: false },
      { source: "/runbooks/201", destination: "/runbooks/spec", permanent: false },
    ];
  },
};

export default nextConfig;
