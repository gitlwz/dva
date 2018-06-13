import dynamic from 'dva/dynamic';
import app from '../index'
import { Route, Switch, Redirect } from 'dva/router';

/**
 * 配置用户路由
 */
const UserRouter = [
    {
        path: '/user/login',
        component: () => import('../routes/user/newLogon'),
    }, {
        path: '/user/regis',
        component: () => import('../routes/user/regis'),
    }
]
export default UserRouter;