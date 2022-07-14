const svgs2fonts = require("../index.js");
const join = require("path").join;
svgs2fonts.init({
  src: join(__dirname, "./svgs/"), // svg path
  dist: join(__dirname, "./fonts/"), // output path
  fontName: "svgs-to-fonts", // font name
  startNumber: 20000, // unicode start number
  nodemo: true, // no demo html files
  fontHeight: 1001,
  svg2font: {},
});

/**
 * The provided icons do not have the same heights. This could lead to unexpected results. Using the normalize option may help.
 * A fontHeight of at least than 1000 is recommended, otherwise further steps (rounding in svg2ttf) could lead to ugly results. Use the fontHeight option to scale icons.
 * Font created
 * 需要在依赖包里 node_modules\svgs2fonts\lib\Builder.js里增加配置fontHeight&normalize👇
 * 
 *  const fontStream = new SVGIcons2SVGFont({
        fontName: OPTIONS.fontName,
        fontHeight:1001,
        normalize:true
      });
 * 
 * 
 */
