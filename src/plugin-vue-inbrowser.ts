"use strict";

/**
 * export.translate
 * Vue Plugin
 */
declare var exports;
exports.translate = (() => {
  return load => {
    let compiler = new Compiler(load);
    let compiled = compiler.compile();
    load.source = compiled;
    return load.source;
  };
})();

class Compiler {
  private _source: string;
  private _script: string;
  private _template: string;
  private _style: string;

  constructor(load) {
    this._source = load.source;
    this._script = this.extractScript();
    this._template = this.extractTemplate();
    this._style = this.extractCss();
  }

  /**
   * compile template into script
   * inpire by steal-vue
   * @link https://github.com/icanjs/steal-vue
   */
  public compile(): string {
    let templateString = `template:  \`${this._template}\`, `;
    let match = this._script.match(
      /(name(.*):|data(.*){|methods(.*):|computed(.*):)/im
    );
    let compiled =
      this._script.substr(0, match.index) +
      templateString +
      this._script.substr(match.index);

    //      console.log(this.style);
    this.appendCSSStyle(this._style);

    return compiled;
  }

  /**
   * parse script
   * inpire by require-vuejs
   * @link https://github.com/edgardleal/require-vuejs
   */
  public extractScript(): string {
    let text = this._source;
    let start = text.indexOf("<script"); // I don't know why, but someone could use attributes on script tag
    let sizeOfStartTag = this._findCloseTag(text, start);
    let end = text.indexOf("</script>");
    let parsed = text.substring(sizeOfStartTag, end);
    //                    .replace(/(define\()\s*(\[.*)/, "$1\"parsedScript" + name + "\", $2");
    //console.log(parsed);
    return parsed;
  }

  /**
   * parse template
   * inpire by require-vuejs
   * @link https://github.com/edgardleal/require-vuejs
   */
  public extractTemplate(): string {
    let text = this._source;
    let start = text.indexOf("<template>");
    let end = text.lastIndexOf("</template>");
    let parsed = text.substring(start + 10, end);
    //console.log(parsed);
    return parsed;
  }

  /**
   * parse css
   * inpire by require-vuejs
   * @link https://github.com/edgardleal/require-vuejs
   */
  public extractCss(): string {
    let text = this._source;
    let start = text.indexOf("<style"); // I don't know why, but someone could use attributes on script tag
    let sizeOfStartTag = this._findCloseTag(text, start);
    let end = text.indexOf("</style>");

    if (sizeOfStartTag === -1) {
      return "";
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
  public appendCSSStyle(css: string): void {
    if (css && typeof document !== "undefined") {
      var style = document.createElement("style");
      var head =
        document.head ||
        document.querySelector("head") ||
        document.getElementsByTagName("head")[0];

      style.appendChild(document.createTextNode(css));

      //console.log(css);
      head.appendChild(style);
    }
  }

  private _findCloseTag(text: string, start: number) {
    let i = start;
    while (i < text.length && text[i++] !== ">");
    return i;
  }
}

