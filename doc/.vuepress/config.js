module.exports = {
    title: 'wx-canvas-2d - 2.0 使用文档',
    description: '微信小程序 canvas-2d 绘图工具，支持按需加载，支持内容配置，支持功能扩展，适配各种机型，超轻量，超易用，无需学习，直接上手。',
    base: '/wx-canvas-2d/',
    dest: './docs/',
    head: [
        ['script', {
            src: 'https://s4.cnzz.com/z_stat.php?id=1278061537&web_id=1278061537'
        }]
    ],
    markdown: {
        lineNumbers: true // 代码行号
    },
    // plugins: [
    //     'autobar'
    // ],
    themeConfig: {
        nav: [
            { text: 'GitHub', link: 'https://github.com/kiccer/wx-canvas-2d' },
            { text: 'Issues', link: 'https://github.com/kiccer/wx-canvas-2d/issues' },
            { text: 'v1.x文档', link: 'https://www.kancloud.cn/kiccer/wx-canvas-2d/content' },
        ],
        sidebar: [
            {
                title: '指南',
                collapsable: false,
                children: [
                    ['', '简介'],
                    ['/home/Install', '安装'],
                    ['/home/Start', '快速开始'],
                ]
            },
            {
                title: 'Series 列表',
                collapsable: false,
                children: [
                    ['/series/Arc', 'Arc - 弧线'],
                    ['/series/Blur', 'Blur - 高斯模糊'],
                    ['/series/Image', 'Image - 图片'],
                    ['/series/Line', 'Line - 线段'],
                    ['/series/Qrcode', 'Qrcode - 二维码'],
                    ['/series/Rect', 'Rect - 矩形'],
                    ['/series/Text', 'Text - 文本'],
                ]
            },
            {
                title: '通用对象',
                collapsable: false,
                children: [
                    ['/common/lineStyle', 'lineStyle - 线段样式'],
                ]
            },
            {
                title: '扩展插件',
                collapsable: false,
                children: [
                    ['/utils/SaveToAlbum', 'SaveToAlbum - 保存到相册'],
                    ['/utils/Debugger', 'Debugger - 调试器'],
                ]
            },
            {
                title: '其他',
                collapsable: false,
                children: [
                    ['/other/EventListener', 'EventListener - 事件监听'],
                    ['/other/Extend', 'Extend - 扩展开发'],
                ]
            },
        ],
        sidebarDepth: 2,
    }
}
