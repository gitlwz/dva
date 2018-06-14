/**
 * 配置用户路由
 */
const UserRouter = [
    {
        path: '/user/login',
        component: () => import('../routes/user/login'),
    }, {
        path: '/user/regis',
        component: () => import('../routes/user/regis'),
    }
]
export default UserRouter;