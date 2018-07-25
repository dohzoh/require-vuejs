declare function require(x: string): any;
var System = require("systemjs");

System.config({
  map: {
    Vue: "https://unpkg.com/vue",
    vue: "../src/plugin-vue-inbrowser.min.js",
    "plugin-babel": "https://unpkg.com/systemjs-plugin-babel/plugin-babel.js",
    "systemjs-babel-build":
      "https://unpkg.com/systemjs-plugin-babel/systemjs-babel-browser.js"
  },
  meta: {
    "*.vue": { loader: "vue" }
  },
  transpiler: "plugin-babel"
});
Promise.all([System.import("Vue")]).then(([Vue]) => {
  new Vue({
    el: "#app",
    components: {
      myComponent: () => System.import("./component.vue!vue"),
      myComponent2: () => System.import("./component.html!vue"),
      fromAlias: () => System.import("./using_alias.vue")
    }
  });
});
