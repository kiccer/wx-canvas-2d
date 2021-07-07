import {
    canvasRGB as stackblurCanvasRGB
} from '../modules/stackblur-es.min.js'

module.exports = {
    name: 'Blur',

    handler (config = {}) {
        return new Promise((resolve, reject) => {
            const {
                x = 0,
                y = 0,
                width = 0,
                height = 0,
                blur = 0
            } = config

            stackblurCanvasRGB(
                this.canvas,
                this.xDpr(x),
                this.xDpr(y),
                this.xDpr(width),
                this.xDpr(height),
                blur
            )

            resolve()
        })
    }
}
