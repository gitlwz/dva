import React, { Component, PropTypes } from 'react';
import { Carousel } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import logo from '../assets/yinghe/矢量智能对象@2x.png';
//import bgLogon from '../assets/yinghe/图层 1@2x.png';
import selectBg from '../assets/yinghe/圆角矩形 6@3x.png'
import languareBG from '../assets/yinghe/languare.png';
import styles from './header.less';

/**
 * 模块:赢和超腾导航
 * 创建时间:2018-5-24
 * 创建人:席坤
 */

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: null
        }
    }

    componentDidMount() {
        //LoginService.getUserID().then(res => this.setState({ userId: res })).catch()
    }

    pushNewPage(pageName) {
        this.props.dispatch(routerRedux.push(pageName))
    }

    logout() {
        // LoginService.userLogout().then(res => LoginService.getUserID().then(res => {
        //     this.setState({ userId: res });
        //     this.pushNewPage("yinghe/yinghe.html")
        // }).catch()).catch(error => { });
    }

    // 渲染
    render() {
        //const { dataJSON } = this.props;
        const dataJSON = {}
        return (
            <div className={styles.headerNa}>
                <div className={styles.leftNav}>
                    <img src={logo} />
                    <div style={{ display: "flex", flexDirection: 'row' }}>
                        <div className={styles.text} onClick={() => this.pushNewPage("/home")}>
                            <img src={require("../assets/yinghe/首页@2x.png")} />
                            <span>主页</span>
                        </div>
                        <div className={styles.text} onClick={() => this.pushNewPage("/kine")}>
                            <img src={require("../assets/yinghe/BB交易logo@2x.png")} />
                            <span>币币交易</span>
                        </div>
                        <div className={styles.text}>
                            <img src={require("../assets/yinghe/公告@2x.png")} />
                            <span>平台公告</span>
                        </div>
                        <div className={styles.text}>
                            <img src={require("../assets/yinghe/借贷－帮助中心@2x.png")} />
                            <span>帮助中心</span>
                        </div>

                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 50 }}>
                    {this.state.userId == null ? <div>
                        <span style={{ borderRight: '1px solid rgba(86,86,86,1)', padding: '0 20px' }} onClick={() => this.pushNewPage("yhLogin/yhLogin.html")}>登录</span>
                        <span style={{ padding: '0 20px' }} onClick={() => this.pushNewPage("/user/regis")}>注册</span>
                    </div> : <div style={{ display: 'flex', alignItems: 'center' }}>

                            <img src={selectBg} style={{ margin: '0 10px', width: 40 }} onClick={() => {
                                if (this.state.userId) {
                                    this.pushNewPage("account/account.html")
                                } else {
                                    this.pushNewPage("yhLogin/yhLogin.html")
                                }
                            }} />

                            <span style={{ padding: '0 20px' }}>{this.state.userId}</span>
                            <span onClick={() => this.logout()} style={{ paddingRight: '20' }}>退出</span>
                        </div>}
                    <div className={styles.language}>
                        <img src={languareBG} style={{ marginRight: 20, marginLeft: 10 }} />
                        <select value={this.props.currLanguage} onChange={e => console.log(e)} style={{ height: "26px", border: "none", outline: 'none', fontSize: "18px !important" }}>
                            <option value="China">{this.props.currLanguage == "China" ? "中文" : 'China'}</option>
                            {/*<option value="English">{this.props.currLanguage == "English" ? "English" : '英文'}</option>*/}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Header);