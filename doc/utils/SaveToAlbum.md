# SaveToAlbum - 保存到相册

## 示例代码

```js
import {
    WxCanvas2d,
    SaveToAlbum
} from 'wx-canvas-2d'

WxCanvas2d.use(SaveToAlbum)

const canvas = new WxCanvas2d()

// canvas.create()
// ...

// canvas.draw()
// ...

// 保存到相册
canvas.save({
    destWidth: 600,
    destHeight: 900
}).then(res => {
    console.log(res)
})
```
