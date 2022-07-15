/**
 * svgs2fonts
 * @author Micheal Wayne
 * @build time: 2018.07.30
 * @version 1.0.5
 * @email michealwayne@163.com
 */
const fs = require("fs");
const Fsfuncs = require("./fsfuncs");
const { join, extname, basename } = require("path");
const SVGIcons2SVGFont = require("svgicons2svgfont");
const svg2ttf = require("svg2ttf");
const ttf2woff = require("ttf2woff");
const ttf2woff2 = require("ttf2woff2");
const ttf2eot = require("ttf2eot");
const { setIconFile } = require("./fsfuncs");
const { isString } = require("./utils");
const {
  fontNameReg,
  demoCssReg,
  demoHtmlReg,
  DEMO_CSS,
  DEMO_HTML,
  iconBaseClassReg,
  baseFontColorReg,
} = require("../constant");
const OPTIONS = require("../options"); // config
let number = OPTIONS.unicodeStart; // 编码值起点，避免覆盖，随意
const { demoUnicodeHTML, demoFontClassHTML } = OPTIONS;
const UnicodeObj = {}; // demo html中unicode的值

/**
 * @function getIconUnicode
 * @param {String} name
 * @return {Array} unicode array
 */
function getIconUnicode(name) {
  if (!name) {
    return false;
  }

  let _num = 1;
  for (let i = 0, len = name.length; i < len; i++) {
    _num *= name.charCodeAt(i);
  }

  while (_num > 59999) {
    _num = _num / 10;
  }
  if (_num < number) _num += number;
  _num = parseInt(_num, 10);

  UnicodeObj[name] = `&#${_num};`;
  return [String.fromCharCode(+_num)];
}

/**
 * @function filterSvgFiles
 * @param {String} svgFolderPath svg folder path.
 * @return {Array} svgs paths.
 */

function filterSvgFilesComtent(svgFolderPath, svgArr, iconPre) {
  const files = fs.readdirSync(svgFolderPath, "utf-8");
  if (!files) {
    throw new Error(`Error! Svg folder is empty.${svgFolderPath}`);
  }
  files.forEach((file) => {
    if (isString(file) && extname(file) === ".svg" && !svgArr.includes(file)) {
      svgArr.push({ url: join(svgFolderPath, file), iconPre });
    } else if (
      isString(file) &&
      extname(file) === "" &&
      !svgArr.includes(file)
    ) {
      filterSvgFilesComtent(join(svgFolderPath, file), svgArr, iconPre + file);
    }
  });
}
function filterSvgFiles(svgFolderPath) {
  const svgArr = [];
  let iconPre = "";
  filterSvgFilesComtent(svgFolderPath, svgArr, iconPre);
  return svgArr;
}

/**
 * task builder
 */
const Builder = {
  files: null,
  UnicodeObj: null,

  /**
   * build svg font
   * @param {Function} cb callback function.
   */
  svg: () => {
    /**
     * 驼峰转分隔符
     * @param {String} name svg path.
     */
    function toLine(name) {
      return name.replace(/([A-Z])/g, "-$1").toLowerCase();
    }
    /**
     * write font stream
     * @param {String} svgPath svg path.
     */
    function writeFontStream(fontStream, svgPath, iconPre) {
      const _svgName = basename(svgPath).split(".")[0];

      const glyph = fs.createReadStream(svgPath);
      let iconName = toLine(`${iconPre}${iconPre && "-"}${_svgName}`);
      glyph.metadata = {
        unicode: getIconUnicode(iconName),
        name: iconName,
      };

      fontStream.write(glyph);
    }

    // Setting the font destination
    const DIST_PATH = join(OPTIONS.dist, `${OPTIONS.fontName}.svg`);
    OPTIONS.logger.log(`[running]start write ${DIST_PATH}`);
    return new Promise((resolve, reject) => {
      // init
      const fontStream = new SVGIcons2SVGFont({
        fontHeight: 1001,
        normalize: true,
        center: true,
        fontName: OPTIONS.fontName,
        ...OPTIONS.svg2font,
      });
      fontStream
        .pipe(fs.createWriteStream(DIST_PATH))
        .on("finish", function () {
          OPTIONS.logger.log(
            `[success]SvgFont successfully created!(${DIST_PATH})`
          );

          Builder.UnicodeObj = UnicodeObj;
          resolve(true);
        })
        .on("error", (err) => {
          OPTIONS.logger.error(err);
          reject(false);
        });

      this.svgArr.forEach((svg) => {
        if (isString(svg.url)) {
          writeFontStream(fontStream, svg.url, svg.iconPre);
        }
      });

      // Do not forget to end the stream
      fontStream.end();
    });
  },

  /**
   * build ttf font
   * @param {Function} cb callback function.
   */
  ttf: () => {
    const DIST_PATH = join(OPTIONS.dist, `${OPTIONS.fontName}.ttf`); // 输出地址

    let ttf = svg2ttf(
      fs.readFileSync(join(OPTIONS.dist, `${OPTIONS.fontName}.svg`), "utf8"),
      {}
    );
    ttf = this.ttf = Buffer.from(ttf.buffer);
    return setIconFile(DIST_PATH, ttf, "ttf", OPTIONS.debug);
  },

  /**
   * build eot font
   * @param {Function} cb callback function.
   */
  eot: () => {
    const DIST_PATH = join(OPTIONS.dist, `${OPTIONS.fontName}.eot`); // 输出地址

    const eot = Buffer.from(ttf2eot(this.ttf).buffer);
    return setIconFile(DIST_PATH, eot, "eot", OPTIONS.debug);
  },

  /**
   * build woff font
   * @param {Function} cb callback function.
   */
  woff: () => {
    const DIST_PATH = join(OPTIONS.dist, `${OPTIONS.fontName}.woff`); // 输出地址

    const woff = Buffer.from(ttf2woff(this.ttf).buffer);
    return setIconFile(DIST_PATH, woff, "woff", OPTIONS.debug);
  },

  /**
   * build woff2 font
   * @param {Function} cb callback function.
   */
  woff2: () => {
    const DIST_PATH = join(OPTIONS.dist, `${OPTIONS.fontName}.woff2`); // 输出地址

    const woff2 = Buffer.from(ttf2woff2(this.ttf).buffer);
    return setIconFile(DIST_PATH, woff2, "woff2", OPTIONS.debug);
  },

  /**
   * build demo html
   */
  demo: () => {
    let _codeHtml = "";
    let _classHtml = "";
    let _classCss = "";

    const { UnicodeObj } = Builder;
    const { fontName, dist, iconBaseClass } = OPTIONS;
    for (const i in UnicodeObj) {
      if (!UnicodeObj.hasOwnProperty(i)) {
        continue;
      }
      const _code = UnicodeObj[i];
      const _num = Number(_code.replace("&#", "").replace(";", "")).toString(
        16
      );

      if (!isString(_code)) continue;
      _codeHtml += `<li><i class="${iconBaseClass}">${_code}</i><p>${i}：<br/> ${_code.replace(
        "&",
        "&amp;"
      )}</p></li>`;
      _classHtml += `<li><i class="${iconBaseClass} icon-${i}"></i><p>${iconBaseClass} <br/> icon-<b>${i}</b></p></li>`;
      _classCss += `\r\n.icon-${i}:before { content: "\\${_num}"; }`;
    }

    const _CSS = DEMO_CSS.replace(fontNameReg, fontName)
      .replaceAll(iconBaseClassReg, iconBaseClass)
      .replace(baseFontColorReg, OPTIONS.baseFontColor);
    const _HTML = DEMO_HTML.replace(fontNameReg, fontName).replaceAll(
      iconBaseClassReg,
      iconBaseClass
    );
    const CODE_HTML = _HTML
      .replace(demoCssReg, _CSS)
      .replace(demoHtmlReg, _codeHtml);
    const CLASS_HTML = _HTML
      .replace(demoCssReg, _CSS + _classCss)
      .replace(demoHtmlReg, _classHtml);

    return Promise.all([
      Fsfuncs.writeFile(join(dist, demoUnicodeHTML), CODE_HTML, true),
      Fsfuncs.writeFile(join(dist, demoFontClassHTML), CLASS_HTML, true),
      Fsfuncs.writeFile(
        join(dist, `${OPTIONS.fontName}.css`),
        _CSS + _classCss,
        true
      ),
    ]).then(() =>
      OPTIONS.logger.log(
        `[success] ${demoUnicodeHTML}, ${demoFontClassHTML} successfully created!`
      )
    );
  },

  /**
   * init
   * @param {Object} options set options
   */
  init: (options) => {
    Object.assign(OPTIONS, options);
    if (options.startNumber) number = parseInt(options.startNumber, 10);
    this.svgArr = filterSvgFiles(OPTIONS.src);
  },
};

module.exports = Builder;
