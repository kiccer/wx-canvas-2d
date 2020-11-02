# wx-canvas-2d

目前可用于实现一些简单的海报图。

<!-- ![预览图](./img/demo/1.png) -->
<div align="center">
    <img src="./img/demo/1.png" width="300" />
</div>

### INSTALL

```
npm i -S wx-canvas-2d
```
> 安装完毕后记得用微信小程序开发者工具构建一下npm (工具 -> 构建 npm)

### USE IT

```html
<canvas
    type="2d"
    id="poster-canvas"
    class="poster-canvas"
    style="width: 100%; height: 100%;"
    disable-scroll="{{ true }}"
/>
```

```javascript
import WxCanvas2d from 'wx-canvas-2d'

// 实例化对象
const canvas = new WxCanvas2d()

// 创建
canvas.create({
    query: '.poster-canvas', // 必传，canvas元素的查询条件
    rootWidth: 750, // 参考设备宽度 (即开发时UI设计稿的宽度，默认375，可改为750)
    bgColor: '#fff', // 背景色，默认透明
    component: this, // 自定义组件内需要传 this
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
            url: 'https://a.b.c',
            x: 0,
            y: 0,
            width: 600,
            height: 600,
            mode: 'scaleToFill', // 图片的裁剪方式，参考小程序 image 标签的 mode 属性
            radius: 0, // 图片圆角
            zIndex: 0
        },
        {
            type: 'text', // 文本
            text: '',
            x: 0,
            y: 0,
            color: '#000',
            fontSize: 12,
            fontWeight: '',
            width: 100, // 文字块的宽度，设置后文字会自动换行
            baseline: 'top', // top | hanging | middle | alphabetic | ideographic | bottom
            align: 'left', // left | right | center | start | end
            ellipsis: 0, // 最多显示行数，超出内容显示省略号，0为不限制
            lineHeight: 12, // 行高
            zIndex: 0
        },
        {
            type: 'line', // 线段
            lineStyle: {
                cap: 'butt', // butt | round | square
                join: 'bevel', // bevel | round | miter
                offset: 0,
                dash: [1, 0],
                color: '#000',
                width: 1
            },
            line: [
                { point: [0, 0] },
                { point: [100, 100] }
            ],
            zIndex: 0
        },
        {
            type: 'rect', // 矩形
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: '',
            bgColor: '',
            radius: 0,
            zIndex: 0
        }
    ]
}).then(() => {
    console.log('绘制成功！')
}).catch(err => {
    console.log('绘制失败！', err)
})

// 清空
canvas.clear()

// 保存图片到相册
canvas.saveToAlbum({
    destWidth: 600,
    destHeight: 900
}).then(res => {
    wx.showModal({
        content: '图片已保存到相册，赶紧晒一下吧~'
    })
}).catch(err => {
    wx.showModal({
        content: '图片保存失败'
    })
})
```
