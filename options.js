/**
 * config file
 */

const _emptyFunc = () => "";

module.exports = {
  svg2font: {},
  fontName: "iconfont",
  baseFontColor: "#000",
  iconBaseClass: "u-iconfont",
  timeout: 60000,
  unicodeStart: 10000,
  src: "svg",
  dist: "dist",
  demoUnicodeHTML: "demo_unicode.html",
  demoFontClassHTML: "demo_fontclass.html",
  logger: {
    log: _emptyFunc,
    error: _emptyFunc,
    info: _emptyFunc,
    warn: _emptyFunc,
    time: _emptyFunc,
    timeEnd: _emptyFunc,
  },
};
