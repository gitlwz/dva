import React from 'react';
import { Router, Route, Switch, routerRedux, Redirect } from 'dva/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import dynamic from 'dva/dynamic';
import Layout from './routes/Layout';
import LayoutRouter from './utils/LayoutRouter';

const registerModel = (app, model) => {
    //改写法存在问题，先屏蔽
    if ((app._models.filter(m => m.namespace === model.namespace).length === 1)) {
        app.model(model)
    }
    app.model(model)
}
function RouterConfig({ history, app }) {
   
    //主页
    const MainComponent = () => (
        <Layout>
            {
                LayoutRouter.map(({ path, ...dynamics }, key) => (
                    <Route
                        key={key}
                        exact
                        path={path}
                        component={dynamic({
                            app,
                            ...dynamics, // (models and) component
                        })}
                    />
                ))
            }

        </Layout>
    )

    return (
        <LocaleProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Route path="/user" component={require("./routes/user/UserLayout").default} />

                    <Route path="/" component={MainComponent} />
                </Switch>
            </Router>
        </LocaleProvider>
    );
}
export default RouterConfig;