module.exports = {
    title: 'wx-canvas-2d - 2.0 使用文档',
    description: '微信小程序 canvas-2d 绘图工具，支持按需加载，支持内容配置，支持功能扩展，适配各种机型，超轻量，超易用，无需学习，直接上手。',
    dest: './doc/',
    markdown: {
        lineNumbers: true // 代码行号
    },
    themeConfig: {
        // displayAllHeaders: true,
        sidebar: {
            '/home/' : {
                title: '指南',
                children: [
                    ['index', '简介']
                ]
            }
        }
    }
}
