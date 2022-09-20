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

// 监听绘制后
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

## off - 取消监听

使用方法

```js
import {
    WxCanvas2d
} from 'wx-canvas-2d'

const canvas = new WxCanvas2d()

// 监听绘制后
const onAfterDraw = e => {
    console.log(e)
}

canvas.on('afterDraw', onAfterDraw)

// ...
// 当你不需要再监听时调用 off 方法清除监听
canvas.off('afterDraw', onAfterDraw)
```

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| eventType | String | 需要清除的事件类型,如 `"beforeDraw"` 、 `"afterDraw"` |
| callback | Function | 回调事件，当此项存在时，将会清除指定的监听事件。如果不传此项，则清除指定事件类型的所有监听事件 |
