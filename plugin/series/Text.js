module.exports = {
    name: 'Text',

    handler (config = {}) {
        return new Promise((resolve, reject) => {
            const _opts = {
                // text: '',
                x: 0,
                y: 0,
                color: '#000',
                fontSize: 12,
                fontWeight: '',
                width: Infinity,
                baseline: 'top', // top | hanging | middle | alphabetic | ideographic | bottom
                align: 'left', // left | right | center | start | end
                ...config,
                text: String(config.text) || '',
                ellipsis: Math.max(+config.ellipsis, 0), // 最多显示行数，超出显示...
                lineHeight: config.lineHeight || config.fontSize || 12
            }

            let start = 0 // 截取的起始下标
            let index = 0 // 行数下标
            let splitStr = [] // 拆分后的文本数组

            this.ctx.textAlign = _opts.align
            this.ctx.textBaseline = _opts.baseline
            this.ctx.fillStyle = _opts.color
            this.ctx.font = `${_opts.fontWeight} ${this.xDpr(_opts.fontSize)}px ${this.fontFamily}`

            // 拆分文本
            _opts.text.split('').forEach((n, i) => {
                const str = _opts.text.slice(start, i + 1)
                if (this.ctx.measureText(str).width < this.xDpr(_opts.width)) {
                    splitStr[index] = str
                } else {
                    start = i
                    index++
                }
            })

            // 最大显示行，超出显示省略号
            if (_opts.ellipsis && splitStr.length > _opts.ellipsis) {
                splitStr = splitStr.slice(0, _opts.ellipsis)
                splitStr[_opts.ellipsis - 1] = splitStr[_opts.ellipsis - 1].slice(0, -1) + '...'
            }

            // 循环绘制文本
            splitStr.forEach((n, i) => {
                const x = {
                    left: _opts.x,
                    start: _opts.x,
                    right: _opts.x + _opts.width,
                    end: _opts.x + _opts.width,
                    center: _opts.x + _opts.width / 2
                }[_opts.align] || _opts.x
                const y = _opts.y + _opts.lineHeight * i + (_opts.lineHeight - _opts.fontSize) / 2

                this.ctx.fillText(
                    n,
                    this.xDpr(x),
                    this.xDpr(y)
                )
            })

            resolve()
        })
    }
}
