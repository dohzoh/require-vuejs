//var System = require("systemjs");
System.config({
    map: {
        Vue: "https://unpkg.com/vue",
        VueRouter: "https://unpkg.com/vue-router/dist/vue-router.js",
        vue: "/src/plugin-vue-inbrowser.min.js",
        "plugin-babel": "https://unpkg.com/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "https://unpkg.com/systemjs-plugin-babel/systemjs-babel-browser.js"
    },
    meta: {
        "*.vue": { loader: "vue" }
    },
    transpiler: "plugin-babel"
});
Promise.all([System["import"]("Vue"), System["import"]("VueRouter")]).then(function (_a) {
    var Vue = _a[0], VueRouter = _a[1];
    Vue.use(VueRouter);
    var Home = { template: "<div>home</div>" };
    var router = new VueRouter({
        mode: "history",
        routes: [
            { path: "/", component: Home },
            { path: "/post/:id", component: function () { return System["import"]("Post.vue"); } }
        ]
    });
    new Vue({
        el: "#app",
        router: router,
        template: "\n    <div id=\"app\">\n      <h1>Data Fetching</h1>\n      <ul>\n        <li><router-link to=\"/\">/</router-link></li>\n        <li><router-link to=\"/post/1\">/post/1</router-link></li>\n        <li><router-link to=\"/post/2\">/post/2</router-link></li>\n        <li><router-link to=\"/post/3\">/post/3</router-link></li>\n      </ul>\n      <router-view class=\"view\"></router-view>\n    </div>\n  "
    });
});
