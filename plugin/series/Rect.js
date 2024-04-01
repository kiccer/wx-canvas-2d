module.exports = {
    name: 'Rect',

    handler (config = {}) {
        return new Promise((resolve, reject) => {
            let {
                x = 0,
                y = 0,
                width = 0,
                height = 0,
                // color = '',
                bgColor = '',
                radius = 0,
                lineStyle = {}
                // blur = 0
            } = config

            // 防止 radius 设置过大
            radius = Math.min(radius, Math.min(width, height) / 2)

            // 设置线段样式
            this.setLineStyle(lineStyle)
            // 设置填充色
            this.ctx.fillStyle = bgColor

            this.drawRectPath({
                x: x,
                y: y,
                width: width,
                height: height,
                radius: radius
            })

            if (lineStyle.color) {
                this.ctx.stroke()
            }

            if (bgColor) {
                this.ctx.fill()
            }

            resolve()
        })
    }
}
