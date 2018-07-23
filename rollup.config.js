import { terser } from "rollup-plugin-terser";
import gzip from "rollup-plugin-gzip";

export default [
  /**
   * export production
   */
  {
    input: "src/system-plugin-vue-inbrowser.js",
    output: {
      file: "dist/plugin-vue-inbrowser.min.js",
      format: "iife"
    },
    plugins: [terser(), gzip()]
  },
  /**
   * export develop
   */
  {
    input: "src/system-plugin-vue-inbrowser.js",
    output: {
      file: "dist/plugin-vue-inbrowser.js",
      format: "iife"
    },
    plugins: []
  },
  /**
   * export sample
   */
  {
    input: "src/system-plugin-vue-inbrowser.js",
    output: {
      file: "examples/src/plugin-vue-inbrowser.min.js",
      format: "iife"
    },
    plugins: [terser()]
  }
];
