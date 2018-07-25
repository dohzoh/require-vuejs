# systemjs-vue-inbrowser
> SystemJS plugin to async and dynamic load and parse .vue single file components 

## What this library can do

* Real time integration 
* Don't need build to use
* Used as SystemJS plugin 
* You can use syntax detection from your IDE
* Suport for [single file component](https://vuejs.org/v2/guide/single-file-components.html)
* Work with or without extension
* Support .html and .vue files 
* CSS inside component file

## What this library can't do
* Parse Jade and other templates 
* Scoped css 

## Dist

    https://github.com/dohzoh/systemjs-vue-inbrowser/raw/develop/dist/plugin-vue-inbrowser.js
    https://github.com/dohzoh/systemjs-vue-inbrowser/raw/develop/dist/plugin-vue-inbrowser.min.js


## examples

 * [Responsive ChessGrid Component using VueJS and SystemJS](https://next.plnkr.co/plunk/ejo8AEKAjPrwGSHk)
 * [Vue Router + Vuetify JS Example in browser without webpack](https://next.plnkr.co/plunk/1vHV3T)


### File structure

    app.js
    component.vue
    index.html

### Source code example

index.html

```html
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8" />
      <title>Simple Vue</title>
    </head>
    
    <body>
      <div id="app">
        <my-component></my-component>
      </div>
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/6.0.20/browser.min.js"></script>
    
    <script src="https://unpkg.com/systemjs/dist/system.js"></script>
    <script src="./app.js"></script>
    
    </html>
```
---

Create your component:  ( component.vue )
```html
<template>
  <div>
      {{text}}
  </div>
</template>
<script>
export default {
  data: function() {
    return { text: "Ok" };
  }
};
</script>
```
---

Create your app code: ( app.js )
```js
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
```

## Contributing

[CONTRIBUTING](https://github.com/edgardleal/require-vuejs/blob/master/CONTRIBUTING.md)

## License  

[MIT](https://github.com/dohzoh/systemjs-vue-inbrowser/blob/develop/LICENSE)

## Code of Conduct  

[https://js.foundation/conduct/](https://js.foundation/conduct/)

