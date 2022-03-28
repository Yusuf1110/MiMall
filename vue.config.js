module.exports = {
    devServer: {
        host: 'localhost',
        port: 8081,
        proxy: {
            '/api': { //“/api”这个是为了后面路由方便
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: { //后面会干掉它
                    '/api': ''
                }
            }

        }
    },
    productionSourceMap: false, //不需要生产环境的 source map，去除js.map文件安全且减少了包的大小
    chainWebpack: (config) => {
        config.plugins.delete('prefetch'); //消除预加载，实现真正的按需加载
    },
}