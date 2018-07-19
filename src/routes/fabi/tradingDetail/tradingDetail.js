import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col, Spin, Button } from 'antd';
import QDModal from '../../../components/QDModal';
import "./tradingDetail.less";
import IMGTS from "../../../assets/提示@3x.png"
import TimeFormat from '../../../tool/TimeFormat'
import style from './tradingDetail.less'

const QRCode = require('qrcode.react');
/**
 * 订单详情
 */
class tradingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeRemainingFormat: null,//剩余支付时间
            sellerTimeRemainingFormat: null,//收款倒计时

            modal: {
                visible: false
            }
        }
        this.intervalName = null;
    }
    componentWillMount = () => {
        this.acknowledgeReceipt()
    }
    acknowledgeReceipt = () => {
        this.props.dispatch({
            type: "tradingDetail/acknowledgeReceipt",
            payload: {
                params: this.props.match.params.orderID,
                callback: this.loadTimer
            }
        })
    }
    //加载定时器
    loadTimer = (dataInfo) => {

        if (dataInfo.timeRemaining > 0) {
            let timeRemaining = dataInfo.timeRemaining;
            this.setState({
                timeRemainingFormat: TimeFormat(timeRemaining)
            })

            this.intervalName1 = setInterval(() => {
                timeRemaining -= 1;
                this.setState({ timeRemainingFormat: TimeFormat(timeRemaining) });
                if (timeRemaining === 0) {
                    this.setState({ timeRemainingFormat: '' });
                    clearInterval(this.intervalName1);
                    setTimeout(() => {
                        this.acknowledgeReceipt()
                    }, 1000)
                }
            }, 1000);
        } else {
            clearInterval(this.intervalName1);
            this.setState({ timeRemainingFormat: '' });
        }


        if (dataInfo.sellerTimeRemaining > 0) {
            let sellerTimeRemaining = dataInfo.sellerTimeRemaining;
            this.setState({
                sellerTimeRemaining: TimeFormat(sellerTimeRemaining)
            })

            this.intervalName = setInterval(() => {
                sellerTimeRemaining -= 1;
                this.setState({ sellerTimeRemainingFormat: TimeFormat(sellerTimeRemaining) });
                if (sellerTimeRemaining === 0) {
                    this.setState({ sellerTimeRemainingFormat: '' });
                    clearInterval(this.intervalName);
                    setTimeout(() => {
                        this.acknowledgeReceipt()
                    }, 1000)
                }
            }, 1000);
        } else {
            clearInterval(this.intervalName);
            this.setState({ sellerTimeRemainingFormat: '' });
        }
    }
    loadStateButton = () => {
        //判断是买方还是卖方
        let isBuy = false;
        let { clientID, dataInfo } = this.props;
        //该情况是处理自己买自己卖的行为
        if (clientID == dataInfo.clientID && clientID == dataInfo.tradingID) {
            switch (dataInfo.state) {
                case "0":
                    return <div>
                        <Button onClick={() => this.changModal({
                            showMOdal: true,
                            title: "如果您已经向卖家付款,请千万不要取消交易",
                            msg: "取消规则:如果买方累计取消次数达" + dataInfo.cancelTime + "次,将会被限制买入功能",
                            okText: '取消订单',
                            canCelText: '我再想想',
                            header: '确定取消订单?'
                        })}>取消交易
                        </Button>
                        <Button type="primary" onClick={() => this.changModal({
                            showMOdal: true,
                            title: "请确认您已向卖家付款",
                            msg: "恶意点击将直接冻结账户",
                            okText: '确定付款',
                            canCelText: '取消',
                            header: '确定付款'
                        })}>我已付款
                        </Button>
                    </div>
                    break;
                case "1":
                    return <Button className={style.confirmButton} type="primary" onClick={() => this.changModal({
                        showMOdal: true,
                        title: "已确定收到买家付款",
                        okText: '确定收款',
                        canCelText: '取消',
                        header: '确定收款?'
                    })}>确认收款</Button>
                    break;
                case "2":
                    return <div>已完成</div>
                    break;
                default:
                    break;
            }
            return;

        }
        //正常流程
        if (clientID == dataInfo.clientID) {
            if (dataInfo.businessType == "0") {
                isBuy = true
            }
        } else {
            if (dataInfo.businessType == "1") {
                isBuy = true
            }
        }

        if (isBuy == true) {
            switch (dataInfo.state) {
                case "0":
                    return <div>
                        <Button onClick={() => this.changModal({
                            showMOdal: true,
                            title: "如果您已经向卖家付款,请千万不要取消交易",
                            msg: "取消规则:如果买方累计取消次数达" + dataInfo.cancelTime + "次,将会被限制买入功能",
                            okText: '取消订单',
                            canCelText: '我再想想',
                            header: '确定取消订单?'
                        })}>取消交易
                        </Button>
                        <Button
                            onClick={() => this.changModal({
                                showMOdal: true,
                                title: "请确认您已向卖家付款",
                                msg: "恶意点击将直接冻结账户",
                                okText: '确定付款',
                                canCelText: '取消',
                                header: '确定付款'
                            })}>我已付款
                        </Button>
                    </div>
                    break;
                case "1":
                    return <div>已付款,待确认</div>
                    break;
                case "2":
                    return <div>已完成</div>
                    break;
                default:
                    break;
            }
        } else {
            switch (dataInfo.state) {
                case "0":
                    <div>
                        <Button onClick={() => this.changModal({
                            showMOdal: true,
                            title: "如果您已经向卖家付款,请千万不要取消交易",
                            msg: "取消规则:如果买方累计取消次数达" + dataInfo.cancelTime + "次,将会被限制买入功能",
                            okText: '取消订单',
                            canCelText: '我再想想',
                            header: '确定取消订单?'
                        })}>取消交易
                        </Button>
                        <Button
                            onClick={() => this.changModal({
                                showMOdal: true,
                                title: "请确认您已向卖家付款",
                                msg: "恶意点击将直接冻结账户",
                                okText: '确定付款',
                                canCelText: '取消',
                                header: '确定付款'
                            })}>我已付款
                        </Button>
                    </div>
                    break;
                case "1":
                    return <Button className={style.confirmButton} type="primary" onClick={() => this.changModal({
                        showMOdal: true,
                        title: "已确定收到买家付款",
                        okText: '确定收款',
                        canCelText: '取消',
                        header: '确定收款?'
                    })}>确认收款</Button>
                    break;
                case "2":
                    return <div>已完成</div>
                default:
                    break;
            }

        }

        //this.orderBuy = isBuy
    }

    loadPrompt() {

    }


    changModal = ({ showMOdal, title, okText, canCelText, header, msg }) => {
        this.setState({
            modal: {
                visible: showMOdal,
                okText: okText,
                canCelText: canCelText,
                title: header,
                content: title,
                msg: msg
            }
        })
    }
    sendOk = () => {
        this.setState({
            modal: {
                visible: false
            }
        })
        this.acknowledgeReceipt()
    }
    //弹框确定事件
    onOk = () => {
        let { dataInfo } = this.props;
        //点击付款
        switch (this.state.modal.okText) {
            case "取消订单":
                this.props.dispatch({
                    type: "tradingDetail/buyerPayment",
                    payload: {
                        params: [dataInfo.orderID, '1', '0', ''],
                        callback: this.sendOk
                    }
                })
                break;
            case "确定付款":
                this.props.dispatch({
                    type: "tradingDetail/buyerPayment",
                    payload: {
                        params: [dataInfo.orderID, '0', '0', ''],
                        callback: this.sendOk
                    }
                })
                break;
            case "确定收款":
                this.props.dispatch({
                    type: "tradingDetail/collection",
                    payload: {
                        params: [dataInfo.orderID, ''],
                        callback: this.sendOk
                    }
                })
                break;

            default:
                break;
        }
    }
    onCancel = () => {
        this.setState({
            modal: {
                visible: false
            }
        })
    }
    render() {
        let { state } = this.props.dataInfo;
        let stateTitle = null;
        switch (state) {
            case "0":
                stateTitle = "待付款"
                break;
            case "1":
                stateTitle = "确认收款"
                break;
            case "2":
                stateTitle = "已完成"
                break;
            case "3":
                stateTitle = "已取消"
                break;
            default:
                break;
        }
        return (
            <div className="tradingDetail" style={{ backgroundColor: "#F7F7F7" }}>
                <Spin spinning={this.props.loading} size="large" >
                    <div className="de_content">
                        <div className="de_title">
                            <span>{this.props.dataInfo.businessType == "0" ? "买入" : "卖出"}{this.props.dataInfo.currency}</span>
                            <span style={{ marginLeft: "38px" }}>编号 {this.props.dataInfo.orderID}</span>
                            <span style={{ float: "right" }}>{stateTitle}{this.props.dataInfo.state == "1" ? this.state.sellerTimeRemainingFormat : this.state.timeRemainingFormat}</span>
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
                                            <span>数&#12288;&#12288;量（{this.props.dataInfo.currency}）:</span>
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
                                                        <span>{this.props.dataInfo.nickname}</span>
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
                                                        {this.props.dataInfo.alipayAccountPhoto && <img style={{ width: 60, height: 60 }} src={this.props.dataInfo.alipayAccountPhoto} />}
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
                                                        {this.props.dataInfo.wechatAccountPhoto && <img style={{ width: 60, height: 60 }} src={this.props.dataInfo.wechatAccountPhoto} />}
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
                                                    付款参考号:{this.props.dataInfo.businessType == "0" ? "请务必备注在付款信息中,以便于收款方确认收款" : '便于收款方确认款项'}
                                                </div>
                                                <div className="box_itemlast_btn">
                                                    {this.loadStateButton()}
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
                            {this.props.dataInfo.businessType == "0" ?
                                <div>
                                    <p>1、您的汇款将直接进入买方账户，交易过程中卖方出售的数字资产由平台托管保护。</p>
                                    <p>2、请在规定时间内完成付款，并务必点击“我已付款”，卖方确认收款后，系统会将数字资产划转到您的账户。</p>
                                    <p>3、如果买方当日取消订单达3次，将会被限制当日的买入功能。</p>
                                </div> :
                                <div>
                                    <p>1、您的数字资产由平台托管保护,买方直接汇入您的账户。</p>
                                    <p>2、请在规定时间内完成收款,并务必点击"确认收款",如没有收到款,请联系客服4000-0000-1234</p>
                                </div>
                            }


                        </div>
                        <QDModal
                            visible={this.state.modal.visible}
                            title={this.state.modal.title}
                            okText={this.state.modal.okText}
                            cancelText={this.state.modal.cancelText}
                            onOk={this.onOk}
                            onCancel={this.onCancel}
                        >
                            <div style={{ 'textAlign': "center", 'fontSize': "16px", color: "rgba(86,86,86,1)" }}>{this.state.modal.content}</div>
                            <div style={{ 'marginTop': '8px', 'textAlign': "center", 'fontSize': "16px", color: "rgba(255,25,0,1)" }}>{this.state.modal.msg}</div>
                        </QDModal>
                    </div>
                </Spin>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { loading, dataInfo } = state.tradingDetail
    let { clientID } = state.user.userInfo
    return {
        loading,
        dataInfo,
        clientID
    }
})(tradingDetail);