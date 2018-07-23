  "use strict";
  /**
   * export.translate
   * Vue Plugin
   */
  exports.translate = (() => {
    return load => {
      let source = new SourceCompiler(load.source);
//      console.log(source);
      return (load.source = source.compile());
    };
  })();

  class SourceCompiler {
    constructor(source) {
      // original source
      this.source = source;
      this.script = this.extractScript(source);
      this.template = this.extractTemplate(source);
      this.style = this.extractCss(source);
      this.compiled = "";
    }

    /**
     * compile template into script
     * inpire by steal-vue
     * @link https://github.com/icanjs/steal-vue
     */
    compile() {
      let templateString = `template:  \`${this.template}\`, `;
      let match = this.script.match(
        /(name(.*):|data(.*){|methods(.*):|computed(.*):)/im
      );
      this.compiled =
        this.script.substr(0, match.index) +
        templateString +
        this.script.substr(match.index);

//      console.log(this.style);
      this.appendCSSStyle(this.style);

      return this.compiled;
    }

    /**
     * parse script
     * inpire by require-vuejs
     * @link https://github.com/edgardleal/require-vuejs
     */
    extractScript(text) {
      let start = text.indexOf("<script"); // I don't know why, but someone could use attributes on script tag
      let sizeOfStartTag = this._findCloseTag(text, start);
      let end = text.indexOf("</script>");
      let parsed = text.substring(sizeOfStartTag, end);
      //                    .replace(/(define\()\s*(\[.*)/, "$1\"parsedScript" + name + "\", $2");
      return parsed;
    }

    /**
     * parse template
     * inpire by require-vuejs
     * @link https://github.com/edgardleal/require-vuejs
     */
    extractTemplate(text) {
      var start = text.indexOf("<template>");
      var end = text.lastIndexOf("</template>");
      var text = text.substring(start + 10, end);
      return text;
    }
    /**
     * parse css
     * inpire by require-vuejs
     * @link https://github.com/edgardleal/require-vuejs
     */
    extractCss(text) {
      let start = text.indexOf("<style"); // I don't know why, but someone could use attributes on script tag
      let sizeOfStartTag = this._findCloseTag(text, start);
      var end = text.indexOf("</style>");

      if (sizeOfStartTag === -1) {
        return false;
      } else {
        return text
          .substring(sizeOfStartTag, end)
          .replace(/[\n\r]+/g, "")
          .replace(/ {2,20}/g, " ");
      }
    }
    /**
     * append into head
     * inpire by require-vuejs
     * @link https://github.com/edgardleal/require-vuejs
     */
    appendCSSStyle(css) {
      if (css && typeof document !== "undefined") {
        var style = document.createElement("style");
        var head = document.head || document.querySelector("head") || document.getElementsByTagName("head")[0];

        style.type = "text/css";
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
      }
    }

    _findCloseTag(text, start) {
      let i = start;
      while (i < text.length && text[i++] !== ">");
      return i;
    }
  }

