const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "web", // Set the target to 'web' for browser compatibility
  // ... other webpack configuration options
};
