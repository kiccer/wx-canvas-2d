// miniprogramRoot/pages/home/index.js
import WxCanvas2d from '../../res/wx-canvas-2d.js'

const canvas = new WxCanvas2d()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canvas: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 创建
        canvas.create({
            query: '.poster-canvas', // 必传，canvas元素的查询条件
            rootWidth: 750, // 参考设备宽度 (即开发时UI设计稿的宽度，默认375，可改为750)
            bgColor: '#fff', // 背景色，默认透明
            // component: this, // 自定义组件内需要传 this
            radius: 16 // 海报图圆角，如果不需要可不填
        }).then(res => {
            // console.log(res)
        }).catch(err => {
            console.log('[WxCanvas2d] Canvas create fail: ', err)
        })

        // 绘制
        canvas.draw({
            series: [
                {
                    type: 'image', // 图片
                    url: '../../images/code-cloud-callback-config.png',
                    x: 0,
                    y: 0,
                    width: 600,
                    height: 600
                    // mode: 'scaleToFill', // 图片的裁剪方式，参考小程序 image 标签的 mode 属性
                    // zIndex: 0
                },
                {
                    type: 'text', // 文本
                    text: '测试标题',
                    x: 40,
                    y: 640,
                    color: '#000',
                    fontSize: 30
                    // fontWeight: '',
                    // width: 100, // 文字块的宽度，设置后文字会自动换行
                    // baseline: 'top', // top | hanging | middle | alphabetic | ideographic | bottom
                    // align: 'left', // left | right | center | start | end
                    // ellipsis: 0, // 最多显示行数，超出内容显示省略号，0为不限制
                    // lineHeight: 12 // 行高
                    // zIndex: 0
                },
                {
                    type: 'text', // 文本
                    text: '第二行超出显示省略号。第二行超出显示省略号。第二行超出显示省略号。第二行超出显示省略号。',
                    x: 40,
                    y: 680,
                    color: '#000',
                    fontSize: 24,
                    // fontWeight: '',
                    width: 350, // 文字块的宽度，设置后文字会自动换行
                    // baseline: 'top', // top | hanging | middle | alphabetic | ideographic | bottom
                    // align: 'left', // left | right | center | start | end
                    ellipsis: 2, // 最多显示行数，超出内容显示省略号，0为不限制
                    lineHeight: 30 // 行高
                    // zIndex: 0
                },
                {
                    type: 'image', // 图片
                    url: '../../images/logo.jpg',
                    x: 420,
                    y: 720,
                    width: 140,
                    height: 140
                    // mode: 'scaleToFill', // 图片的裁剪方式，参考小程序 image 标签的 mode 属性
                    // zIndex: 0
                }
                // {
                //     type: 'line', // 线段
                //     lineStyle: {
                //         cap: 'butt', // butt | round | square
                //         join: 'bevel', // bevel | round | miter
                //         offset: 0,
                //         dash: [1, 0],
                //         color: '#000',
                //         width: 1
                //     },
                //     line: [
                //         { point: [0, 0] },
                //         { point: [100, 100] }
                //     ],
                //     zIndex: 0
                // },
                // {
                //     type: 'rect', // 矩形
                //     x: 0,
                //     y: 0,
                //     width: 0,
                //     height: 0,
                //     color: '',
                //     bgColor: '',
                //     radius: 0,
                //     zIndex: 0
                // }
            ]
        }).then(() => {
            console.log('绘制成功！')
        }).catch(err => {
            console.log('绘制失败！', err)
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    saveImg () {
        canvas.saveToAlbum()
    }
})
