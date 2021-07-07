module.exports = {
    name: 'Arc',

    handler (config = {}) {
        return new Promise((resolve, reject) => {
            const {
                x = 0,
                y = 0,
                r = 0,
                start = 0,
                end = 0,
                reverse = false,
                lineStyle
            } = config

            // 设置线段样式
            this.setLineStyle(lineStyle)

            // 绘制线段
            this.ctx.beginPath()
            this.ctx.arc(
                this.xDpr(x),
                this.xDpr(y),
                this.xDpr(r),
                start,
                end,
                reverse
            )
            this.ctx.stroke()
            resolve()
        })
    }
}
