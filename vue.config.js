module.exports = {
    outputDir: 'serve',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: false, //是否自动弹出浏览器页面
        host: "0.0.0.0", 
        port: '8081', 
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
             '/api': {
                target: 'http://114.116.118.76:8080/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/test': {
                target: 'http://47.103.5.100/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/test': ''
                }
            }
        }
    }
}