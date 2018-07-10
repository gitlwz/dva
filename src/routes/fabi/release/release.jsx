import React from "react";
import { connect } from "dva";
import { Select, Input, Button, message } from 'antd';
import Tabs from '../../../components/tabs';
import format from '../../../tool/formatNmber';
import cardGrey from '../../../assets/card-grey.png';
import card from '../../../assets/card.png';
import weixin from '../../../assets/微信@3x.png';
import weixinGrey from '../../../assets/weixin-grey.png';
import zhifubao from '../../../assets/支付宝@3x.png';
import zhifubaoGrey from '../../../assets/zhifubao-grey.png';
import styles from './release.less';

const Option = Select.Option;
//我要发布
class Release extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upNavSelected: "0",
            volume: '',
            limitVolume: '',
            password: '',
            price: '',
            currency: "",

            cardImgSelected: cardGrey,
            weixinImgSelected: weixinGrey,
            zhifubaoImgSelected: zhifubaoGrey,

            bankAccountID: null,
            alipayAccount: null,
            wechatAccount: null,

            disabled: false
        }
    }

    componentWillMount() {
        let postersID = window.location.href.split("=")[1];
        if (postersID != undefined) {
            this.props.dispatch({
                type: 'release/findBiddingPostersByPostersID',
                payload: {
                    postersID: [postersID],
                    callback: (res) => {
                        this.setState({
                            currency: res.currency,
                            price: res.price,
                            volume: res.volume,
                            limitVolume: res.limitVolume,
                            publishState: res.postersStatus,
                            postersID: postersID
                        })
                    }
                }
            })
        }
        this.props.dispatch({
            type: 'release/findByBiddingPosters'
        });

        this.props.dispatch({
            type: 'release/findBySubBankAccount'
        })
    }

    reloadState(e, type) {
        switch (type) {
            case "volume":
                this.setState({ volume: format.NumberCheck({ value: e, pointNum: 14 }) })
                break;
            case "price":
                this.setState({ price: format.NumberCheck({ value: e, pointNum: 2 }) })
                break;
            case "limitVolume":
                this.setState({ limitVolume: format.NumberCheck({ value: e, pointNum: 14 }) })
                break;
            default:
                break;
        }
    }

    //我要买/卖支付方式
    loadPayment() {
        const { subBankAccountInfo } = this.props;
        return (
            <div>
                <p>支付方式</p>
                {subBankAccountInfo.bankAccountShow == "1" ? <img className={styles.paymentImg} src={this.state.cardImgSelected}
                    onClick={() => {
                        this.setState({
                            cardImgSelected: this.state.cardImgSelected == card ? cardGrey : card,
                            bankAccountID: this.state.bankAccountID == "bankAccountID" ? null : "bankAccountID"
                        })
                    }} /> : null}

                {subBankAccountInfo.wechatAccountShow == "1" ? <img className={styles.paymentImg} src={this.state.weixinImgSelected}
                    onClick={() => {
                        this.setState({
                            weixinImgSelected: this.state.weixinImgSelected == weixin ? weixinGrey : weixin,
                            wechatAccount: this.state.wechatAccount == "wechatAccount" ? null : "wechatAccount"
                        })
                    }} /> : null}

                {subBankAccountInfo.alipayAccountShow == "1" ? <img className={styles.paymentImg} src={this.state.zhifubaoImgSelected}
                    onClick={() => {
                        this.setState({
                            zhifubaoImgSelected: this.state.zhifubaoImgSelected == zhifubao ? zhifubaoGrey : zhifubao,
                            alipayAccount: this.state.alipayAccount == "alipayAccount" ? null : "alipayAccount"
                        })
                    }} /> : null}
            </div>
        );
    }


    //发布挂单
    saveBiddingPosters() {
        const { subBankAccountInfo, dataDetail } = this.props;
        if (this.state.volume == "" || this.state.volume == 0) {
            message.error("请输入的有效挂单数量!");
            return;
        }
        if (this.state.limitVolume == "" || this.state.limitVolume == 0) {
            message.error("请输入有效的最小交易数量!");
            return;
        }
        if (this.state.price == "" || this.state.price == 0) {
            message.error("请输入有效的价格!");
            return;
        }
        if (this.state.password == "") {
            message.error("请输入交易密码!");
            return;
        }
        if (this.state.limitVolume > this.state.volume) {
            message.error("最小交易量不能大于挂单数量!");
            return;
        }
        if (!dataDetail.nickname || !dataDetail.accountPassword) {
            message.error("请先设置昵称和资金密码!")
            setTimeout(() => {
                //FakeRouter.push("userCenter/userCenter.html");
            }, 2000)
            return;
        }
        if (!subBankAccountInfo.alipayAccount && !subBankAccountInfo.bankAccountID && !subBankAccountInfo.wechatAccount) {
            message.error("请设置支付方式!")
            return;
        }

        this.setState({ disabled: true })
        this.props.dispatch({
            type: 'release/saveBiddingPosters',
            payload: {
                body: [this.state.postersID, this.state.upNavSelected, this.state.currency, this.state.price, this.state.volume.toString(), this.state.limitVolume.toString(), this.state.password, this.state.bankAccountID, this.state.alipayAccount, this.state.wechatAccount],
                callback: (data) => {
                    this.setState({ disabled: false })
                    if (data.errorCode == 0) {
                        message.success("发布成功!")
                        this.setState({
                            volume: '',
                            limitVolume: '',
                            password: '',
                            price: '',
                            currency: "",
                        })
                        setTimeout(() => {

                        }, 2000)
                    }
                }
            }
        })
    }

    render() {
        return (
            <div style={{ background: "#F4F4F4" }}>
                <div className={styles.root}>
                    <div className={styles.header}>
                        <div className={styles.wyfb}>我要发布</div>
                        <div className={styles.wan}>认证的信息越完善，审核的速度越快哦</div>
                    </div>
                    <img src={require("../../../assets/fabi/flow1.png")} />
                    <div className={styles.content}>
                        <Tabs tab={this.state.upNavSelected == "0" ? "我要买" : "我要卖"} tabList={[{ title: '我要买', upNavSelected: "0" }, { title: "我要卖", upNavSelected: "1" }]} tabChange={item => this.setState({ upNavSelected: item.upNavSelected })} />

                        <div className={styles.Release}>
                            <p>币种</p>
                            <Select style={{ width: 387 }} value={this.state.currency} onChange={value => this.setState({ currency: value })}>
                                {this.props.currencyList.map(item => {
                                    return <Option value={item} key={item}>{item}</Option>
                                })}
                            </Select>
                            <p>数量</p>
                            <Input value={this.state.volume} onChange={e => this.reloadState(e.target.value, "volume")} />
                            <p>单价</p>
                            <Input suffix={<span>{this.state.currency}</span>} value={this.state.price} onChange={e => this.reloadState(e.target.value, "price")} />
                            <p>最小交易额</p>
                            <Input suffix={<span>{this.state.currency}</span>} value={this.state.limitVolume} onChange={e => this.reloadState(e.target.value, "limitVolume")} />

                            <div>
                                {this.loadPayment()}
                            </div>
                            <p>资金密码</p>
                            <Input placeholder="未保证您的资金安全，请输入资金密码" value={this.state.password} onChange={e => {
                                this.setState({ password: e.target.value })
                            }} />
                            <Button disabled={this.state.disabled} className={styles.btn} onClick={() => this.saveBiddingPosters()}>提交</Button>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default connect((state, props) => {
    return {
        subBankAccountInfo: state.release.subBankAccountInfo,
        releaseData: state.release.releaseData,
        currencyList: state.release.currencyList,
        dataDetail: state.release.dataDetail,
    }
})(Release);