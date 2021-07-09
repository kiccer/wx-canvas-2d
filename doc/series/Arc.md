# Arc - 弧线

## 效果图
![](../images/screenshot_1605710784160.png)

## 代码
```js
import {
    Arc
} from 'wx-canvas-2d'

canvas.draw({
    series: [
        {
            type: Arc,
            x: 300,
            y: 450,
            r: 200,
            start: 0,
            end: Math.PI * 1.5,
            reverse: false,
            lineStyle: {
                dash: [15, 15],
                width: 10,
                color: '#09f'
            },
            zIndex: 0
        },
        {
            type: Arc,
            x: 300,
            y: 450,
            r: 100,
            start: 0,
            end: Math.PI * 0.5,
            reverse: true,
            lineStyle: {
                dash: [15, 15],
                width: 10,
                color: '#0ff'
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
| x | 弧线中心点的x轴坐标，左端为0 | 否 | Number | 0 |
| y | 弧线中心点的y轴坐标，顶部为0 | 否 | Number | 0 |
| r | 弧线半径 | 否 | Number | 0 |
| start | 弧线起始角度 | 否 | Number | 0 |
| end | 弧线终止角度 | 否 | Number | 0 |
| reverse | 是否反向绘制弧线 | 否 | Boolean | false |
| lineStyle | 边框线样式 | 否 | [lineStyle](../common/lineStyle.md) | - |
| zIndex | 图层顺序，值越大，图层越高 | 否 | Number | 0 |
