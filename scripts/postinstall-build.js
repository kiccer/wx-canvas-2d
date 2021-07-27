const fs = require('fs')
const chalk = require('chalk')
const { table } = require('table')

const data = [
    {
        text: ['']
    },
    {
        text: [chalk`{bold.cyan 欢迎使用 {yellow wx-canvas-2d} 绘图工具 }`],
        hideLine: true
    },
    {
        text: [''],
        hideLine: true
    },
    {
        text: ['']
    },
    {
        text: [chalk`{cyan 项目地址：{underline https://github.com/kiccer/wx-canvas-2d}}`],
        hideLine: true
    },
    {
        text: [chalk`{cyan 文档地址：{underline https://kiccer.github.io/wx-canvas-2d/}}`],
        hideLine: true
    },
    {
        text: [''],
        hideLine: true
    },
    {
        text: [chalk`{cyan 好用不要忘了给个 {yellow.bold Star} 哦~}`]
    }
]

const config = {
    border: {
        topBody: '═',
        topJoin: '╤',
        topLeft: '╔',
        topRight: '╗',

        bottomBody: '═',
        bottomJoin: '╧',
        bottomLeft: '╚',
        bottomRight: '╝',

        bodyLeft: '│',
        bodyRight: '│',
        bodyJoin: '│',

        joinBody: '─',
        joinLeft: '├',
        joinRight: '┤',
        joinJoin: '┼'
    },
    columns: [
        {
            alignment: 'center',
            width: 70
        }
    ],
    drawHorizontalLine: (lineIndex, rowCount) => {
        return !(data[lineIndex] || {}).hideLine
    }
}

const logInfo = chalk`{green
${table(data.map(n => n.text), config)}
}`

// const logInfo = chalk`{green
//     ╔══════════════════════════════════════════════════════════╗
//     ║                                                          ║
//     ║             {bold.cyan 欢迎使用 {yellow wx-canvas-2d} 绘图工具 }              ║
//     ║                                                          ║
//     ╠══════════════════════════════════════════════════════════╣
//     ║                                                          ║
//     ║  {cyan 项目地址：{underline https://github.com/kiccer/wx-canvas-2d}}        ║
//     ║  {cyan 文档地址：{underline https://kiccer.github.io/wx-canvas-2d/}}        ║
//     ║                                                          ║
//     ║┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈║
//     ║                {cyan 好用不要忘了给个 {yellow.bold Star} 哦~}                 ║
//     ╚══════════════════════════════════════════════════════════╝
// }`

// console.log(logInfo.replace(/\x1b\[\d+m/g, ''))

console.log(logInfo)

fs.writeFileSync('./postinstall.js', `console.log(\`${logInfo}\`)\n`, 'utf-8')
