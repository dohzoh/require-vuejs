// pnpm i @types/systemjs
System.config({
    map: {
        Vue: "https://unpkg.com/vue",
        vue: "/src/plugin-vue-inbrowser.min.js",
        "plugin-babel": "https://unpkg.com/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "https://unpkg.com/systemjs-plugin-babel/systemjs-babel-browser.js"
    },
    meta: {
        "*.vue": { loader: "vue" }
    },
    transpiler: "plugin-babel"
});
System["import"]("Vue").then(function (Vue) {
    var app = new Vue({
        el: "#app",
        components: {
            myComponent: function () { return System["import"]("./component.vue"); }
        }
    });
});
