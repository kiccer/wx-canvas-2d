# EventListener - 事件监听

`wx-canvas-2d` 允许使用监听方法，以便在特定事件触发前后执行一些方法，目前受支持的事件如下：

## beforeDraw - 监听绘制前

使用方法

```js
import {
    WxCanvas2d
} from 'wx-canvas-2d'

const canvas = new WxCanvas2d()

// 监听绘制前
canvas.on('beforeDraw', e => {
    console.log(e)
})
```

回调函数接收参数 `e` 的属性信息

| 属性 | 描述 |
| --- | --- |
| index | 当前正在绘制第几项 |
| config | 当前绘制项的配置信息 |

## afterDraw - 监听绘制后

使用方法

```js
import {
    WxCanvas2d
} from 'wx-canvas-2d'

const canvas = new WxCanvas2d()

// 监听绘制前
canvas.on('afterDraw', e => {
    console.log(e)
})
```

回调函数接收参数 `e` 的属性信息

| 属性 | 描述 |
| --- | --- |
| index | 刚绘制完第几项 |
| config | 刚完成绘制项的配置信息 |
| error | 当出现错误时会返回错误 |
