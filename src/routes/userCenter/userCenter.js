import React, { Component, PropTypes } from 'react';
import style from './userCenter.less';
import AssetView from '../asset/AssetView.less';
import { Row, Col, Select, Alert, Spin, Icon } from 'antd';
import SecurityCenter from './SecurityCenter';
import AccountSetting from '../fabi/accountSeting/accountSeting';
import { connect } from 'dva';
import language from '../../language'
const Option = Select.Option;
/**
 * 用户中心
 */
class UserCenter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftMenu: ["安全设置", "账户设置"],
            currentSelect: "安全设置"
        }

    }
    componentWillMount = () => {

        this.props.dispatch({
            type: 'asset/findByUserID'
        })
        this.props.dispatch({
            type: 'user/getUserId'
        })
    }
    callback = (key) => {
        console.log(key)
    }
    //左边menu点击事件
    leftMenuClick = (men) => {
        this.setState({ currentSelect: men })
    }
    render() {
        let topError = { show: false };
        if (this.props.userInfo.applyStatus <= 1) {
            topError = {
                show: true,
                content: "请先完成邮箱验证"
            }
        }
        if (this.props.userInfo.applyStatus == 2) {
            topError = {
                show: true,
                content: "请先完成身份验证"
            }
        }
        if (this.props.userInfo.applyStatus == 2 && !!this.props.userInfo.identificationType) {
            topError = {
                show: true,
                content: "身份验证审核中"
            }
        }

        if (this.props.userInfo.applyStatus == 3) {
            topError = {
                show: true,
                content: "当前未完成两步验证,为了您的资金与账号安全,请至少绑定一种手机/谷歌验证"
            }
        }
        if (this.props.userInfo.checkStatus == 3) {
            topError = {
                show: true,
                content: " 审核被驳回，请重新上传"
            }
        }

        return (
            <Spin size="large" spinning={this.props.loading} >
                <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                    <div style={{ display: !!topError.show && this.state.currentSelect === "安全设置" ? 'block' : "none" }} className={style.topError}>
                        {topError.content}
                    </div>
                    <div className={style.accounContent}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                <div className={style.gutter_letft}>
                                    <div className={style.left_card}>
                                        {this.state.leftMenu.map((item, index) => {
                                            let _style = style.left_item;
                                            if (item === this.state.currentSelect) {
                                                _style = _style + " " + style.left_active;
                                            }
                                            return <div onClick={() => this.leftMenuClick(item)} className={_style} key={item}>{item}</div>
                                        })}
                                    </div>
                                </div>
                            </Col>
                            <Col className="gutter-row" span={18}>
                                {this.state.currentSelect === "安全设置" && <SecurityCenter key="2" history={this.props.history} />}
                                {this.state.currentSelect === "账户设置" && <AccountSetting key="4" />}
                            </Col>
                        </Row>
                    </div>
                </div>
            </Spin>

        )
    }
}
export default connect((state, props) => {
    let { userInfo = {} } = state.user
    return {
        ...state.asset,
        ...props,
        userInfo
    }
})(UserCenter);