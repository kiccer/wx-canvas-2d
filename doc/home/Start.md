# Start - 快速开始

第一步，在 `wxml` 文件中写入 `canvas` 元素

```html
<view class="canvas-container">
    <canvas
        type="2d"
        id="poster-canvas"
        class="poster-canvas"
        style="width: 100%; height: 100%;"
        disable-scroll="{{ true }}"
    />
</view >
```

第二步，为 `canvas` 元素容器设置大小 (也可以直接设置 `canvas` 元素的大小)
```css
.canvas-container {
    width: 600rpx;
    height: 900rpx;
}
```

第三步，在 `js` 文件中引入 `wx-canvas-2d` 插件，然后实例化 `WxCanvas2d` 对象，并创建画布

::: warning 提示
请确保此时页面中存在对应的 canvas 元素！
:::

```js
// 引入 `wx-canvas-2d` 插件
import {
    WxCanvas2d,
    Text
} from 'wx-canvas-2d'

// 实例化对象
const canvas = new WxCanvas2d()

// 创建画布
canvas.create({
    query: '.poster-canvas', // 必传，canvas元素的查询条件
    rootWidth: 750, // 参考设备宽度 (即开发时UI设计稿的宽度，默认375，可改为750)
    bgColor: '#fff', // 背景色，默认透明
    component: this, // 自定义组件内需要传 this
    radius: 16 // 海报图圆角，如果不需要可不填
})
```

第四步，画布创建后就可以开始绘制了

::: warning 提示
请确保此时的 canvas 是可见的！
:::

```js
canvas.draw({
    series: [
        {
            type: Text,
            text: 'Hello World',
            fontSize: 30
        }
    ]
})
```

效果图：
![](../images/screenshot_1605684220495.png)
