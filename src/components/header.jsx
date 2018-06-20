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
            userId: null,
            selectMenu: window.location.hash.split("#")[1]
        }
    }

    componentDidMount() {
        this.props.getUserId()
    }

    pushNewPage(pageName) {
        this.props.dispatch(routerRedux.push(pageName))
    }



    loadMenuItem() {
        const menuArray = [{ img: require("../assets/yinghe/home.png"), title: '主页', url: '/home', selectImg: require("../assets/yinghe/helpSelect.png") },
        { img: require("../assets/yinghe/bibi.png"), title: '币币交易', url: '/kine', selectImg: require("../assets/yinghe/bibiSelect.png") },
        { img: require("../assets/yinghe/notice.png"), title: '平台公告', url: '/Platform', selectImg: require("../assets/yinghe/noticeSelect.png") },
        { img: require("../assets/yinghe/help.png"), title: '帮助中心', url: '/helpcenter', selectImg: require("../assets/yinghe/helpSelect.png") }]
        return <div style={{ display: "flex", flexDirection: 'row' }}>
            {menuArray.map((item, index) => {
                return <div className={styles.text} onClick={() => {
                    this.setState({ selectMenu: item.url });
                    this.pushNewPage(item.url)
                }} key={item.title} >
                    <img src={this.state.selectMenu == item.url ? item.selectImg : item.img} />
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
                    {this.props.userId == "" ?
                        <div>
                            <span style={{ borderRight: '1px solid rgba(86,86,86,1)', padding: '0 20px' }} onClick={() => this.pushNewPage("/user/login")}>登录</span>
                            <span style={{ padding: '0 20px' }} onClick={() => this.pushNewPage("/user/regis")}>注册</span>
                        </div> :
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={selectBg} style={{ margin: '0 10px', width: 40 }} onClick={() => {
                                if (this.props.userId) {
                                    this.pushNewPage("/home")
                                } else {
                                    this.pushNewPage("/user/login")
                                }
                            }} />

                            <span style={{ padding: '0 20px' }}>{this.props.userId}</span>
                            <span onClick={() => this.props.logout()} style={{ marginRight: 20 }}>登出</span>
                        </div>
                    }
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