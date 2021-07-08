## 效果图
![](../images/screenshot_1605709694302.png)

## 代码
```js
import {
    Line
} from 'wx-canvas-2d'

canvas.draw({
    series: [
        {
            type: Line,
            lineStyle: {
                width: 10
            },
            line: [
                { point: [0, 0] },
                { point: [600, 900] }
            ],
            zIndex: 0
        }
    ]
})
```

## 属性
| 属性 | 描述 | 是否必填 | 类型 | 默认值|
| --- | --- | --- | --- | --- |
| type | series 系列类型标识 | 是 | String | - |
| lineStyle | 线段样式 | 否 | [lineStyle](../common/lineStyle.md) | - |
| line | 组成线段的点的集合 | 否 | Array | [] |
| line.point | 点坐标[x, y] | 是 | Array | - |
| zIndex | 图层顺序，值越大，图层越高 | 否 | Number | 0 |
