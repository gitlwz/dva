
/**
 * 配置主页路由
 */
const LayoutRouter = [
    {
        path: '/home',
        models: () => [import('../models/kine'), import('../models/asset'), import('../models/other')],
        component: () => import('../routes/home/yinghe'),
    }, {
        path: '/kine',
        models: () => [import('../models/kine/trade'), import('../models/kine'), import('../models/asset'), import('../models/other')],
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
    }, {
        path: '/otherRecharge/:type',  //其他货币充值
        models: () => [import('../models/otherRecharge')],
        component: () => import('../routes/otherRecharge/otherRecharge'),
    }, {
        path: '/reopenGoogle/:name',  //谷歌验证开启页
        models: () => [import('../models/reopenGoogle')],
        component: () => import('../routes/reopenGoogle/reopenGoogle'),
    }, {
        path: '/smSverification',  //其他货币充值
        models: () => [import('../models/smSverification')],
        component: () => import('../routes/smSverification/smSverification'),
    },
    {
        path: '/record',  //
        models: () => [import('../models/record')],
        component: () => import('../routes/recordSearch/recordSearch'),
    }, {
        path: '/smSverification',  //短信验证开启页
        models: () => [import('../models/smSverification')],
        component: () => import('../routes/smSverification/smSverification'),
    },
    {
        path: '/setMoneyPassword',  //修改资金密码页
        models: () => [import('../models/setMoneyPassword')],
        component: () => import('../routes/setMoneyPassword/setMoneyPassword'),
    },{
        path: '/submitMessage',  //身份证验证
        models: () => [import('../models/submitMessage')],
        component: () => import('../routes/submitMessage/submitMessage'),
    },{
        path: '/submitMessageForeign',  //护照证验证
        models: () => [import('../models/submitMessageForeign')],
        component: () => import('../routes/submitMessageForeign/submitMessageForeign'),
    },{
        path: '/submitMessageCompany',  //机构
        models: () => [import('../models/submitMessageCompany')],
        component: () => import('../routes/submitMessageCompany/submitMessageCompany'),
    },{
        path: '/otherPresent/:type',  //机构
        models: () => [import('../models/otherPresent')],
        component: () => import('../routes/otherPresent/otherPresent'),
    }
]
export default LayoutRouter;
