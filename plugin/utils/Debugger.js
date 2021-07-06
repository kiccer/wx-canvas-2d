const SYS_INFO = wx.getSystemInfoSync()

module.exports = {
    name: 'debugLogout',

    handler (msg, type = 'info') {
        if (!msg) return

        const log = function (style1, style2) {
            console.log(`%cWxCanvas2d%c${msg}`, `
                color: ${style1.color};
                background-color: ${style1.bgColor};
                padding: 1px 4px;
                border-radius: 4px 0 0 4px;
            `, `
                color: ${style2.color};
                background-color: ${style2.bgColor};
                padding: 1px 4px;
                border-radius: 0 4px 4px 0;
            `)
        }

        if (SYS_INFO.brand === 'devtools') {
            if (type === 'info') {
                log({
                    color: '#004B1C',
                    bgColor: '#2BDC70'
                }, {
                    color: '#084BBC',
                    bgColor: '#81A9F0'
                })
            } else if (type === 'error') {
                log({
                    color: '#006727',
                    bgColor: '#2BDC70'
                }, {
                    color: '#D82E2E',
                    bgColor: '#FFB2B2'
                })
            } else {
                console.log(`WxCanvas2d: ${msg}`)
            }
        } else {
            console.debug(`WxCanvas2d: ${msg}`)
        }
    }
}
