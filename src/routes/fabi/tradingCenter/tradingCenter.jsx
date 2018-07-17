import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Spin, Button, message, Input, InputNumber } from 'antd';
import IMG from "../../../assets/tradingCenter.png"
import IMG2 from "../../../assets/买入@3x.png";
import IMG3 from "../../../assets/卖出2@3x.png";
import IMGWX from "../../../assets/微信@3x.png";
import IMGZFB from "../../../assets/支付宝@3x.png";
import IMGCAED from "../../../assets/card.png"
import "./tradingCenter.less"
import QDModal from "../../../components/QDModal"
/**
 * 法币交易中心
 */
class tradingCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "1",
            currencys: "",

            visible: false,
            currentItem: {},

            modalData: {}

        }
        this.columns = [
            {
                title: '商家',
                dataIndex: 'nickName'
            }, {
                title: '币种',
                dataIndex: 'currency',
            }, {
                title: '数量',
                dataIndex: 'surplusVolumeStr',
            },
            {
                title: '单价',
                dataIndex: 'price',
                render: (item) => {
                    return <span>{item}CNY</span>
                }
            },
            {
                title: '最小交易量',
                dataIndex: 'limitVolumeStr',
            },
            {
                title: '单笔交易区间',
                dataIndex: 'tradingRange',
            },
            {
                title: '支付方式',
                dataIndex: 'shouxufei',
                render: (item, record, index) => {
                    return <div className="payment">
                        {record.bankAccountID != null ?
                            <img src={IMGCAED} /> : null}
                        {record.wechatAccount != null ?
                            <img src={IMGWX} /> : null}
                        {record.alipayAccount != null ?
                            <img src={IMGZFB} /> : null}
                    </div>
                }
            },

            {
                title: '操作',
                dataIndex: 'action',
                render: (item, record, index) => {
                    return <div className="payment">
                        {record.postersType == "1" ?
                            <Button type="primary" onClick={(ev) => this.buyBtc(ev, record)}>我要买</Button> :
                            <Button type="primary" onClick={(ev) => this.buyBtc(ev, record)}>我要卖</Button>}
                    </div>
                },
            }
        ]
    }
    componentWillMount = () => {
        // this.props.dispatch({
        //     type: "tradingCenter/findAllCurrencys",
        // })
        this.props.dispatch({
            type: "tradingCenter/findByBiddingPosters",
        })
        this.PaginationChange(1, 10);
    }
    //
    buyBtc = (ev, item) => {
        if (item.surplusVolume < item.limitVolume) {
            message.error("当前可交易数量不足!");
            return
        }

        const { Bidding } = this.props;
        if (!Bidding.nickname || !Bidding.accountPassword) {
            message.error("请先设置昵称和资金密码!")
            return;
        }
        let title = null;
        if (item.postersType == "1") {
            title = "买入" + item.currency
        } else {
            title = "卖出" + item.currency
        }
        this.setState({
            visible: true,
            title,
            currentItem: item,
            modalData: {
                password: ""
            }
        })
    }
    modalOk = () => {
        if (!this.state.modalData.surplusVolume) {
            message.info("数量不能为空！")
            return
        }
        if (this.state.modalData.surplusVolume < this.state.currentItem.limitVolume * 1) {
            message.error("不能小于最小交易数量" + this.state.currentItem.limitVolume);
            return;
        }
        if (!this.state.modalData.money) {
            message.info("金额不能为空！")
            return
        }
        if (this.state.currentItem.postersType != 1 && !this.state.modalData.password) {
            message.info("请输入资金密码！")
            return
        }
        this.props.dispatch({
            type: "tradingCenter/fiatDetails",
            payload: [this.state.currentItem.postersID, this.state.modalData.money + "", this.state.modalData.surplusVolume + "", this.state.modalData.password + ""]
        })
    }
    modalCancel = () => {
        this.setState({
            visible: false
        })
    }
    //买卖点击
    selectClick = (key) => {
        this.setState({
            key
        }, () => {
            this.PaginationChange(1, 10);
        })
    }
    //交易类型点击
    currencysClick = (currencys) => {
        this.setState({
            currencys
        }, () => {
            this.PaginationChange(1, 10);
        })
    }
    //页码变化
    PaginationChange = (current, pageSize) => {
        this.props.dispatch({
            type: "tradingCenter/findBiddingPosters",
            payload: [this.state.currencys, this.state.key, {
                pageSize,
                pageNo: current
            }]
        })
    }
    //数字变化
    numChange = (surplusVolume) => {
        this.setState({
            modalData: {
                ...this.state.modalData,
                surplusVolume,
                money: this.state.currentItem.price * surplusVolume
            }
        })
    }
    //金额变化
    moneyChange = (money) => {
        this.setState({
            modalData: {
                ...this.state.modalData,
                money,
                surplusVolume: money / this.state.currentItem.price
            }
        })
    }
    //资金密码
    passwordChange = (e) => {
        e.target.type = "password";
        this.setState({
            modalData: {
                ...this.state.modalData,
                password: e.target.value,
            }
        })
    }
    render() {
        return (
            <div className="tradingCenter" style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <Spin spinning={this.props.loading} size="large" >
                    <div className="tr_gg">
                        <img style={{ marginTop: '-1px' }} src={IMG} alt="" />
                        <span>
                            公告：「重要通知」关于大宗交易区用户审核优化的通知
                        </span>
                    </div>
                    <div className="tr_content">
                        <div className="tr_select">
                            <div onClick={() => this.selectClick('1')} className={this.state.key == 1 ? "active" : ""}><img src={IMG2} />我要买</div>
                            <div onClick={() => this.selectClick('0')} className={this.state.key == 0 ? "active" : ""}><img src={IMG3} />我要卖</div>
                        </div>
                        <div className="tr_neck">
                            <div className={this.state.currencys === "" ? "active" : ""} onClick={() => this.currencysClick("")}>
                                全部
                            </div>
                            {this.props.AllCurrencys.map(ele => {
                                return (
                                    <div key={ele} className={this.state.currencys === ele ? "active" : ""} onClick={() => this.currencysClick(ele)}>{ele}</div>
                                )
                            })}
                        </div>
                        <div style={{ backgroundColor: "#ffffff" }}>
                            <Table
                                dataSource={this.props.dataSource}
                                rowKey="id"
                                columns={this.columns}
                                pagination={{
                                    current: this.props.current,
                                    total: this.props.total,
                                    pageSize: this.props.pageSize,
                                    onChange: this.PaginationChange
                                }}
                            />
                        </div>
                        <QDModal
                            visible={this.state.visible}
                            title={this.state.title}
                            onOk={this.modalOk}
                            onCancel={this.modalCancel}
                        >
                            <div style={{ padding: "0 40px" }}>
                                <div className="tr_item">

                                    <div>交易价格</div>
                                    <div>
                                        <Input disabled value={this.state.currentItem.price} />
                                    </div>
                                </div>

                                <div className="tr_item">
                                    <div>数量</div>
                                    <div >
                                        <InputNumber min={this.state.currentItem.limitVolumeStr * 1 || 0} className="tr_InputNumber" onChange={this.numChange} value={this.state.modalData.surplusVolume} max={this.state.currentItem.surplusVolume} />
                                        <span onClick={() => {
                                            this.numChange(this.state.currentItem.surplusVolume)
                                        }} className="tr_qb">全部</span>
                                    </div>
                                    <div style={{ float: "right" }}>
                                        (最小交易量：{this.state.currentItem.limitVolumeStr + " " + this.state.currentItem.currency})
                                    </div>
                                </div>
                                <div className="tr_item">
                                    <div>金额</div>
                                    <div>
                                        <InputNumber min={0} className="tr_InputNumber" max={this.state.currentItem.surplusVolume * this.state.currentItem.price} value={this.state.modalData.money} onChange={this.moneyChange} />
                                        <span className="tr_name">CNY</span>
                                    </div>
                                </div>
                                {
                                    this.state.currentItem.postersType != 1 &&
                                    <div className="tr_item">
                                        <div>资金密码</div>
                                        <input type="password" style={{ display: 'none' }} />
                                        <div>
                                            <Input type="text" value={this.state.modalData.password} onChange={this.passwordChange} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </QDModal>
                    </div>
                </Spin>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { loading, AllCurrencys, Bidding, current, total, pageSize, dataSource } = state.tradingCenter
    return {
        loading,
        AllCurrencys,
        current,
        total,
        pageSize,
        dataSource,
        Bidding
    }
})(tradingCenter);