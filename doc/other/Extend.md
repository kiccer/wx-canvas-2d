# Extend - 扩展开发

## 增加一个 Series 类型

假设创建一个 `Shadow.js` 用于实现阴影的绘制。

```js
// Shadow.js
module.exports = {
    name: 'Shadow', // 绘制时会输出的 Debugger 信息

    handler (config = {}) {
        // config 为绘制时传入的配置
        // this 为 WxCanvas2d 的实例
        return new Promise((resolve, reject) => {
            // 在此处写绘制方法
            resolve() // 绘制完成时调用 resolve
        })
    }
}

```

::: tip 提示
`handler` 方法必须返回一个 `Promise` 对象，且必须在函数内调用 `resolve`，否则绘制任务将无法继续向下执行！
:::

然后在 `post.js` 中使用它：

```js
import {
    WxCanvas2d
} from 'wx-canvas-2d'
import Shadow from './Shadow.js'

const canvas = new WxCanvas2d()

canvas.create({
    query: '.poster-canvas',
    rootWidth: 750,
    bgColor: '#fff',
    component: this,
    radius: 16
})

canvas.draw({
    series: [
        {
            type: Shadow
            // any config info...
        }
    ]
})
```

## 开发扩展插件

假设增加一个 `Test.js` 插件

```js
module.exports = {
    // 函数名
    name: '',

    // 函数体
    handler () {}
}
```

::: tip 提示
`handler` 函数内部 `this` 可以获取到 `WxCanvas2d` 实例。
:::

使用 `use` 方法注册插件

```js
import {
    WxCanvas2d
} from 'wx-canvas-2d'
import Test from './Test.js'

WxCanvas2d.use(Test)
```

使用自定义方法 `test()`

```js
const canvas = new WxCanvas2d()

canvas.test()
```
