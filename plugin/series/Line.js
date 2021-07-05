export default {
    name: 'line',

    handler (config = {}) {
        return new Promise((resolve, reject) => {
            const {
                lineStyle,
                line = []
            } = config

            // 设置线段样式
            this.setLineStyle(lineStyle)

            // 绘制线段
            line.forEach((n, i) => {
                if (!i) {
                    this.ctx.beginPath()
                    this.ctx.moveTo(...n.point.map(n => this.xDpr(n)))
                } else {
                    this.ctx.lineTo(...n.point.map(n => this.xDpr(n)))
                    this.ctx.stroke()
                }
            })

            resolve()
        })
    }
}
