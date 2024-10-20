const applyOptimization = (config, options) => {
  config.optimization = {
    ...config.optimization,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          name: 'react-vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        },
      },
    },
  };

  return config;
};

export default applyOptimization;