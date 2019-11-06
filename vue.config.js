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
  pages: {
    index: {
      // entry for the pages
      entry: 'src/main.js',
      // the source template
      template: 'plubic/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: '首页',
      cdn: process.env.NODE_ENV === 'development' ? {} : {
        css: "<link href='https://cdn.bootcss.com/element-ui/2.12.0/theme-chalk/index.css' rel='stylesheet'>",
        vue: "<script src='https://cdn.bootcss.com/vue/2.6.10/vue.min.js'></script>",
        router: "<script src='https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js'></script>",
        vuex: "<script src='https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js'></script>",
        axios: "<script src='https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js'></script>",
        cookie: "<script src='https://cdn.bootcss.com/js-cookie/latest/js.cookie.min.js'></script>",
        element: "<script src='https://cdn.bootcss.com/element-ui/2.12.0/index.js'></script>"

      }
      // vuex: process.env.NODE_ENV === 'development' ? '' : 'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
      // router: process.env.NODE_ENV === 'development' ? '' : 'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js'
      // chunks to include on this pages, by default includes
      // extracted common chunks and vendor chunks.
    }
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: ''
  },
  // 请求代理
  devServer: {
    port: '4000',
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
    },

    externals: process.env.NODE_ENV === 'development' ? {} : {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'vuex': 'Vuex',
      'axios': 'axios',
      'cookie': 'js-cookie'
    }
  }
}
