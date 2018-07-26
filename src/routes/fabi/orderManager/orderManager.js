import React, { Component, PropTypes } from 'react';
import style from './orderManager.less'
import { connect } from 'dva';
import { Row, Col, Spin } from 'antd';
import MyDeity from './MyDeity';  //我的发布
import MyOrder from './MyOrder'; // 我的订单
import language from '../../../language'
/**
 * 订单管理
 */
class orderManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftMenu: ["我的订单", "我的发布"],
            currentSelect: "我的订单"
        }
    }
    componentWillMount = () => {
        let currentSelect = window.location.href.split("=")[1];
        if (!!currentSelect && currentSelect == 2) {
            this.setState({ currentSelect: "我的发布" })
        }
    }
    callback = (key) => {
        console.log(key)
    }
    //左边menu点击事件
    leftMenuClick = (men) => {
        this.setState({
            currentSelect: men
        })
    }
    render() {
        return (
            <Spin size="large" spinning={this.props.loading} >
                <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                    <div className={style.accounContent}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                <div className={style.gutter_letft}>
                                    <div className={style.left_card}>
                                        <div className={style.nav_title}>{language.tradingCenter.DDGL}</div>
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
                                {this.state.currentSelect === "我的订单" && <MyOrder key="2" history={this.props.history} />}
                                {this.state.currentSelect === "我的发布" && <MyDeity key="1" history={this.props.history} />}
                            </Col>
                        </Row>
                    </div>
                </div>
            </Spin>

        )
    }
}
export default connect((state, props) => {
    let { loading } = state.orderManager
    return {
        loading
    }
})(orderManager);