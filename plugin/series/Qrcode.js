import { api } from '../modules/qrcode.min.js'

module.exports = {
    name: 'Qrcode',

    handler (config = {}) {
        const {
            text = '',
            x = 0,
            y = 0,
            size = 0,
            color = '#000',
            bgColor = '#fff',
            ecc = 2
        } = config

        return new Promise((resolve, reject) => {
            api.draw(
                text,
                this.ctx,
                this.xDpr(x),
                this.xDpr(y),
                this.xDpr(size), // width
                this.xDpr(size), // height
                bgColor,
                color,
                this.component,
                ecc
            )
            resolve()
        })
    }
}
