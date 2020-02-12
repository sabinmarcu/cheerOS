module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    [
      '@emotion',
      {
        sourceMap: true,
        labelFormat: '[local]',
        cssPropOptimization: true,
      },
    ],
  ],
};
