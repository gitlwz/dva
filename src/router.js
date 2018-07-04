import React from 'react';
import { Router, Route, Switch, routerRedux, Redirect } from 'dva/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enGB from 'antd/lib/locale-provider/en_GB';
import dynamic from 'dva/dynamic';
import { LocaleProvider } from 'antd';

import Layout from './routes/Layout';
import LayoutRouter from './utils/LayoutRouter';

const language = !!window.localStorage.getItem("language") && window.localStorage.getItem("language") == "English" ? enGB : zhCN;

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
        <LocaleProvider locale={language}>
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