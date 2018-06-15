
/**
 * 配置主页路由
 */
const LayoutRouter = [
    {
        path: '/home',
        models: () => [import('../models/other')],
        component: () => import('../routes/home/home'),
    }, {
        path: '/kine',
        models: () => [import('../models/kine/trade'),import('../models/other')],
        component: () => import('../routes/kine/bibi/bibi'),
    },
    {
        path: '/joinus',
        component: () => import('../routes/detail/joinus')
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
        component: () => import('../routes/helpcenter/helpcenter')
    },
    {
        path: '/searchresult',
        component: () => import('../routes/helpcenter/searchresult')
    },
    {
        path: '/helpdetail/:id',
        component: () => import('../routes/helpcenter/helpdetail')
    },
    {
        path: '/asset',  //资产管理
        models: () => [import('../models/asset')],
        component: () => import('../routes/asset/asset'),
    }
]
export default LayoutRouter;