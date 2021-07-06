const SYS_INFO = wx.getSystemInfoSync()

class WxCanvas2d {
    constructor () {
        this.query = null // canvas 的查询条件
        this.bgColor = null // canvas 背景色
        this.radius = null // canvas 背景色
        this.component = null // 如果是在自定义组件中，需要获取到自定义组件的内部 this 变量 (即，传入 this)
        this.canvas = null // canvas 节点
        this.ctx = null // canvas 上下文
        this.dpr = null // 像素比
        this.rootWidth = null // UI设计稿宽度
        this.fontFamily = 'sans-serif' // 默认字体，目前好像只有这个是可用的
        this.startTime = Date.now()
        this.debugger = false // 调试模式
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
                    if (!res[0]) {
                        this.debugLogout('找不到画布', 'error')
                        return false
                    }

                    const canvas = res[0].node
                    const ctx = canvas.getContext('2d')
                    const dpr = SYS_INFO.pixelRatio

                    this.canvas = canvas
                    this.ctx = ctx
                    this.dpr = dpr
                    this.rootWidth = options.rootWidth

                    this.canvas.width = res[0].width * this.dpr
                    this.canvas.height = res[0].height * this.dpr
                    // this.ctx.scale(this.dpr, this.dpr)

                    resolve()
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
                width: this.canvas.width / SYS_INFO.screenWidth / this.dpr * this.rootWidth,
                height: this.canvas.height / SYS_INFO.screenWidth / this.dpr * this.rootWidth,
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
        return val * this.dpr * SYS_INFO.screenWidth / this.rootWidth
    }

    // 绘制画布 (重设画布大小)
    draw (opts) {
        // console.log(opts)
        return new Promise((resolve, reject) => {
            this.startTime = Date.now()
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

                    // 按顺序绘制图层方法
                    const next = (index = 0) => {
                        if (index < _series.length) {
                            const options = _series[index]
                            if (options.type && options.type.name && typeof options.type.handler === 'function') {
                                // this.debugLogout(`正在绘制 [${options.type.name}] (${index + 1}/${_series.length})`)
                                this.styleClear() // 绘制新图层前，先还原一次样式设置
                                options.type.handler.call(this, options).then(() => {
                                    this.debugLogout(`绘制成功 [${options.type.name}] (${index + 1}/${_series.length})`)
                                    next(++index)
                                }).catch(err => {
                                    this.debugLogout('绘制失败')
                                    reject(err) // 绘制失败抛错
                                })
                            } else {
                                // console.warn(`[WxCanvas2d] Unknown type: '${options.type}'`)
                                this.debugLogout(`未知类型 type: '${options.type && options.type.name}'`, 'error')
                                next(++index)
                            }
                        } else {
                            this.debugLogout(`绘制完成 (${Date.now() - this.startTime}ms)`)
                            resolve() // 所有图层绘制完毕
                        }
                    }

                    this.debugLogout('开始绘制')
                    next() // 开始按顺序绘制图层
                })
        })
    }

    // 清空 (初始化) 样式
    styleClear () {
        this.ctx.setTextAlign = 'left'
        this.ctx.textBaseline = 'top'
        this.ctx.fillStyle = '#000'
        this.ctx.font = `${this.xDpr(12 * this.rootWidth / SYS_INFO.screenWidth)}px ${this.fontFamily}`
        this.ctx.lineCap = 'butt'
        this.ctx.setLineDash([1, 0])
        this.ctx.lineDashOffset = 0
        this.ctx.lineJoin = 'bevel'
        this.ctx.lineWidth = this.xDpr(1)
        this.ctx.strokeStyle = '#000'
        // this.setContainerRadius()
    }

    // 绘制矩形路径
    drawRectPath (opts) {
        const {
            x = 0,
            y = 0,
            width = 0,
            height = 0,
            radius = 0
        } = opts
        // console.log(_opts)

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

    // 设置线的样式
    setLineStyle (lineStyle = {}) {
        const {
            cap = 'butt', // butt | round | square
            join = 'bevel', // bevel | round | miter
            offset = 0,
            dash = [1, 0],
            color = '#000',
            width = 2
        } = lineStyle

        this.ctx.lineCap = cap
        this.ctx.setLineDash(dash.map(n => this.xDpr(n)))
        this.ctx.lineDashOffset = this.xDpr(offset)
        this.ctx.lineJoin = join
        this.ctx.lineWidth = this.xDpr(width)
        this.ctx.strokeStyle = color
    }

    // 输出 debug 信息
    debugLogout () {}
}

// 使用插件
WxCanvas2d.use = function (util = {}) {
    if (!util.name || !util.handler) return

    WxCanvas2d.prototype[util.name] = function (...pars) {
        return util.handler.call(this, ...pars)
    }
}

export default WxCanvas2d
