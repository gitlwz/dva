import React, { Component, PropTypes } from 'react';
import style from './asset.less'
import { Row, Col, Select, Alert, Spin, Icon } from 'antd';
import AssetView from './AssetView';
import SecurityCenter from './SecurityCenter';
import CashManagement from './CashManagement';
import { connect } from 'dva';
const Option = Select.Option;

/**
 * 资产管理
 */
class Asset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftMenu: ["资产总览", "安全中心", "充提管理"]
        }

    }
    componentWillMount = () => {

    }
    callback = (key) => {
        console.log(key)
    }
    //左边menu点击事件
    leftMenuClick = (men) => {
        this.props.dispatch({
            type: 'asset/selectMenu',
            payload: {
                currentSelect: men
            }
        })
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
        if(this.props.userInfo.applyStatus == 2 && !!this.props.userInfo.identificationType){
            topError = {
                show:true,
                content:"身份验证审核中"
            }
        }
        
        return (
            <Spin size="large" spinning={this.props.loading} >
                <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                    <div style={{ display: !!topError.show && this.props.currentSelect === "安全中心" ? 'block' : "none" }} className={style.topError}>
                        {topError.content}
                    </div>
                    <div className={style.accounContent}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                <div className={style.gutter_letft}>
                                    <div className={style.left_card}>
                                        {this.state.leftMenu.map((item, index) => {
                                            let _style = style.left_item;
                                            if (item === this.props.currentSelect) {
                                                _style = _style + " " + style.left_active;
                                            }
                                            return <div onClick={() => this.leftMenuClick(item)} className={_style}>{item}</div>
                                        })}
                                    </div>
                                </div>
                            </Col>
                            <Col className="gutter-row" span={18}>
                                {this.props.currentSelect === "资产总览" && <AssetView history={this.props.history} />}
                                {this.props.currentSelect === "安全中心" && <SecurityCenter history={this.props.history} />}
                                {this.props.currentSelect === "充提管理" && <CashManagement history={this.props.history} />}
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
})(Asset);