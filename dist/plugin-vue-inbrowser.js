exports.translate = (function () {
    return function (load) {
        var compiler = new Compiler(load);
        var compiled = compiler.compile();
        load.source = compiled;
        return load.source;
    };
})();
var Compiler = /** @class */ (function () {
    function Compiler(load) {
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
    Compiler.prototype.compile = function () {
        var templateString = "template:  `" + this._template + "`, ";
        var match = this._script.match(/(name(.*):|data(.*){|methods(.*):|computed(.*):)/im);
        var compiled = this._script.substr(0, match.index) +
            templateString +
            this._script.substr(match.index);
        //      console.log(this.style);
        this.appendCSSStyle(this._style);
        return compiled;
    };
    /**
     * parse script
     * inpire by require-vuejs
     * @link https://github.com/edgardleal/require-vuejs
     */
    Compiler.prototype.extractScript = function () {
        var text = this._source;
        var start = text.indexOf("<script"); // I don't know why, but someone could use attributes on script tag
        var sizeOfStartTag = this._findCloseTag(text, start);
        var end = text.indexOf("</script>");
        var parsed = text.substring(sizeOfStartTag, end);
        //                    .replace(/(define\()\s*(\[.*)/, "$1\"parsedScript" + name + "\", $2");
        //console.log(parsed);
        return parsed;
    };
    /**
     * parse template
     * inpire by require-vuejs
     * @link https://github.com/edgardleal/require-vuejs
     */
    Compiler.prototype.extractTemplate = function () {
        var text = this._source;
        var start = text.indexOf("<template>");
        var end = text.lastIndexOf("</template>");
        var parsed = text.substring(start + 10, end);
        //console.log(parsed);
        return parsed;
    };
    /**
     * parse css
     * inpire by require-vuejs
     * @link https://github.com/edgardleal/require-vuejs
     */
    Compiler.prototype.extractCss = function () {
        var text = this._source;
        var start = text.indexOf("<style"); // I don't know why, but someone could use attributes on script tag
        var sizeOfStartTag = this._findCloseTag(text, start);
        var end = text.indexOf("</style>");
        if (sizeOfStartTag === -1) {
            return "";
        }
        else {
            return text
                .substring(sizeOfStartTag, end)
                .replace(/[\n\r]+/g, "")
                .replace(/ {2,20}/g, " ");
        }
    };
    /**
     * append into head
     * inpire by require-vuejs
     * @link https://github.com/edgardleal/require-vuejs
     */
    Compiler.prototype.appendCSSStyle = function (css) {
        if (css && typeof document !== "undefined") {
            var style = document.createElement("style");
            var head = document.head ||
                document.querySelector("head") ||
                document.getElementsByTagName("head")[0];
            style.appendChild(document.createTextNode(css));
            //console.log(css);
            head.appendChild(style);
        }
    };
    Compiler.prototype._findCloseTag = function (text, start) {
        var i = start;
        while (i < text.length && text[i++] !== ">")
            ;
        return i;
    };
    return Compiler;
}());
