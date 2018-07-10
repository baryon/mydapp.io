import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({y: 0}),
  routes
})

Router.beforeEach((to, from, next) => {
  // 判断客户端参数
  // console.log(from, to)

  //   从App传过来的参数包括(均为可选项)
  //
  //   blockchain eth/eos/bch 用户端活动账号是eth还是eos，显示出来的页面应该有所区别
  //   lang en-US/zh-CN/ja-JP/... ... 用户端选择的语言，有时同浏览器缺省的语言是不同的
  //   theme white/cray/blue/black 用户端可以选择主题，如果服务器上有可以支持主题，作出切换
  //   address 0xabcdefghijk.... 用户端当前的账号地址（如果是eos也许有所不同）
  // network mainnet/testnet 目前是主网还是哪一条测试网络
  //   user lilong/testuser/... 用户端设置的用户名，方便页面作出更友好的交互

  const blockchain = to.query.blockchain || 'eth'

  if (to.path === '/') {
    // 如果没有lang参数，那么使用localStorage里设置的语言，设置为当前语言
    let lang = to.query.lang
    if (lang === undefined) {
      lang = localStorage.getItem('lang')
    } else {
      localStorage.setItem('lang', lang)
    }
    console.log(lang)

    // 如果也没有localStorage，那么判断header获取浏览器语言
    if (lang === undefined) {
      lang = navigator.language
      if (lang) {
        lang = lang.substr(0, 2)
      }
    }

    if (lang) {
      lang = lang.toLowerCase().substr(0, 2)
      console.log(lang, lang in ['en', 'ja', 'zh'])
      if (['en', 'ja', 'zh'].indexOf(lang) >= 0) {
        next({
          replace: true,
          name: `${blockchain}-${lang}`,
          query: to.query
        })
        return
      }
    }
    // 如果不是我们支持的语言，那么缺省设置为en
    next({
      replace: true,
      name: `${blockchain}-en`,
      query: to.query
    })
  } else {
    next()
  }
})

export default Router
