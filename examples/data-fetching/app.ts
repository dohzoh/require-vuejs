declare function require(x: string): any;
var System = require("systemjs");

System.config({
  map: {
    Vue: "https://unpkg.com/vue",
    VueRouter: "https://unpkg.com/vue-router/dist/vue-router.js",
    vue: "/src/plugin-vue-inbrowser.min.js",
    "plugin-babel": "https://unpkg.com/systemjs-plugin-babel/plugin-babel.js",
    "systemjs-babel-build":
      "https://unpkg.com/systemjs-plugin-babel/systemjs-babel-browser.js"
  },
  meta: {
    "*.vue": { loader: "vue" }
  },
  transpiler: "plugin-babel"
});

Promise.all([System.import("Vue"), System.import("VueRouter")]).then(
  ([Vue, VueRouter]) => {
    Vue.use(VueRouter);

    const Home = { template: "<div>home</div>" };

    const router = new VueRouter({
      mode: "history",
      routes: [
        { path: "/", component: Home },
        { path: "/post/:id", component: () => System.import("Post.vue") }
      ]
    });

    new Vue({
      el: "#app",
      router,
      template: `
    <div id="app">
      <h1>Data Fetching</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/post/1">/post/1</router-link></li>
        <li><router-link to="/post/2">/post/2</router-link></li>
        <li><router-link to="/post/3">/post/3</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
    });
  }
);
