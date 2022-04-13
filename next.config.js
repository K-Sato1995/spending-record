// /next.config.js
/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const config = {
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    register: true,
    skipWating: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
}

module.exports = withPWA(config)
