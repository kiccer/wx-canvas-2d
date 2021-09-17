module.exports = {
    name: 'Text',

    handler (config = {}) {
        return new Promise((resolve, reject) => {
            const {
                x = 0,
                y = 0,
                color = '#000',
                fontSize = 12,
                fontWeight = '',
                width = Infinity,
                baseline = 'top', // top | hanging | middle | alphabetic | ideographic | bottom
                align = 'left', // left | right | center | start | end
                text = '',
                ellipsis = 0,
                lineHeight = config.fontSize || 12
            } = config

            let index = 0 // 行数下标
            let splitStr = [] // 拆分后的文本数组

            this.ctx.textAlign = align
            this.ctx.textBaseline = baseline
            this.ctx.fillStyle = color
            this.ctx.font = `${fontWeight} ${this.xDpr(fontSize)}px ${this.fontFamily}`

            // 拆分文本
            ;[].concat(text).forEach((n, i) => {
                let start = 0 // 截取的起始下标

                String(n).split('').forEach((m, j) => {
                    const str = String(n).slice(start, j + 1)

                    if (this.ctx.measureText(str).width < this.xDpr(width)) {
                        splitStr[index] = str
                    } else {
                        splitStr[index + 1] = m // 显示不下多出来的那个字存到下一行
                        start = j
                        index++
                    }
                })

                index++
            })

            // 最大显示行，超出显示省略号
            if (ellipsis && splitStr.length > ellipsis) {
                splitStr = splitStr.slice(0, ellipsis)
                splitStr[ellipsis - 1] = splitStr[ellipsis - 1].slice(0, -1) + '...'
            }

            // 循环绘制文本
            splitStr.forEach((n, i) => {
                this.ctx.fillText(
                    n,
                    this.xDpr({
                        left: x,
                        start: x,
                        right: x + width,
                        end: x + width,
                        center: x + width / 2
                    }[align] || x),
                    this.xDpr(y + lineHeight * i + (lineHeight - fontSize) / 2)
                )
            })

            resolve()
        })
    }
}
