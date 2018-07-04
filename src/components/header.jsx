import React, { Component, PropTypes } from 'react';
import { Carousel } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Menu, Dropdown } from 'antd';

import logo from '../assets/yinghe/矢量智能对象@2x.png';
//import bgLogon from '../assets/yinghe/图层 1@2x.png';
import selectBg from '../assets/yinghe/圆角矩形 6@3x.png'
import languareBG from '../assets/yinghe/languare.png';
import styles from './header.less';
import languageData from '../language'
console.log("languageData--------------", languageData)
/**
 * 模块:赢和超腾导航
 * 创建时间:2018-5-24
 * 创建人:席坤
 */

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            selectMenu: window.location.hash.split("#")[1]
        }
        this.currLanguage = window.localStorage.getItem("language") || 'China';
    }
    componentDidMount() {
        this.props.getUserId()
    }

    componentWillReceiveProps(next) {
    }

    pushNewPage(pageName) {
        this.props.dispatch(routerRedux.push(pageName))
    }

    menuClick = ({ key }) => {
        switch (key) {
            case "0":
                this.props.dispatch(routerRedux.push("/asset"))
                break;
            case "1":
                this.props.dispatch(routerRedux.push("/record?type=2"))
                break;
            case "2":
                this.props.dispatch(routerRedux.push("/record?type=1"))
                break;
            case "4":
                this.props.dispatch(routerRedux.push("/asset?type=2"))
                //安全中心
                break;
            case "5":
                this.props.logout();
                //安全中心
                break;
            default:
                break;
        }
    }
    currLanguageChange = (e) => {
        let item = this.currLanguage == "China" ? "English" : "China"
        window.localStorage.setItem("language", item)
        window.location.reload();
    }
    menu() {
        return (
            <Menu onClick={this.menuClick} className="header_dropdown">
                <Menu.Item key="0">
                    <div className={styles.header_dropdown_item}>
                        <span className={styles.header_dropdown_text + " " + styles.header_dropdown_zc}>{languageData.ZCZL}</span>
                    </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">
                    <div className={styles.header_dropdown_item}>
                        <span className={styles.header_dropdown_text + " " + styles.header_dropdown_dd}>{languageData.JYJLXC}</span>
                    </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">
                    <div className={styles.header_dropdown_item}>
                        <span className={styles.header_dropdown_text + " " + styles.header_dropdown_tcb}>{languageData['CB&TB']}</span>
                    </div>
                </Menu.Item>
                <Menu.Divider />
                {/* <Menu.Item key="3">
                    <div className={styles.header_dropdown_item}>
                        <span className={styles.header_dropdown_text + " " + styles.header_dropdown_sf}>身份认证</span>
                    </div>
                </Menu.Item>
                <Menu.Divider /> */}
                <Menu.Item key="4">
                    <div className={styles.header_dropdown_item}>
                        <span className={styles.header_dropdown_text + " " + styles.header_dropdown_aq}>{languageData.AQZX}</span>
                    </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="5">
                    <div className={styles.header_dropdown_item}>
                        <span className={styles.header_dropdown_text + " " + styles.header_dropdown_tc}>{languageData.TC}</span>
                    </div>
                </Menu.Item>
            </Menu>
        )
    }

    loadMenuItem() {
        const menuArray = [{ img: require("../assets/yinghe/home.png"), title: languageData.home, url: '/home', selectImg: require("../assets/yinghe/homeSelect.png") },
        { img: require("../assets/yinghe/bibi.png"), title: languageData.BBJX, url: '/kine', selectImg: require("../assets/yinghe/bibiSelect.png") },
        { img: require("../assets/yinghe/fbjy.png"), title: "法币交易", url: '/tradingCenter', selectImg: require("../assets/yinghe/fbjy_active.png") },
        { img: require("../assets/yinghe/notice.png"), title: languageData.PTGG, url: '/platform', selectImg: require("../assets/yinghe/noticeSelect.png") },
        { img: require("../assets/yinghe/help.png"), title: languageData.BZZX, url: '/helpcenter', selectImg: require("../assets/yinghe/helpSelect.png") }]
        return <div style={{ display: "flex", flexDirection: 'row' }}>
            {menuArray.map((item, index) => {
                return <div className={styles.text} onClick={() => {
                    this.setState({ selectMenu: item.url });
                    this.pushNewPage(item.url)
                }} key={item.title} >
                    <img src={this.state.selectMenu == item.url ? item.selectImg : item.img} style={{ width: 21, height: 21 }} />
                    <span style={{ color: this.state.selectMenu == item.url ? "#FECC39" : '' }}>{item.title}</span>
                </div>
            })}
        </div>
    }

    // 渲染
    render() {
        const dataJSON = {}
        return (
            <div className={styles.headerNa}>
                <div className={styles.leftNav}>
                    <img src={logo} />
                    {this.loadMenuItem()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 50 }}>
                    {this.props.userId == null ?
                        <div>
                            <span style={{ borderRight: '1px solid rgba(86,86,86,1)', padding: '0 20px' }} onClick={() => this.pushNewPage("/user/login")}>{languageData.Login}</span>
                            <span style={{ padding: '0 20px' }} onClick={() => this.pushNewPage("/user/regis")}>{languageData.signIn}</span>
                        </div> :
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={selectBg} style={{ margin: '0 10px', width: 40 }} onClick={() => {
                                if (this.props.userId) {
                                    this.pushNewPage("/home")
                                } else {
                                    this.pushNewPage("/user/login")
                                }
                            }} />
                            <Dropdown overlay={this.menu()}>
                                <span style={{ padding: '0 20px' }}>{this.props.userId}</span>
                            </Dropdown>


                        </div>
                    }
                    <div className={styles.language}>
                        <img src={languareBG} style={{ marginRight: 20, marginLeft: 10 }} />
                        <select value={this.currLanguage} onChange={this.currLanguageChange} style={{ height: "26px", border: "none", outline: 'none', fontSize: "18px" }}>
                            <option value="China">{this.currLanguage == "China" ? "中文" : 'China'}</option>
                            <option value="English">{this.currLanguage == "English" ? "English" : '英文'}</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        userId: state.user.userId,
        props
    }
}, (dispatch, props) => {
    return {
        getUserId: () => {
            dispatch({
                type: 'user/getUserId'
            })
        },
        logout: () => dispatch({
            type: 'user/logout'
        }), dispatch
    }
})(Header)