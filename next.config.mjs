import cacheControlHeaders from './config/headers/cache-control.headers.mjs';
import securityHeaders from './config/headers/security.headers.mjs';
import applyBundleAnalyzerPlugin from './config/webpack/bundle-analyzer.config.mjs';
import applyOptimization from './config/webpack/optimization.config.mjs';
import applyPathResolve from './config/webpack/path-resolve.config.mjs';
import webpackConfig from './config/webpack/lib/webpackConfig.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => webpackConfig(config, options)
    .use(applyBundleAnalyzerPlugin)
    .use(applyOptimization)
    .use(applyPathResolve)
    .apply(),
  async headers() {
    return [
      securityHeaders,
      ...cacheControlHeaders,
    ];
  },
};

export default nextConfig;
