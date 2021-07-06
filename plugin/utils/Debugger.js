const SYS_INFO = wx.getSystemInfoSync()

module.exports = {
    name: 'debugLogout',

    handler (msg, type = 'info') {
        if (!msg) return

        const log = function (color) {
            console.log(`%cWxCanvas2d%c${msg}`, `
                color: rgba(0, 0, 0, .8);
                background-color: #A6F27D;
                padding: 1px 4px;
                border-radius: 4px 0 0 4px;
            `, `
                color: rgba(0, 0, 0, .5);
                background-color: ${color};
                padding: 1px 4px;
                border-radius: 0 4px 4px 0;
            `)
        }

        if (SYS_INFO.brand === 'devtools') {
            log({
                info: '#61CFFF',
                warn: '#FFD56C',
                error: '#FF8080',
                success: '#A6F27D'
            }[type] || '#909399')
        } else {
            console.debug(`WxCanvas2d: ${msg}`)
        }
    }
}
