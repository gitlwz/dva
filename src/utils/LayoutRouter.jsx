import dynamic from 'dva/dynamic';
import app from '../index'
import { Route, Switch, Redirect } from 'dva/router';

/**
 * 配置主页路由
 */
const LayoutRouter = [
    {
        path: '/home',
        component: () => import('../routes/home/home'),
    }, {
        path: '/kine',
        models: () => [import('../models/kine/trade')],
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

]
export default LayoutRouter;