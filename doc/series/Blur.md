# Blur - 高斯模糊

## 效果图
![](../images/screenshot_1605710246577.png)

## 代码
```js
import {
    Image,
    Blur
} from 'wx-canvas-2d'

canvas.draw({
    series: [
        {
            type: Image,
            url: './image.jpg',
            x: 0,
            y: 0,
            width: 600,
            height: 600,
            mode: 'scaleToFill',
            radius: 0,
            zIndex: 0
        },
        {
            type: Blur,
            x: 0,
            y: 0,
            width: 600,
            height: 600,
            blur: 40,
            zIndex: 0
        }
    ]
})
```

## 属性
| 属性 | 描述 | 是否必填 | 类型 | 默认值|
| --- | --- | --- | --- | --- |
| type | series 系列类型标识 | 是 | String | - |
| x | 绘制起始点的x轴坐标，左端为0 | 否 | Number | 0 |
| y | 绘制起始点的y轴坐标，顶部为0 | 否 | Number | 0 |
| width | 图片宽度 | 否 | Number | 0 |
| height| 图片高度 | 否 | Number | 0 |
| blur| 模糊度 | 否 | Number | 0 |
| zIndex | 图层顺序，值越大，图层越高 | 否 | Number | 0 |
