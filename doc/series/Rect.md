# Rect - 矩形

## 效果图
![](../images/screenshot_1605710094252.png)

## 代码
```js
import {
    Rect
} from 'wx-canvas-2d'

canvas.draw({
    series: [
        {
            type: Rect,
            x: 40,
            y: 40,
            width: 520,
            height: 520,
            bgColor: '#0ff',
            radius: 16,
            lineStyle: {
                color: 'blue',
                width: 10,
                dash: [15, 15]
            },
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
| bgColor | 背景色（填充色） | 否 | String | - |
| radius | 矩形圆角 | 否 | Number | 0 |
| lineStyle | 边框线样式 | 否 | [lineStyle](../common/lineStyle.md) | - |
| zIndex | 图层顺序，值越大，图层越高 | 否 | Number | 0 |
