// rollup.config.js
import typescript from 'rollup-plugin-typescript';

export default [
  {
    input: "./src/system-plugin-vue-inbrowser.ts",
    output: {
      name: "SystemPluginVueInbrowser",
      file: "./src/system-plugin-vue-inbrowser.ts.js",
      format: "esm"
    },
    plugins: [typescript()]
  },
  /**
   * export develop
   */
  {
    input: "./src/system-plugin-vue-inbrowser.ts",
    output: {
      name: "SystemPluginVueInbrowser",
      file: "./examples/src/plugin-vue-inbrowser.js",
      format: "iife"
    },
    plugins: [typescript()]
  }
];