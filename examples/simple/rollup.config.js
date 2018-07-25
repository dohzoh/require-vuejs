import typescript from "rollup-plugin-typescript2";

export default {
  input: "./app.ts",
  output: {
    file: "app.js",
    format: "esm"
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          allowSyntheticDefaultImports: true,
          moduleResolution: "node",
          module: "es2015",
          lib: ["es2015"],
          types: ["node", "systemjs"]
        }
      }
    })
  ]
};
