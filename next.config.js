module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config

    const newConfig = Object.assign(config);
    newConfig.output.globalObject = "self";
    console.log(newConfig.output);

    return newConfig;
  },
};
