export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {path: '', component: () => import('pages/index')}
    ]
  },

  // 中文以太主页
  {
    path: '/index/eth/zh',
    component: () => import('layouts/default'),
    children: [
      {path: '', name: 'eth-zh', component: () => import('pages/index-eth-zh')}
    ]
  },

  // 日文以太主页
  {
    path: '/index/eth/ja',
    component: () => import('layouts/default'),
    children: [
      {path: '', name: 'eth-ja', component: () => import('pages/index-eth-ja')}
    ]
  },

  // 英文以太主页
  {
    path: '/index/eth/en',
    component: () => import('layouts/default'),
    children: [
      {path: '', name: 'eth-en', component: () => import('pages/index-eth-en')}
    ]
  },

  // { // Always leave this as last one
  //   path: '*',
  //   redirect: '/index/eth/en'
  // }
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
