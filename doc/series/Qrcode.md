## 示例
![](../images/screenshot_qrcode_1.png)

## 代码
```js
import {
    Qrcode
} from 'wx-canvas-2d'

canvas.draw({
    series: [
        {
            type: Qrcode,
            text: 'https://github.com/kiccer/wx-canvas-2d',
            x: 30,
            y: 30,
            size: 540
        }
    ]
})
```

## 属性
| 属性 | 描述 | 是否必填 | 类型 | 默认值|
| --- | --- | --- | --- | --- |
| text | 二维码信息内容 | 否 | String | '' |
| x | 绘制起始点的x轴坐标，左端为0 | 否 | Number | 0 |
| y | 绘制起始点的y轴坐标，顶部为0 | 否 | Number | 0 |
| size | 二维码大小 | 否 | Number | 0 |
| color | 二维码前景色 | 否 | String | '#000' |
| bgColor | 二维码背景色 | 否 | String | '#fff' |
| ecc | 纠错能力等级 | 否 | Number | 2 |
