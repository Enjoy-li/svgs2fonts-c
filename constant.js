/**
 * constant
 */

module.exports = {
  timeTag: "svgs2fonts time-consuming",
  fontNameReg: /\{\{fontName\}\}/g,
  demoCssReg: /\{\{demoCss\}\}/,
  demoHtmlReg: /\{\{demoHtml\}\}/,
  iconBaseClass: "u-iconfont",
  DEMO_CSS: `
@font-face {
  font-family: '{{fontName}}';
  src: url('{{fontName}}.eot');
  src: url('{{fontName}}.woff2') format('woff2'),
    url('{{fontName}}.woff') format('woff'),
    url('{{fontName}}.eot#IEfix') format('embedded-opentype'), /* IE6-IE8 */  
    url('{{fontName}}.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('{{fontName}}.svg') format('svg');
}
  .u-iconfont{
    font-family: "{{fontName}}" !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-style: normal;
    display: inline-block;
    width:90px;
    height: 90px;
    line-height: 90px;
  }
  `,
  DEMO_HTML: `
<!DOCTYPE html>
<html>
<head>
  <!-- include header -->
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="apple-touch-fullscreen" content="YES" />
  <style type="text/css">
  * {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    text-align: center;
    width: 150px;
    min-height: 150px;
  }
  ul {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
    .u-iconfont{
    font-size:40px;
    cursor: pointer;
    transition:font-size 0.3s linear;
  }
   .u-iconfont:hover{
    font-size: 80px;
  }
  </style>
  <style type="text/css">
  {{demoCss}}
  </style>
  <title>iconfont demo</title>
</head>
<body>
  <div style="display:flex;align-items:baseline;"><h1>fontClass用法：</h1><xmp><i class='u-iconfont icon-</xmp><b>xxxx</b><xmp>'></i></xmp></div>
  <div style="display:flex;align-items:baseline;"><h1>unicode用法：</h1><xmp><i class='u-iconfont'>&#35811;</i></xmp></div>
  <ul>
  <!-- <i class="u-iconfont">&#xE002;</i> -->
  {{demoHtml}}
  </li>
</body>
</html>
  `,
};
