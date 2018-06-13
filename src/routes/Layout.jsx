import React from "react";
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import { routerRedux, Route, Switch, Redirect, Link } from 'dva/router';
import { connect } from 'dva';
import LayoutRouter from '../utils/LayoutRouter';
import ThemeSet from './set/setTheme';
import Footer from '../components/footer';
import styles from "./Layout.less";

class LayoutPage extends React.Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'user/findUserInfo',
            payload: [{}]
        })
    }

    getData(data) {
        console.log(data)
    }

    menuClick = ({ item, key, keyPath }) => {
        switch (key) {
            case "set":
                return this.props.save({ visible: true })
                break;
            case "yinghe":
                return this.props.pushRouter("/yinghe")
                break;
            case "kine":
                return this.props.pushRouter("/kine")
                break;
            case "regis":
                return this.props.pushRouter("/user/regis")
                break;
            case "login":
                return this.props.pushRouter("/user/login")
                break;
            case "language":
                return this.props.save({ currtLanguage: this.props.currtLanguage == "China" ? "English" : 'China' })
                break;
            default:
                break;
        }
    }

    getBashRedirect = () => {
        // According to the url parameter to redirect
        // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
        const urlParams = new URL(window.location.href);
        const redirect = urlParams.hash.split("#")[1];
        // Remove the parameters in the url
        if (redirect) {
            //urlParams.searchParams.delete('redirect');
            // window.history.replaceState(null, 'redirect', urlParams.href);
        } else {
            return '/home';
        }
        return redirect;
    }

    render() {
        const { language, currtLanguage } = this.props;
        const bashRedirect = this.getBashRedirect();
        return (
            <Layout>
                <Layout.Header className={styles.Header}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className={styles.logo}></div>
                        <Row type="flex" justify="space-between" style={{ width: '100%' }} align="center">
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                onClick={this.menuClick}
                                defaultSelectedKeys={[bashRedirect]}
                                style={{ lineHeight: '80px' }}
                            >
                                <Menu.Item key="yinghe"> <Icon type="home" />主页</Menu.Item>
                                <Menu.Item key="kine">币币交易</Menu.Item>
                                <Menu.Item key="home"><Icon type="sound" />平台公告</Menu.Item>
                                <Menu.Item key="help">帮助中心</Menu.Item>
                            </Menu>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                onClick={this.menuClick}
                                style={{ lineHeight: '80px' }}
                            >
                                <Menu.Item key="user"><Icon type="user" />席坤</Menu.Item>
                                <Menu.Item key="login">登陆</Menu.Item>
                                <Menu.Item key="regis">注册</Menu.Item>
                                <Menu.Item key="set"> <Icon type="setting" /></Menu.Item>
                                <Menu.Item key="language">{this.props.currtLanguage == "China" ? "English" : '简体中文'}</Menu.Item>
                            </Menu>
                        </Row>
                    </div>
                </Layout.Header>
                <ThemeSet />
                <Layout.Content style={{ minHeight: 700, background: "rgb(247, 247, 247)" }}>
                    {this.props.children}
                </Layout.Content>
                <Layout.Footer style={{ padding: 0, margin: 0 }}>
                    <Footer />
                </Layout.Footer>
                {/* background-color: rgba(32,38,55,1); */}
                {this.props.theme == "dark" ?
                    <style>
                        {
                            `
                            .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected{
                                background-color:#001529;
                                color: #7a98f7;
                                font-size:16px
                            }
                            .ant-layout-content{
                               
                                height: 100%;
                                width: 100%;
                                color:white !important;
                            }
                              `
                        }
                    </style> :
                    <style>
                        {
                            `
                            .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected{
                                background-color:#001529;
                                color: #7a98f7;
                                font-size:16px
                            }
                            .ant-layout-content{
                                background-color: white;
                                height: 100%;
                                width: 100%;
                                color:black !important
                            }
                    `
                        }
                    </style>}
            </Layout>
        )
    }
}

export default connect((state, props) => {
    return {
        visible: state.app.visible,
        theme: state.app.theme,
        language: state.app.language,
        currtLanguage: state.app.currtLanguage,
        props
    }
}, (dispatch, props) => {
    return {
        save: (parme) => {
            dispatch({
                type: 'app/save',
                payload: {
                    ...parme
                }
            })
        },
        pushRouter: (url) => {
            // if (props.location.pathname == url) {
            //     return;
            // }
            dispatch(routerRedux.push(url))
        },
        dispatch,
        props
    }
})(LayoutPage)
