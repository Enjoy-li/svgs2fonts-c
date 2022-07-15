/**
 * config file
 */

const _emptyFunc = () => "";

module.exports = {
  svg2font: {}, //传入SVGIcons2SVGFont的参数集
  fontName: "iconfont", //生成的字体文件名
  baseFontColor: "initial", //字体基础色
  iconBaseClass: "u-iconfont", //字体基础class选择器名
  timeout: 60000, //
  unicodeStart: 10000, //
  src: "svg", //入口路径
  dist: "dist", //出口路径
  demoUnicodeHTML: "demo_unicode.html", //
  demoFontClassHTML: "demo_fontclass.html", //
  logger: {
    log: _emptyFunc,
    error: _emptyFunc,
    info: _emptyFunc,
    warn: _emptyFunc,
    time: _emptyFunc,
    timeEnd: _emptyFunc,
  },
};
