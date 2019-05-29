/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const { getDefaultConfig } = require("metro-config");


module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      experimentalImportSupport: false,
      inlineRequires: false,
      babelTransformerPath: require.resolve("react-native-less-transformer"),
    },
    resolver: {
      sourceExts: [...sourceExts, "less"]
    },
  }
})();
