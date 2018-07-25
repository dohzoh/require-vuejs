// rollup.config.js
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import gzip from "rollup-plugin-gzip";

export default [
  /**
   * export develop
   */
  {
    input: "./src/plugin-vue-inbrowser.ts",
    output: {
      name: "SystemPluginVueInbrowser",
      file: "./dist/plugin-vue-inbrowser.js",
      format: "esm"
    },
    plugins: [typescript()]
  },
  /**
   * export production
   */
  {
    input: "./src/plugin-vue-inbrowser.ts",
    output: {
      name: "SystemPluginVueInbrowser",
      file: "./dist/plugin-vue-inbrowser.min.js",
      format: "esm"
    },
    plugins: [typescript(), terser()]
  },
  /**
   * export for sample
   */
  {
    input: "./src/plugin-vue-inbrowser.ts",
    output: {
      name: "SystemPluginVueInbrowser",
      file: "./examples/src/plugin-vue-inbrowser.min.js",
      format: "esm"
    },
    plugins: [typescript(), terser()]
  }
];
