module.exports = {
  // 基本URL
  publicPath: './',
  // 静态资源目录
  assetsDir: 'assets',
  // 生产环境的 source map
  productionSourceMap: false,
  // 全局样式
  css: {
    extract: true,
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    modules: false
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `@import "@/assets/styles/styles.scss";`
  //     }
  //   }
  // },
  // 请求代理
  devServer: {
    port: '3000',
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BaseUrl,
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        secure: false
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@common': '@/common',
        '@api': '@/api',
        '@plugin': '@/plugin',
        '@img': '@/assets/image',
        '@page': '@/page'
      }
    }
  }
}
