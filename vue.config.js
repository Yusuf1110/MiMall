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
    }
}