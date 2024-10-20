import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const applyBundleAnalyzerPlugin = (config, { isServer }) => {
  const ANALYZE_MODE = process.env.ANALYZE;
  
  if (!isServer && ANALYZE_MODE) {
    const analyzerConfig = { openAnalyzer: true };
    const reportFilename = 'bundle-analyzer-report';

    switch (ANALYZE_MODE) {
      case '1':
        analyzerConfig.analyzerMode = 'static';
        analyzerConfig.reportFilename = `${reportFilename}.html`;
        break;
      case '2':
        analyzerConfig.analyzerMode = 'json';
        analyzerConfig.reportFilename = `${reportFilename}.json`;
        break;
    }

    config.plugins.push(new BundleAnalyzerPlugin(analyzerConfig));
  }

  return config;
};

export default applyBundleAnalyzerPlugin;