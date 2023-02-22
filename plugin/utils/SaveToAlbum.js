// 小程序获取权限
const getAuth = function (name) {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success (res) {
                const callback = code => ({ settings: res, code })

                if (res.authSetting['scope.' + name] !== undefined && res.authSetting['scope.' + name] !== true) {
                    // 用户主动取消过
                    resolve(callback(1))
                } else if (res.authSetting['scope.' + name] === undefined) {
                    // 第一次向用户获取
                    resolve(callback(2))
                } else {
                    // 用户已授权
                    resolve(callback(3))
                }
            },
            fail (err) {
                reject(err)
            }
        })
    })
}

// 保存图片到相册
const saveImageToPhotosAlbum = function (tempFilePath) {
    return new Promise((resolve, reject) => {
        wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: res => {
                resolve()
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

module.exports = {
    name: 'save',

    handler (opts) {
        return new Promise((resolve, reject) => {
            const _opts = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                destWidth: 0,
                destHeight: 0,
                modalOption: {},
                ...opts
            }

            wx.canvasToTempFilePath({
                x: _opts.x,
                y: _opts.y,
                width: _opts.width,
                height: _opts.height,
                destWidth: this.xDpr(_opts.destWidth),
                destHeight: this.xDpr(_opts.destHeight),
                canvas: this.canvas,
                success: res => {
                    const tempFilePath = res.tempFilePath

                    getAuth('writePhotosAlbum').then(res => {
                        if (res.code === 1) {
                            wx.showModal({
                                title: _opts.modalOption.title || '获取权限',
                                content: _opts.modalOption.content || '请前往开启相册权限',
                                success: _opts.modalOption.success || (res => {
                                    if (res.confirm) {
                                        wx.openSetting()
                                        this.debugLogout('用户前往授权页', 'error')
                                        reject(Error('用户前往授权页'))
                                    } else if (res.cancel) {
                                        this.debugLogout('用户拒绝授权', 'error')
                                        reject(Error('用户拒绝授权'))
                                    }
                                })
                            })
                        } else if ([2, 3].includes(res.code)) {
                            saveImageToPhotosAlbum(tempFilePath).then(res => {
                                this.debugLogout('保存图片到相册成功')
                                resolve({ tempFilePath })
                            }).catch(() => {
                                this.debugLogout('保存图片到相册失败', 'error')
                                reject(Error('保存图片到相册失败'))
                            })
                        }
                    }).catch(() => {
                        this.debugLogout('获取设置信息失败', 'error')
                        reject(Error('获取设置信息失败'))
                    })
                },
                fail: () => {
                    this.debugLogout('生成图片失败', 'error')
                    reject(Error('生成图片失败'))
                }
            })
        })
    }
}
