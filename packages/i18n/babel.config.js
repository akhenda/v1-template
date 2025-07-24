const plugins = () => {
  const defaultPlugins = [
    [
      'i18next-extract',
      {
        discardOldKeys: true,
        locales: ['en'],
        keySeparator: null,
        nsSeparator: null,
        keyAsDefaultValue: ['en'],
        keyAsDefaultValueForDerivedKeys: false,
        outputPath: 'locales/en.json',
      },
    ],
  ];

  return defaultPlugins;
};

// biome-ignore lint/complexity/useArrowFunction: it's okay
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['@babel/preset-typescript'],
    plugins: plugins(),
    ignore: [
      /node_modules/,
      /dist/,
      /generate/,
      /public/,
      /.turbo/,
      /.next/,
      /_generated/,
      /.content-collections/,
    ],
  };
};
