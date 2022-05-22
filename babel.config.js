const presets = [
  [
    '@babel/preset-env',
    {
      corejs: '3',
      modules: 'commonjs',
      targets: { browsers: ['> 1%', 'safari >= 7', 'IE 11'] },
      useBuiltIns: 'usage',
    },
  ],
  '@babel/preset-react',
  '@babel/preset-typescript',
];

const plugins = [
  '@babel/plugin-transform-runtime',
  'babel-plugin-styled-components',
  [
    'module-resolver',
    {
      alias: {
        __mocks__: './src/__mocks__',
        assets: './src/assets',
        components: './src/components',
        constants: './src/constants',
        lib: './src/lib',
        store: './src/store',
        styles: './src/styles',
      },
    },
  ],
  ['@babel/plugin-proposal-decorators', { legacy: true }], // Must come before class properties plugin
];

module.exports = function (api) {
  api.cache.forever();

  return {
    plugins,
    presets,
  };
};
