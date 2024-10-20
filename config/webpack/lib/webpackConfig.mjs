const webpackConfig = (_config, options) => {
  let config = _config;

  const methods = {
    use: (plugin) => {
      config = plugin(config, options);
      return methods;
    },
    apply: () => config,
  };

  return methods;
};

export default webpackConfig;
