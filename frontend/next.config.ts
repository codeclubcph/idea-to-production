import type { NextConfig } from "next";

/**
 * Next.js configuration.
 *
 * NEXT_PUBLIC_API_URL is the backend base URL.
 * It is injected at build time (or runtime via Docker env vars).
 *
 * Inside Docker Compose the frontend calls the backend via the service name:
 *   http://backend:8080
 *
 * On the developer's machine it defaults to:
 *   http://localhost:8080
 */
const nextConfig: NextConfig = {
  // `standalone` output bundles everything needed to run Next.js without
  // node_modules in production – required by the multi-stage Dockerfile.
  output: "standalone",
};

export default nextConfig;
