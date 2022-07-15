# svgs2fonts-c

在`svgs2fonts`依赖基础上增加了生成相应的css文件，便于引入,同时增加了参数，优化结果生成。svg icons to icons fonts(svg,ttf,eot,woff,woff2)
修改的文件：lib\Builder.js   &  \constant.js
增加svg图片目录下的遍历目录的，并增加icon对应的前缀

## svgs2fonts

svg 图标转字体图标库（svgs fonts -> svg,ttf,eot,woff,woff2）。
[github（中文）](https://github.com/MichealWayne/svgs2fonts)

## Version

1.0.6

## Install

### 1.global install

```sh
npm i -g svgs2fonts
```

#### check

```sh
svgs2fonts -v
```

### 2.module install

```sh
npm i --save svgs2fonts
```

## Usage

### 1. module import

```js
const svgs2fonts = require("svgs2fonts");
svgs2fonts.init(options);
```

`options`: 
**请参考：** 根目录下，options.js文件

- src: `{String}`, svg file dirname;
- dir: `{String}`, output files path;
- fontName: `{String}`, output icon/font name. Default:`"iconfont"`;
- startNumber: `{Number}`, unicode start number. Default: `10000`；
- noDemo: `{Boolean}`, whether to create demo HTML. Default: `false`;
- debug: `{Boolean}`, whether to open debug model. Default: `false`;
- timeout: `{Number}`, run timeout. Default: 60s（`60000`）

##### demo

```js
const svgs2fonts = require("svgs2fonts");
const join = require("path").join;

svgs2fonts
  .init({
    src: __dirname, // svg path
    dist: join(__dirname, "dest"), // output path
    fontName: "myIconfont", // font name
    startNumber: 20000, // unicode start number
    noDemo: true, // no demo html files
    debug: true, // open debug
  })
  .then(() => console.log("task success!"))
  .catch((err) => console.log(`task failed(${err})`));
```

### 2.cmd

```sh
svgs2fonts {{srcpath}} {{distpath}} {{options}}
```

- srcpath: svg file dirname, "" -> now dirname path;
- distpath: output files path;
- options: configurations.

##### example

```sh
svgs2fonts svg dist
```

`options`:

#### `-n` / `--name`

font icon's name(default: iconfont).

##### example

```sh
svgs2fonts svg dist -n myiconfont
```

#### `--number`

unicode start number(default: 10000).

##### example

```sh
svgs2fonts svg dist --number 50000
```

#### `--nodemo`

no demo html.

##### example

```sh
svgs2fonts svg dist --nodemo
```

#### `--debug`

whether to open debug model(default: `false`).

##### example

```sh
svgs2fonts svg dist --debug
```

## Author

[Micheal Wayne](mailto:michealwayne@163.com)

## Update list

- 1.0.6: fix IE8 bug;
- first version: 2018.08.26
