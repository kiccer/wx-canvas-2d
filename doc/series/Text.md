## 示例
![](../images/screenshot_1605709494648.png)

## 代码
```js
import {
    Text
} from 'wx-canvas-2d'

canvas.draw({
    series: [
        {
            type: Text,
            text: Array(10).fill('Hello World！').join(''),
            x: 40,
            y: 40,
            color: '#000',
            fontSize: 48,
            fontWeight: 'bold',
            width: 520,
            baseline: 'top',
            align: 'left',
            ellipsis: 5,
            lineHeight: 48 * 1.5,
            zIndex: 0
        }
    ]
})
```

## 属性
| 属性 | 描述 | 是否必填 | 类型 | 默认值|
| --- | --- | --- | --- | --- |
| type | series 系列类型标识 | 是 | String | - |
| text | 文本内容 | 否 | String | '' |
| x | 绘制起始点的x轴坐标，左端为0 | 否 | Number | 0 |
| y | 绘制起始点的y轴坐标，顶部为0 | 否 | Number | 0 |
| color | 文本颜色 | 否 | String | '#000' |
| fontSize | 字体大小 | 否 | Number | 12 |
| fontWeight | 字体粗细 | 否 | String | '' |
| width | 文本最大长度，设置后文字会自动换行 | 否 | Number | Infinity |
| baseline | 基准线，可选项有：top \| hanging \| middle \| alphabetic \| ideographic \| bottom | 否 | String | 'top' |
| align | 对齐方式，可选项有：left \| right \| center \| start \| end | 否 | String | 'left' |
| ellipsis | 最多显示行数，超出内容显示省略号，0为不限制 | 否 | Number | 0 |
| lineHeight | 行高 | 否 | Number | fontSize \| 12 |
| zIndex | 图层顺序，值越大，图层越高 | 否 | Number | 0 |
