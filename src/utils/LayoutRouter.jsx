
/**
 * 配置主页路由
 */
const LayoutRouter = [
    {
        path: '/home',
        models: () => [import('../models/kine'), import('../models/asset')],
        component: () => import('../routes/home/home'),
    }, {
        path: '/kine',
        models: () => [import('../models/kine/trade'), import('../models/kine'), import('../models/asset')],
        component: () => import('../routes/kine/bibi/bibi'),
    },
    {
        path: '/joinus',
        component: () => import('../routes/detail/joinus')
    },
    {
        path: '/contactUs',
        component: () => import('../routes/detail/contactUs')
    },
    {
        path: '/stipulation',
        component: () => import('../routes/detail/Copyright')
    },
    {
        path: '/downloadclient',
        component: () => import('../routes/detail/downloadclient')
    },
    {
        path: '/yhRate',
        models: () => [import('../models/other')],
        component: () => import('../routes/detail/yhrate')
    },
    {
        path: '/helpcenter',
        models: () => [import('../models/helpcenter')],
        component: () => import('../routes/helpcenter/helpcenter')
    },
    {
        path: '/searchresult/:search',
        models: () => [import('../models/helpcenter')],
        component: () => import('../routes/helpcenter/searchresult')
    },
    {
        path: '/helpdetail/:id',
        models: () => [import('../models/helpcenter')],
        component: () => import('../routes/helpcenter/helpdetail')
    },
    {
        path: '/text',
        component: () => import('../routes/text')
    },
    {
        path: '/asset',  //资产管理
        models: () => [import('../models/asset')],
        component: () => import('../routes/asset/asset'),
    },{
        path: '/otherRecharge/:type',  //其他货币充值
        models: () => [import('../models/otherRecharge')],
        component: () => import('../routes/otherRecharge/otherRecharge'),
    }
]
export default LayoutRouter;
