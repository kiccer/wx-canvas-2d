const fs = require('fs')
const chalk = require('chalk')
const { table } = require('table')

const struct = {
    title: chalk`{bold.cyan 欢迎使用 {yellow wx-canvas-2d} 绘图工具 }`,
    content: [
        chalk`{cyan 项目地址：{underline https://github.com/kiccer/wx-canvas-2d}}`,
        chalk`{cyan 文档地址：{underline https://kiccer.github.io/wx-canvas-2d/}}`
    ],
    bottom: chalk`{cyan 好用不要忘了给个 {yellow.bold Star} 哦~}`
}

const data = [
    { text: [''] },
    { text: [struct.title], hideLine: true },
    { text: [''], hideLine: true },
    { text: [''] },
    ...struct.content.map(n => ({
        text: [n],
        hideLine: true
    })),
    { text: [''], hideLine: true },
    { text: [struct.bottom] }
]

const border = `
╔═╤╗
│ ││
├─┼┤
╚═╧╝
`.split('\n').filter(n => n)

// console.log(border)

const config = {
    border: {
        topBody: border[0][1],
        topJoin: border[0][2],
        topLeft: border[0][0],
        topRight: border[0][3],

        bottomBody: border[3][1],
        bottomJoin: border[3][2],
        bottomLeft: border[3][0],
        bottomRight: border[3][3],

        bodyLeft: border[1][0],
        bodyRight: border[1][3],
        bodyJoin: border[1][2],

        joinBody: border[2][1],
        joinLeft: border[2][0],
        joinRight: border[2][3],
        joinJoin: border[2][2]
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

console.log(logInfo)

fs.writeFileSync('./postinstall.js', `console.log(\`${logInfo}\`)\n`, 'utf-8')
