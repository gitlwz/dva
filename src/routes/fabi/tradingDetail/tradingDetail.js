import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col, Spin } from 'antd';
import "./tradingDetail.less";
import IMGTS from "../../../assets/提示@3x.png"
const QRCode = require('qrcode.react');
/**
 * 订单详情
 */
class tradingDetail extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount = () => {
        this.props.dispatch({
            type: "tradingDetail/acknowledgeReceipt",
            payload: this.props.match.params.orderID
        })
    }
    render() {
        return (
            <div className="tradingDetail" style={{ backgroundColor: "#F7F7F7" }}>
                <Spin spinning={this.props.loading} size="large" >
                    <div className="de_content">
                        <div className="de_title">
                            <span>{this.props.dataInfo.businessType == "0" ? "买入" : "卖出"}{this.props.dataInfo.currency}</span>
                            <span style={{ marginLeft: "38px" }}>编号 {this.props.dataInfo.orderID}</span>
                            <span style={{ float: "right" }}>3333</span>
                        </div>
                        <div style={{ marginTop: "34px" }}>
                            <Row gutter={16 + 8 * 2}>
                                <Col md={24} lg={18} xl={8}>
                                    <div className="gutter-box">
                                        <div className="box_title">
                                            订单详情
                                        </div>
                                        <div className="box_item">
                                            <span>交易金额（CNY）:</span>
                                            <span style={{ marginLeft: "20px" }}>{this.props.dataInfo.amount}</span>
                                        </div>
                                        <div className="box_item">
                                            <span>数&#12288;&#12288;量（CNY）:</span>
                                            <span style={{ marginLeft: "20px" }}>{this.props.dataInfo.number}</span>
                                        </div>
                                        <div className="box_item">
                                            <span>价&#12288;&#12288;格（CNY）:</span>
                                            <span style={{ marginLeft: "20px" }}>{this.props.dataInfo.price}</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={24} lg={18} xl={8}>
                                    <div className="gutter-box">
                                        <div className="box_title">
                                            卖家信息
                                        </div>
                                        {
                                            !!this.props.dataInfo.bankAccountID ?
                                                <div className="box_item2 card">
                                                    <div>
                                                        <span>姓名：</span>
                                                        <span>{this.props.dataInfo.realName}</span>
                                                    </div>
                                                    <div>
                                                        <span>银行信息：</span>
                                                        <span>{this.props.dataInfo.bankName}</span>
                                                    </div>
                                                    <div>
                                                        <span>卡号：</span>
                                                        <span>{this.props.dataInfo.bankAccountID}</span>
                                                    </div>
                                                </div> :
                                                <div className="box_item2 box_item22 tcard">
                                                    <div>
                                                        对方暂未添加银行卡信息
                                                </div>
                                                </div>
                                        }
                                        {!!this.props.dataInfo.alipayAccount ?
                                            <div className="box_item2 box_item22 zf">
                                                <div>
                                                    <span>{this.props.dataInfo.alipayAccount}</span>
                                                    <span className="QRCode" style={{ marginLeft: "20px" }}>
                                                        <QRCode size={60} value={this.props.dataInfo.alipayAccountPhoto} />
                                                    </span>
                                                </div>
                                            </div> :
                                            <div className="box_item2 box_item22 tzf">
                                                <div>
                                                    对方暂未添加支付宝信息
                                                </div>
                                            </div>
                                        }
                                        {!!this.props.dataInfo.wechatAccount ?
                                            <div className="box_item2 box_item22 wx">
                                                <div>
                                                    <span>{this.props.dataInfo.wechatAccount}</span>
                                                    <span className="QRCode" style={{ marginLeft: "20px" }}>
                                                        <QRCode size={60} value={this.props.dataInfo.wechatAccountPhoto} />
                                                    </span>
                                                </div>
                                            </div> :
                                            <div className="box_item2 box_item22 twx">
                                                <div>
                                                    对方暂未添加微信信息
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </Col>
                                <Col md={24} lg={18} xl={8}>
                                    <div className="gutter-box">
                                        <div className="box_title">
                                            付款信息
                                    </div>
                                        <div className="box_item">
                                            <span>付款参考号：</span>
                                            <span style={{ marginLeft: "20px" }}>{this.props.dataInfo.payment}</span>
                                        </div>
                                        <div className="box_item">
                                            <div className="box_itemlast">
                                                <div>
                                                    付款参考号，请务必备注在付款信息中 以便于收款方确认收款
                                            </div>
                                                <div>
                                                    已付款，待确认
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="de_footer">
                            <div>
                                <img src={IMGTS} />
                                <span style={{ marginLeft: "8px" }}>交易提示：</span>
                            </div>
                            <div>
                                <p>1、您的汇款将直接进入买方账户，交易过程中卖方出售的数字资产由平台托管保护。</p>
                                <p>2、请在规定时间内完成付款，并务必点击“我已付款”，卖方确认收款后，系统会将数字资产划转到您的账户。</p>
                                <p>3、如果买方当日取消订单达3次，将会被限制当日的买入功能。</p>
                            </div>

                        </div>

                    </div>
                </Spin>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { loading, dataInfo } = state.tradingDetail
    return {
        loading,
        dataInfo
    }
})(tradingDetail);