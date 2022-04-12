// /next.config.js
/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const config = {
  pwa: {
    dest: "public",
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],  // 追加
  },
};

module.exports = withPWA(config);