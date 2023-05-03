const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  // env.appComponents = (env.appComponents || []).concat(['./index.android']);

  webpack.init(env);

  return webpack.resolveConfig();
};
