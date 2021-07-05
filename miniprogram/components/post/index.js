// components/post/index.js
// import WxCanvas2d from 'plugin/wx-canvas-2d'
// const WxCanvas2d = requirePlugin('wx-canvas-2d').default

// WxCanvas2d.addSeries('test', (cvs, opts) => {
//     return new Promise((resolve, reject) => {
//         // console.log(cvs, opts)
//         resolve()
//     })
// })

// const canvas = new WxCanvas2d()
// console.log({ canvas })

const {
    WxCanvas2d,
    Debugger,
    SaveToAlbum,
    Image,
    Text,
    Line
} = requirePlugin('wx-canvas-2d')

WxCanvas2d.use(Debugger)
WxCanvas2d.use(SaveToAlbum)

const canvas = new WxCanvas2d()
console.log({ canvas })

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    lifetimes: {
        attached () {
            // // 在组件实例进入页面节点树时执行
            // canvas.debugger = true // open debugger

            setTimeout(() => {
                // 创建
                canvas.create({
                    query: '.poster-canvas', // 必传，canvas元素的查询条件
                    rootWidth: 750, // 参考设备宽度 (即开发时UI设计稿的宽度，默认375，可改为750)
                    bgColor: '#fff', // 背景色，默认透明
                    component: this, // 自定义组件内需要传 this
                    radius: 16 // 海报图圆角，如果不需要可不填
                }).then(() => {
                    console.log('画布创建成功')
                }).catch(err => {
                    console.log('画布创建失败: ', err)
                })
            }, 500)
        },

        detached () {
            // 在组件实例被从页面节点树移除时执行
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onClose () {
            // canvas.clear()
            this.triggerEvent('close')
        },

        onAfterEnter () {
            if (!this.properties.item) return

            const { item } = this.properties

            // console.log({ item })

            // 绘制
            canvas.draw({
                series: [
                    {
                        type: Image, // 图片
                        url: item.img,
                        x: 0,
                        y: 0,
                        width: 600,
                        height: 600,
                        mode: 'aspectFill'
                    },
                    // {
                    //     type: 'blur',
                    //     x: 0,
                    //     y: 0,
                    //     width: 600,
                    //     height: 600,
                    //     blur: 40
                    // },
                    {
                        type: Text,
                        text: item.name,
                        x: 30,
                        y: 620,
                        color: '#222',
                        fontSize: 30,
                        fontWeight: 'bold',
                        lineHeight: 42
                    },
                    {
                        type: Text,
                        text: '￥',
                        x: 30,
                        y: 683,
                        color: '#F25238',
                        fontSize: 24,
                        fontWeight: 'bold',
                        lineHeight: 33
                    },
                    {
                        type: Text,
                        text: item.price,
                        x: 49,
                        y: 672,
                        color: '#F25238',
                        fontSize: 34,
                        fontWeight: 'bold',
                        lineHeight: 48
                    },
                    {
                        type: Text,
                        text: item.desc,
                        x: 30,
                        y: 787,
                        color: '#969696',
                        fontSize: 24,
                        width: 390,
                        lineHeight: 33,
                        ellipsis: 2
                    },
                    {
                        type: Line,
                        lineStyle: {
                            dash: [7, 3],
                            color: '#E9E9E9',
                            width: 2
                        },
                        line: [
                            {
                                point: [30, 740]
                            },
                            {
                                point: [30 + 540, 740]
                            }
                        ]
                    },
                    {
                        type: Image,
                        url: '../../img/qrcode.png',
                        x: 450,
                        y: 760,
                        width: 120,
                        height: 120
                    }
                    // {
                    //     type: 'arc',
                    //     x: 300,
                    //     y: 300,
                    //     r: 100,
                    //     start: 0,
                    //     end: Math.PI * 1.2,
                    //     lineStyle: {
                    //         color: 'red',
                    //         width: 10
                    //     }
                    // }
                    // {
                    //     type: 'image',
                    //     url: '../../img/avatar.png',
                    //     x: 200,
                    //     y: 200,
                    //     width: 200,
                    //     height: 200,
                    //     mode: 'aspectFill',
                    //     radius: 100,
                    //     blur: 50
                    // }
                ]
            }).then(() => {
                console.log('绘制成功！')
            }).catch(err => {
                console.log('绘制失败！', err)
            })
        },

        onBeforeLeave () {
            // 清空
            // canvas.clear()
        },

        saveImg () {
            // 保存图片到相册
            canvas.saveToAlbum({
                destWidth: 600,
                destHeight: 900
            }).then(res => {
                wx.showModal({
                    content: '图片已保存到相册，赶紧晒一下吧~'
                })
            }).catch((err) => {
                console.log(err)
                if (err.code === 105) {
                    // wx.showModal({
                    //     content: '请重新点击一次保存到相册'
                    // })
                } else {
                    wx.showModal({
                        content: '图片保存失败'
                    })
                }
            })
        }
    }
})
