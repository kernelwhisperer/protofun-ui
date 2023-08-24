import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('@sentry/nextjs/types/config/types').WebpackConfigFunction} */
const webpack = (config) => {
  /** @type {import('@sentry/nextjs/types/config/types').WebpackConfigObject} */
  const overrides = {
    ignoreWarnings: [
      // https://github.com/graphprotocol/graph-client/issues/480
      { module: /graphql-mesh\/utils\/esm\/defaultImportFn.js/ },
    ],
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
  };

  return Object.assign({}, config, overrides);
};

/** @type {import('next').NextConfig} */
let nextConfig = {
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  output: "standalone",
  // https://github.com/facebook/react/issues/24502
  reactStrictMode: false,
  redirects: async () => [
    {
      destination: "https://protocol.fun/:path*",
      has: [{ type: "host", value: "www.protocol.fun" }],
      permanent: true,
      source: "/:path*",
    },
  ],
  async rewrites() {
    return [
      {
        destination: "https://api-eu.mixpanel.com/:slug",
        source: "/mp/:slug",
      },
      {
        destination: "https://eu.posthog.com/:path*",
        source: "/ph/:path*",
      },
    ];
  },
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack,
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

nextConfig = withBundleAnalyzer(nextConfig);

nextConfig = withSentryConfig(
  nextConfig,
  {
    org: "coldpizza",

    project: "protofun",

    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    // Suppresses source map uploading logs during build
    silent: true,
  },
  {
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: false,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
  }
);

// nextConfig = million.next(nextConfig, {
//   // if you're using RSC:
//   auto: { rsc: true },
// });

export default nextConfig;
