/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  // https://github.com/facebook/react/issues/24502
  reactStrictMode: false,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) =>
    Object.assign({}, config, {
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
    }),
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
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
