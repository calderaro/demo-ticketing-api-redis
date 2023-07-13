// babel is only required for jest to work with typescript. This is not required to build the project.

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
