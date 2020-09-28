/**
 * WxCanvas2d
 *
 * Anthor: kiccer
 */

/* global wx */

class WxCanvas2d {
    constructor () {
        this.query = null // canvas 的查询条件
        this.bgColor = null // canvas 背景色
        this.radius = null // canvas 背景色
        this.component = null // 如果是在自定义组件中，需要获取到自定义组件的内部 this 变量 (即，传入 this)
        this.canvas = null // canvas 节点
        this.ctx = null // canvas 上下文
        this.dpr = null // 像素比
        this.fontFamily = 'sans-serif'
    }

    // 创建画布
    create (opts) {
        // console.log(opts)
        return new Promise((resolve, reject) => {
            const options = {
                query: '',
                rootWidth: 375,
                ...opts
            }

            if (!options.query) reject(new Error('[WxCanvas2d] \'query\' is empty.'))

            this.query = options.query
            this.bgColor = options.bgColor
            this.component = options.component
            this.radius = options.radius

            const query = this.component
                ? wx.createSelectorQuery().in(this.component)
                : wx.createSelectorQuery()

            query.select(this.query)
                .fields({ node: true, size: true })
                .exec(res => {
                    // console.log(res)
                    if (!res[0]) return false

                    const canvas = res[0].node
                    const ctx = canvas.getContext('2d')
                    const dpr = wx.getSystemInfoSync().pixelRatio

                    this.canvas = canvas
                    this.ctx = ctx
                    this.dpr = dpr
                    this.systemInfo = wx.getSystemInfoSync()
                    this.rootWidth = options.rootWidth

                    this.canvas.width = res[0].width * this.dpr
                    this.canvas.height = res[0].height * this.dpr
                    // this.ctx.scale(this.dpr, this.dpr)

                    resolve(this)
                })
        })
    }

    // 清空画布
    clear () {
        this.ctx.clearRect(0, 0, this.xDpr(this.canvas.width), this.xDpr(this.canvas.height))

        if (this.radius) {
            this.drawRectPath({
                x: 0,
                y: 0,
                width: this.canvas.width / this.systemInfo.screenWidth / this.dpr * this.rootWidth,
                height: this.canvas.height / this.systemInfo.screenWidth / this.dpr * this.rootWidth,
                radius: this.radius
            })

            this.ctx.clip()
        }

        if (this.bgColor) {
            this.ctx.fillStyle = this.bgColor
            this.ctx.fillRect(0, 0, this.xDpr(this.canvas.width), this.xDpr(this.canvas.height))
        }
    }

    // canvas 大小适配
    xDpr (val) {
        return val * this.dpr * this.systemInfo.screenWidth / this.rootWidth
    }

    // 绘制画布 (重设画布大小)
    draw (opts) {
        // console.log(opts)
        return new Promise((resolve, reject) => {
            const { series } = opts

            const query = this.component
                ? wx.createSelectorQuery().in(this.component)
                : wx.createSelectorQuery()

            query.select(this.query)
                .fields({ node: true, size: true })
                .exec(res => {
                    // console.log(res)
                    if (!res[0]) return false

                    // 重设画布大小
                    this.canvas.width = res[0].width * this.dpr
                    this.canvas.height = res[0].height * this.dpr
                    // this.ctx.scale(this.dpr, this.dpr)

                    this.clear() // 画之前先清空一次画布

                    // 根据 zIndex 排序 (从小到大，先画小的，这样越大的显示在越上方)
                    const _series = series
                        .map(n => ({ ...n, zIndex: n.zIndex || 0 }))
                        .sort((n, m) => n.zIndex - m.zIndex)

                    // 绘制方法映射表
                    const drawFunc = {
                        rect: (...opts) => this.drawRect(...opts),
                        image: (...opts) => this.drawImage(...opts),
                        text: (...opts) => this.drawText(...opts),
                        line: (...opts) => this.drawLine(...opts)
                    }

                    // 按顺序绘制图层方法
                    const next = (index = 0) => {
                        if (index < _series.length) {
                            const options = _series[index]
                            if (drawFunc[options.type]) {
                                this.styleClear() // 绘制新图层前，先还原一次样式设置
                                drawFunc[options.type](options).then(() => {
                                    next(++index)
                                }).catch(err => {
                                    reject(err) // 绘制失败抛错
                                })
                            } else {
                                console.warn(`[WxCanvas2d] Unknown type: '${options.type}'`)
                                next(++index)
                            }
                        } else {
                            resolve() // 所有图层绘制完毕
                        }
                    }

                    next() // 开始按顺序绘制图层
                })
        })
    }

    // 清空 (初始化) 样式
    styleClear () {
        this.ctx.setTextAlign = 'left'
        this.ctx.textBaseline = 'top'
        this.ctx.fillStyle = '#000'
        this.ctx.font = `${this.xDpr(12 * this.rootWidth / this.systemInfo.screenWidth)}px ${this.fontFamily}`
        this.ctx.lineCap = 'butt'
        this.ctx.setLineDash([1, 0])
        this.ctx.lineDashOffset = 0
        this.ctx.lineJoin = 'bevel'
        this.ctx.lineWidth = this.xDpr(1)
        this.ctx.strokeStyle = '#000'
    }

    // 绘制矩形
    drawRect (opts) {
        return new Promise((resolve, reject) => {
            const _opts = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                color: '',
                bgColor: '',
                radius: 0,
                ...opts
            }

            this.ctx.strokeStyle = _opts.color
            this.ctx.fillStyle = _opts.bgColor

            this.drawRectPath({
                x: _opts.x,
                y: _opts.y,
                width: _opts.width,
                height: _opts.height,
                radius: _opts.radius
            })

            if (_opts.color) {
                this.ctx.stroke()
            }

            if (_opts.bgColor) {
                this.ctx.fill()
            }

            resolve()
        })
    }

    // 绘制矩形路径
    drawRectPath (opts) {
        const _opts = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            radius: 0,
            ...opts
        }
        // console.log(_opts)

        const { x, y, width, height, radius } = _opts

        // 圆角起始/结束方向
        const angle = {
            top: Math.PI * 1.5,
            right: 0,
            bottom: Math.PI * 0.5,
            left: Math.PI
        }

        // 圆角方向
        const angleArr = [
            [angle.left, angle.top],
            [angle.top, angle.right],
            [angle.right, angle.bottom],
            [angle.bottom, angle.left]
        ]

        // 圆角中心点坐标
        const arcPos = [
            [x + radius, y + radius].map(n => this.xDpr(n)), // left top
            [x + width - radius, y + radius].map(n => this.xDpr(n)), // top right
            [x + width - radius, y + height - radius].map(n => this.xDpr(n)), // right bottom
            [x + radius, y + height - radius].map(n => this.xDpr(n)) // bottom left
        ]

        this.ctx.beginPath()

        Array(4).fill().forEach((n, i) => {
            this.ctx.arc(...arcPos[i], this.xDpr(radius), ...angleArr[i])
        })

        this.ctx.closePath()
    }

    // 绘制图片
    drawImage (opts) {
        // console.log(opts)
        const _opts = {
            url: '',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            mode: 'scaleToFill',
            ...opts
        }

        // scaleToFill: 缩放: 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
        // aspectFit: 缩放: 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
        // aspectFill: 缩放: 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
        // widthFix: 缩放: 宽度不变，高度自动变化，保持原图宽高比不变
        // top: 裁剪: 不缩放图片，只显示图片的顶部区域
        // bottom: 裁剪: 不缩放图片，只显示图片的底部区域
        // center: 裁剪: 不缩放图片，只显示图片的中间区域
        // left: 裁剪: 不缩放图片，只显示图片的左边区域
        // right: 裁剪: 不缩放图片，只显示图片的右边区域
        // top left: 裁剪: 不缩放图片，只显示图片的左上边区域
        // top right: 裁剪: 不缩放图片，只显示图片的右上边区域
        // bottom left: 裁剪: 不缩放图片，只显示图片的左下边区域

        return new Promise((resolve, reject) => {
            const { url, x, y, width, height, mode } = _opts
            const img = this.canvas.createImage()

            img.src = url
            img.onload = () => {
                wx.getImageInfo({
                    src: url,
                    success: res => {
                        // console.log(res)
                        const imgWidth = res.width
                        const imgHeight = res.height
                        const imgMaxSide = Math.max(imgWidth, imgHeight)
                        const imgMinSide = Math.min(imgWidth, imgHeight)

                        const imgCut = {
                            scaleToFill: [
                                0, 0, imgWidth, imgHeight
                            ], // 缩放: 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
                            aspectFit: [
                                (imgWidth - imgMaxSide) / 2, (imgHeight - imgMaxSide) / 2, imgMaxSide, imgMaxSide
                            ], // 缩放: 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
                            aspectFill: [
                                (imgWidth - imgMinSide) / 2, (imgHeight - imgMinSide) / 2, imgMinSide, imgMinSide
                            ], // 缩放: 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
                            widthFix: [], // 缩放: 宽度不变，高度自动变化，保持原图宽高比不变
                            top: [
                                (imgWidth - width) / 2, 0, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的顶部区域
                            bottom: [
                                (imgWidth - width) / 2, imgHeight - height, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的底部区域
                            center: [
                                (imgWidth - width) / 2, (imgHeight - height) / 2, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的中间区域
                            left: [
                                0, (imgHeight - height) / 2, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的左边区域
                            right: [
                                imgWidth - width, (imgHeight - height) / 2, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的右边区域
                            'top left': [
                                0, 0, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的左上边区域
                            'top right': [
                                imgWidth - width, 0, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的右上边区域
                            'bottom left': [
                                0, imgHeight - height, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的左下边区域
                            'bottom right': [
                                imgWidth - width, imgHeight - height, width, height
                            ] // 裁剪: 不缩放图片，只显示图片的右下边区域
                        }
                        // console.log(mode)

                        this.ctx.drawImage(
                            img,
                            // ...(imgCut[mode] || imgCut.scaleToFill).map((n, i) => i >= 4 ? this.xDpr(n) : n)
                            ...(imgCut[mode] || []),
                            this.xDpr(x) || 0,
                            this.xDpr(y) || 0,
                            this.xDpr(width || res.width),
                            this.xDpr(height || res.height)
                        )
                        resolve()
                    },
                    fail: err => {
                        reject(err)
                    }
                })
            }

            img.onerror = (err) => {
                reject(err)
            }
        })
    }

    // 绘制文本
    drawText (opts) {
        // console.log(opts)
        return new Promise((resolve, reject) => {
            const _opts = {
                text: '',
                x: 0,
                y: 0,
                color: '#000',
                fontSize: 12,
                fontWeight: '',
                width: Infinity,
                baseline: 'top', // top | hanging | middle | alphabetic | ideographic | bottom
                align: 'left', // left | right | center | start | end
                ...opts,
                ellipsis: Math.max(+opts.ellipsis, 0), // 最多显示行数，超出显示...
                lineHeight: opts.lineHeight || opts.fontSize || 12
            }

            let start = 0 // 截取的起始下标
            let index = 0 // 行数下标
            let splitStr = [] // 拆分后的文本数组

            this.ctx.setTextAlign = _opts.align
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
                const y = _opts.y + _opts.lineHeight * i + (_opts.lineHeight - _opts.fontSize) / 2

                this.ctx.fillText(
                    n,
                    this.xDpr(_opts.x),
                    this.xDpr(y)
                )
            })

            resolve()
        })
    }

    // 绘制线段
    drawLine (opts) {
        // console.log(opts)
        return new Promise((resolve, reject) => {
            const _opts = {
                lineStyle: {
                    cap: 'butt', // butt | round | square
                    join: 'bevel', // bevel | round | miter
                    offset: 0,
                    dash: [1, 0],
                    color: '#000',
                    width: 1,
                    ...opts.lineStyle
                },
                line: opts.line || []
            }

            // 设置线段样式
            this.ctx.lineCap = _opts.lineStyle.cap
            this.ctx.setLineDash(_opts.lineStyle.dash.map(n => this.xDpr(n)))
            this.ctx.lineDashOffset = this.xDpr(_opts.lineStyle.offset)
            this.ctx.lineJoin = _opts.lineStyle.join
            this.ctx.lineWidth = this.xDpr(_opts.lineStyle.width)
            this.ctx.strokeStyle = _opts.lineStyle.color

            // 绘制线段
            _opts.line.forEach((n, i) => {
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

    // 保存画布内容到相册
    saveToAlbum (opts) {
        return new Promise((resolve, reject) => {
            const _opts = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                destWidth: 0,
                destHeight: 0,
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
                    wx.getSetting({
                        success (res) {
                            // console.log(res)
                            // console.log(res.authSetting['scope.writePhotosAlbum'])
                            if (!res.authSetting['scope.writePhotosAlbum']) {
                                wx.authorize({
                                    scope: 'scope.writePhotosAlbum',
                                    success: () => {
                                        wx.saveImageToPhotosAlbum({
                                            filePath: tempFilePath,
                                            success: response => {
                                                resolve()
                                            },
                                            fail: err => {
                                                reject(err)
                                            }
                                        })
                                    },
                                    fail: (err) => {
                                        reject(err)
                                    }
                                })
                            } else {
                                wx.saveImageToPhotosAlbum({
                                    filePath: tempFilePath,
                                    success: response => {
                                        resolve()
                                    },
                                    fail: err => {
                                        reject(err)
                                    }
                                })
                            }
                        },
                        fail: err => {
                            reject(err)
                        }
                    })
                },
                fail: err => {
                    reject(err)
                }
            })
        })
    }
}

export default WxCanvas2d
