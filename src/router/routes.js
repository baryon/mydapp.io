export default [
    {
        path: '/',
        component: () => import('layouts/default'),
        children: [
            {path: '', component: () => import('pages/index')}
        ]
    },

    // 英文以太主页
    {
        path: '/dev',
        component: () => import('layouts/default'),
        children: [
            {path: 'platform', name: 'platform', component: () => import('pages/dev/platform-detection')},
            {path: 'signMessage', name: 'signMessage', component: () => import('pages/dev/signMessage')},
            {path: 'signPersonalMessage', name: 'signPersonalMessage', component: () => import('pages/dev/signPersonalMessage')},
            {path: 'signTypedMessage', name: 'signTypedMessage', component: () => import('pages/dev/signTypedMessage')},
            {path: 'signTransaction', name: 'signTransaction', component: () => import('pages/dev/signTransaction')},
            {path: 'sendTransaction', name: 'sendTransaction', component: () => import('pages/dev/sendTransaction')}
        ]
    },
    /*
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
    */
    // { // Always leave this as last one
    //   path: '*',
    //   redirect: '/index/eth/en'
    // }
    { // Always leave this as last one
        path: '*',
        component: () => import('pages/error404')
    }
]
