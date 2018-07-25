// pnpm i @types/systemjs
System.config({
    map: {
        Vue: "https://unpkg.com/vue",
        vue: "../src/plugin-vue-inbrowser.min.js",
        "plugin-babel": "https://unpkg.com/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "https://unpkg.com/systemjs-plugin-babel/systemjs-babel-browser.js"
    },
    meta: {
        "*.vue": { loader: "vue" }
    },
    transpiler: "plugin-babel"
});
Promise.all([System["import"]("Vue")]).then(function (_a) {
    var Vue = _a[0];
    new Vue({
        el: "#app",
        components: {
            myComponent: function () { return System["import"]("./component.vue!vue"); },
            myComponent2: function () { return System["import"]("./component2.vue!vue"); },
            fromAlias: function () { return System["import"]("./using_alias.vue"); }
        }
    });
});
