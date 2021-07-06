import { api } from '../modules/qrcode.min.js'

module.exports = {
    name: 'qrcode',

    handler (config = {}) {
        const {
            url = '',
            x = 0,
            y = 0,
            width = 0,
            height = 0,
            color = '#000',
            bgColor = '#fff',
            ecc = null
        } = config

        return new Promise((resolve, reject) => {
            api.draw(
                url,
                this.ctx,
                this.xDpr(x),
                this.xDpr(y),
                this.xDpr(width),
                this.xDpr(height),
                bgColor,
                color,
                this.component,
                ecc
            )
            resolve()
        })
    }
}
