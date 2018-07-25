// pnpm i @types/node
// pnpm i @types/systemjs
/**
 * app.js
 *
 * Distributed under terms of the MIT license.
 */
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
Promise.all([
    System["import"]("Vue"),
    System["import"]("VueRouter"),
    System["import"]("./home.vue")
]).then(function (_a) {
    var Vue = _a[0], VueRouter = _a[1], home = _a[2];
    Vue.use(VueRouter);
    var router = new VueRouter({
        routes: [
            {
                path: "/inner",
                component: function () { return System["import"]("./inner_template.vue"); }
            },
            {
                path: "/html",
                component: function () { return System["import"]("./component2.vue"); }
            },
            { path: "/vue", component: function () { return System["import"]("./component.vue"); } },
            { path: "/async", component: function () { return System["import"]("./async.vue"); } },
            { path: "*", component: home["default"] }
        ]
    });
    new Vue({
        data: {
            started: new Date()
        },
        router: router,
        el: "#app"
    });
});
