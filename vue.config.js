'use strict'

module.exports = {
    // 基础配置 详情看文档
    publicPath: process.env.NODE_ENV === 'production'
        ? '/admin/'
        : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: 8080,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            ['/api']: {
                target: 'http://localhost:22222',
                changeOrigin: true,
                pathRewrite: {
                    ['^/api']: ''
                }
            }
        },
    }
}