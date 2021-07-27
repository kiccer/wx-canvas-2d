const fs = require('fs')
const chalk = require('chalk')

const logInfo = chalk`{green
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║             {bold.cyan 欢迎使用 {yellow wx-canvas-2d} 绘图工具 }              ║
    ║                                                          ║
    ╠══════════════════════════════════════════════════════════╣
    ║                                                          ║
    ║  {cyan 项目地址：{underline https://github.com/kiccer/wx-canvas-2d}}        ║
    ║  {cyan 文档地址：{underline https://kiccer.github.io/wx-canvas-2d/}}        ║
    ║                                                          ║
    ║┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈║
    ║                {cyan 好用不要忘了给个 {yellow.bold Star} 哦~}                 ║
    ╚══════════════════════════════════════════════════════════╝
}`

console.log(logInfo)

fs.writeFileSync('./postinstall.js', `console.log(\`${logInfo}\`)\n`, 'utf-8')
