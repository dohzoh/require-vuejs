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

[Responsive ChessGrid Component using VueJS and SystemJS](https://next.plnkr.co/plunk/ejo8AEKAjPrwGSHk)

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
            <title>Require Vue</title>
        </head>
        <body>
            <div id="app">
                <my-component></my-component>
        </div>
            <script data-main="app" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.3/require.min.js" ></script>
        </body>
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
      define(["Vue"], function(Vue) {
          Vue.component("my-component", {
              template: template, // the variable template will be injected 
              data: function() {
                  return {"text": "Ok"};
              }
          });
        });
    </script>
```
---

Create your app code: ( app.js )
```js
    requirejs.config({
        paths: {
            "Vue": "https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.1/vue.min",
            "vue": "https://rawgit.com/edgardleal/require-vue/master/dist/require-vuejs"
        },
        shim: {
            "Vue": {"exports": "Vue"}
        }
    });
    
	// to use component in your code with RequireJS: 
	// put a reference to your component file with or without extencion after 'vue!' 
    require(["Vue", "vue!component"], function(Vue){
        var app = new Vue({
            el: "#app"
        });
    });
```

## Contributing

[CONTRIBUTING](https://github.com/edgardleal/require-vuejs/blob/master/CONTRIBUTING.md)

## License  

[MIT](https://github.com/dohzoh/systemjs-vue-inbrowser/blob/develop/LICENSE)

## Code of Conduct  

[https://js.foundation/conduct/](https://js.foundation/conduct/)

