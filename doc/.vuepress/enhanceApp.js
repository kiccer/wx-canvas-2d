export default ({
    router
}) => {
    // 路由切换事件处理
    router.beforeEach((to, from, next) => {
        // console.log('切换路由', to.fullPath, from.fullPath)

        //发送 cnzz 的 pv 统计
        if (typeof _czc !== 'undefined') {
            if (to.path) {
                _czc.push(['_trackPageview', to.fullPath, from.fullPath])
                // console.log('上报cnzz统计', to.fullPath)
            }
        }

        // continue
        next()
    })
}
