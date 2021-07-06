module.exports = {
    name: 'image',

    handler (config = {}) {
        return new Promise((resolve, reject) => {
            const {
                url = '',
                x = 0,
                y = 0,
                width = 0,
                height = 0,
                mode = 'scaleToFill',
                radius = 0
            } = config
            const img = this.canvas.createImage()

            img.src = url
            img.onload = () => {
                wx.getImageInfo({
                    src: url,
                    success: res => {
                        const imgWidth = res.width
                        const imgHeight = res.height
                        const aspectRatio = width / height
                        let widthRatio = 1
                        let heightRatio = 1

                        // 原图等比例缩放后截取范围的长宽比
                        if (mode === 'aspectFit') {
                            widthRatio = res.width / res.height < aspectRatio
                                ? width / res.width * res.height / height : 1
                            heightRatio = res.width / res.height > aspectRatio
                                ? height / res.height * res.width / width : 1
                        } else if (mode === 'aspectFill') {
                            widthRatio = res.width / res.height > aspectRatio
                                ? width / res.width * res.height / height : 1
                            heightRatio = res.width / res.height < aspectRatio
                                ? height / res.height * res.width / width : 1
                        }

                        const imgCut = {
                            scaleToFill: [
                                0, 0, imgWidth, imgHeight
                            ], // 缩放: 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
                            aspectFit: [
                                (res.width - res.width * widthRatio) / 2, (res.height - res.height * heightRatio) / 2, res.width * widthRatio, res.height * heightRatio
                            ], // 缩放: 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
                            aspectFill: [
                                (res.width - res.width * widthRatio) / 2, (res.height - res.height * heightRatio) / 2, res.width * widthRatio, res.height * heightRatio
                            ], // 缩放: 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
                            widthFix: [], // 缩放: 宽度不变，高度自动变化，保持原图宽高比不变
                            top: [
                                (imgWidth - width) / 2, 0, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的顶部区域
                            bottom: [
                                (imgWidth - width) / 2, imgHeight - height, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的底部区域
                            center: [
                                (imgWidth - width) / 2, (imgHeight - height) / 2, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的中间区域
                            left: [
                                0, (imgHeight - height) / 2, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的左边区域
                            right: [
                                imgWidth - width, (imgHeight - height) / 2, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的右边区域
                            'top left': [
                                0, 0, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的左上边区域
                            'top right': [
                                imgWidth - width, 0, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的右上边区域
                            'bottom left': [
                                0, imgHeight - height, width, height
                            ], // 裁剪: 不缩放图片，只显示图片的左下边区域
                            'bottom right': [
                                imgWidth - width, imgHeight - height, width, height
                            ] // 裁剪: 不缩放图片，只显示图片的右下边区域
                        }
                        // console.log(mode)

                        if (radius) {
                            this.ctx.save()
                            this.drawRectPath({ x, y, width, height, radius })
                            this.ctx.clip()
                        }

                        this.ctx.drawImage(
                            img,
                            // ...(imgCut[mode] || imgCut.scaleToFill).map((n, i) => i >= 4 ? this.xDpr(n) : n)
                            ...(imgCut[mode] || []),
                            this.xDpr(x) || 0,
                            this.xDpr(y) || 0,
                            this.xDpr(width || res.width),
                            this.xDpr(height || res.height)
                        )

                        if (radius) {
                            this.ctx.restore()
                        }

                        resolve()
                    },
                    fail: err => {
                        reject(err)
                    }
                })
            }

            img.onerror = err => {
                reject(err)
            }
        })
    }
}
