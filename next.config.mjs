let userConfig;
try {
  userConfig = await import("./v0-user-next.config.js"); // Ensure the path and file extension are correct
} catch (e) {
  console.warn("User configuration could not be loaded:", e);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return;
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === "object" &&
      !Array.isArray(nextConfig[key]) &&
      typeof userConfig[key] === "object" &&
      !Array.isArray(userConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }
}

mergeConfig(nextConfig, userConfig);

export default nextConfig;
