// config-overrides.js
module.exports = function override(config, env) {
    // Измените настройки Webpack здесь
    if (config.devServer) {
      config.devServer.setupMiddlewares = (middlewares, devServer) => {
        // ваша настройка middleware
        return middlewares;
      };
    }
    return config;
  };
  