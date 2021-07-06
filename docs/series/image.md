# image
*****

### 示例
![](../images/screenshot_1605709004065.png)
```
canvas.draw({
    series: [
        {
            type: 'image',
            url: './image.jpg',
            x: 0,
            y: 0,
            width: 600,
            height: 600,
            mode: 'scaleToFill',
            radius: 0,
            zIndex: 0
        }
    ]
})
```

### 属性
| 属性 | 描述 | 是否必填 | 类型 | 默认值|
| --- | --- | --- | --- | --- |
| type | series 系列类型标识 | 是 | String | - |
| url | 图片路径（必须符合项目合法域名） | 是 | String | - |
| x | 绘制起始点的x轴坐标，左端为0 | 否 | Number | 0 |
| y | 绘制起始点的y轴坐标，顶部为0 | 否 | Number | 0 |
| width | 图片宽度 | 否 | Number | 0 |
| height| 图片高度 | 否 | Number | 0 |
| mode | 图片的裁剪方式，参考小程序 image 标签的 mode 属性 | 否 | String | 'scaleToFill' |
| radius | 图片圆角 | 否 | Number | 0 |
| zIndex | 图层顺序，值越大，图层越高 | 否 | Number | 0 |
