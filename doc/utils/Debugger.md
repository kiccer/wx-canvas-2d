## 示例代码

```js
import {
    WxCanvas2d,
    Debugger
} from 'wx-canvas-2d'

WxCanvas2d.use(Debugger)

const canvas = new WxCanvas2d()

// canvas.create()
// ...

// canvas.draw()
// ...
```

::: tip 提示
开启 `Debugger` 后,绘制时会有信息输出，以及遇到一些问题也会有提示信息输出。
:::
