/**
 * constant
 */

module.exports = {
  timeTag: 'svgs2fonts time-consuming',
  fontNameReg: /\{\{fontName\}\}/g,
  demoCssReg: /\{\{demoCss\}\}/,
  demoHtmlReg: /\{\{demoHtml\}\}/,
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
  html, body {
    width: 100%;
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
  
  @-webkit-keyframes colors {
    from {
      font-size: 26px;
      color: red;
    }
    25% {
      color: yellow;
    }
    50% {
      font-size: 66px;
      color: green;
    } 
    75% {
      color: blue;
    }
    to {
      font-size: 26px;
      color: red;
    }
  }
  @keyframes colors {
    from {
      font-size: 26px;
      color: red;
    }
    25% {
      color: yellow;
    }
    50% {
      font-size: 66px;
      color: green;
    } 
    75% {
      color: blue;
    }
    to {
      font-size: 26px;
      color: red;
    }
  }
  </style>
  <style type="text/css">
  {{demoCss}}
  </style>
  <title>iconfont demo</title>
</head>
<body>
  <style type="text/css">
  .u-iconfont{
    font-size: 26px;
  }
  </style>

  <h1>iconfont</h1>
  <ul>
  <!-- <em class="u-iconfont">&#xE002;</em> -->
  {{demoHtml}}
  </li>

</body>
</html>
  `,
};