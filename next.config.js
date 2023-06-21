/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config) =>
    Object.assign({}, config, {
      ignoreWarnings: [
        // https://github.com/graphprotocol/graph-client/issues/480
        { module: /graphql-mesh\/utils\/esm\/defaultImportFn.js/ },
      ],
    }),
};

module.exports = nextConfig;
