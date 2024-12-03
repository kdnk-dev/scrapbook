// @ts-check
const removeImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
const nextConfig = removeImports({
  experimental: { esmExternals: true },
});

module.exports = nextConfig;
