import React from "react";
import { connect } from 'dva';
import { Row, Col, Input, Slider, message, Spin } from 'antd';
import LoginTooltip from '../../../components/loginTooltip'
import format from '../../../tool/formatNmber';
import styles from './Trade.less';
/**
 * 模块:下单买卖操作
 */
class Trade extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buyloading: false,
            sellloading: false
        }
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.buyList != nextProps.buyList && this.props.currentInstrument != nextProps.currency) {
            if (this.props.setSellPrice == false) {
                if (nextProps.buyList[0] && nextProps.buyList[0].price) {
                    this.props.savePrice({ sellPrice: Number(nextProps.buyList[0].price) });
                    this.props.saveStatus({ setSellPrice: true })
                } else {
                    this.props.savePrice({ sellPrice: 0 });
                    this.props.saveStatus({ setSellPrice: true })
                }

            }
        }


        if (this.props.sellList != nextProps.sellList && this.props.currentInstrument != nextProps.currency) {
            if (this.props.setBuyPrice == false) {
                if (nextProps.sellList[nextProps.sellList.length - 1] && nextProps.sellList[nextProps.sellList.length - 1].price) {
                    this.props.savePrice({ buyPrice: Number(nextProps.sellList[nextProps.sellList.length - 1].price) });
                    this.props.saveStatus({ setBuyPrice: true })
                } else {
                    this.props.savePrice({ buyPrice: 0 });
                    this.props.saveStatus({ setBuyPrice: true })
                }
            }
        }
    }

    //格式化数字
    formatNum({ value, max, pointNum }) {
        if (max == 0) {
            return 0;
        }
        if (!!value && !!max && Number(value) > max) {
            value = max;
            message.error("超过最大值" + max + "请重新输入");
            return value;
        }
        return format.NumberCheck({ value: value, pointNum: pointNum })
    }


    //下单操作
    orderInsert(direction) {
        const { userInfo, instrumentIdData, buyPrice, buyVolume, sellPrice, sellVolume, userId, currentInstrument } = this.props;
        let orderData = {};
        let limitPrice = "";
        let volumeTotalOriginal = ""
        if (direction == "0") {
            limitPrice = buyPrice * 1;
            volumeTotalOriginal = Number(format.multiply(buyVolume, instrumentIdData.volumeDivider))
        } else {
            limitPrice = sellPrice * 1;
            volumeTotalOriginal = Number(format.multiply(sellVolume, instrumentIdData.volumeDivider))
        }
        if (direction == "0") {
            if (buyVolume == 0) {
                message.error("交易数量不能为0!")
                return;
            }
            if (buyPrice == 0) {
                message.error("交易价格不能为0!")
                return;
            }
        }
        if (direction == "1") {
            if (sellVolume == 0) {
                message.error("交易数量不能为0!")
                return;
            }
            if (sellPrice == 0) {
                message.error("交易价格不能为0!")
                return;
            }
        }

        if (userInfo && userInfo.id) {
            orderData.participantId = userInfo.clientID;
            orderData.clientId = userInfo.clientID;
            orderData.userId = userInfo.clientID;

            orderData.instrumentId = currentInstrument;
            orderData.orderPriceType = '2';
            orderData.direction = direction;
            orderData.combOffsetFlag = '0';
            orderData.combHedgeFlag = '1';
            orderData.limitPrice = limitPrice;
            orderData.volumeTotalOriginal = volumeTotalOriginal;
            orderData.timeCondition = '3';
            orderData.volumeCondition = '1';
            orderData.contingentCondition = '1';
            orderData.forceCloseReason = '0';
        } else {
            message.error("请完善个人信息!")
            return;
        }
        if (direction == "0") {
            this.setState({ buyloading: true })
        } else {
            this.setState({ sellloading: true })
        }

        this.props.dispatch({
            type: 'trade/orderInsert',
            payload: {
                orderData: orderData,
                callback: (data) => {
                    this.setState({ buyloading: false, sellloading: false })
                    if (direction == "0") {
                        if (data.errorCode == 0) {
                            message.success("委托买入成功!");
                            this.props.sliderChange({ buyVolume: 0 })
                            return
                        } else {
                            message.error("委托买入失败!")
                        }

                    } else {
                        if (data.errorCode == 0) {
                            message.success("委托卖出成功!");
                            this.props.sliderChange({ sellVolume: 0 })
                            return
                        } else {
                            message.error("委托卖出失败!")
                        }
                    }
                }
            }
        })
    }

    //获取可操作总量
    getTotal(currency) {
        if (this.props.dataSource.length > 0) {
            let data = this.props.dataSource.filter(item => item.currency == currency && item.ifTotal == false)[0];
            if (!!data) {
                return data["available"];
            }
            return 0;
        }
        return 0;
    }

    //获取对应货币小数点位数
    getDecimalsPoint(type) {
        const { decimalsPointList, currentInstrument } = this.props;
        if (decimalsPointList.length > 0) {
            let data = decimalsPointList.filter(item => item.instrumentID == currentInstrument)[0];
            if (!!data && data[type]) {
                return data[type]
            }
        }
        return 4;
    }


    //slider滑动保留小数点位数设置
    getSliderPoints(point) {
        let step = "";
        if (point > 0) {
            for (let i = 0; i < point - 1; i++) {
                step += "0"
            }
        }
        return Number("0." + step + "1");
    }

    render() {
        const { buyPrice, buyVolume, sellPrice, sellVolume, sliderChange, userId, currentInstrument, dataSource } = this.props;
        //报价货币
        let BJInstrument = currentInstrument.split("-")[0];
        //基础货币
        let JJInstrument = currentInstrument.split("-")[1];
        //获取当前计价货币资金
        let getButTotal = this.getTotal(JJInstrument);
        //获取报价货币资金
        let getSellTotal = this.getTotal(BJInstrument);

        //获取输入价格小数点位数
        let quotedDecimalNumber = this.getDecimalsPoint("quotedDecimalNumber");
        //交易货币小数位数
        let transactionQuantityDecimal = this.getDecimalsPoint("transactionQuantityDecimal");
        //获取交易金额小数位数
        let transactionAmount = Number(this.getDecimalsPoint("transactionAmount"));

        //获取当前可买数量
        const getMaxBuyTotal = format.buyMax(getButTotal, buyPrice, Number(transactionQuantityDecimal));
        return <Row type="flex" justify="space-between" style={{ color: '#565656' }}>
            <Col span="11">
                <div style={{ marginLeft: 20 }}>
                    {userId ? <div className={styles.usable}>可用 {getButTotal}  {JJInstrument}</div> : <div className={styles.usable} > <LoginTooltip /></div>}

                    <div className={styles.tradAction}>买入价</div>
                    <div>
                        <Input suffix={<span>{JJInstrument}</span>} value={buyPrice} onChange={e => sliderChange({ buyPrice: this.formatNum({ value: e.target.value, pointNum: quotedDecimalNumber }) })} className={styles.input} />
                        <div className={styles.fold}>≈ {format.convertCNY(this.props.RateUseList, buyPrice, currentInstrument)}</div>
                    </div>
                    <div className={styles.tradAction} style={{ marginTop: 35 }}>买入量</div>
                    <Input suffix={<span >{BJInstrument}</span>} value={buyVolume} onChange={e => sliderChange({ buyVolume: this.formatNum({ value: e.target.value, max: getMaxBuyTotal, pointNum: transactionQuantityDecimal }) })} className={styles.input} />
                    <Slider step={this.getSliderPoints(transactionQuantityDecimal)} style={{ margin: '10px 0' }} max={getMaxBuyTotal} value={Number(buyVolume)} onChange={value => sliderChange({ buyVolume: value })} className={styles.input} />
                    <Row>
                        <Col span={4}>0</Col>
                        <Col span={18} style={{ textAlign: 'right' }}>{getMaxBuyTotal} {BJInstrument}</Col>
                    </Row>
                    <div className={styles.sum}>交易额 {format.multiply(buyPrice, buyVolume, transactionAmount)} {JJInstrument}</div>
                    <Spin spinning={this.state.buyloading}><button loading={this.props.loading} className={styles.sellButton} disabled={userId ? false : true} onClick={() => this.orderInsert("0")}>买入 {BJInstrument}</button></Spin>
                </div>
            </Col>

            <Col span="11">
                <div style={{ marginRight: 20 }}>
                    {userId ? <div className={styles.usable}>可用 {getSellTotal} {BJInstrument}</div> : <div className={styles.usable} > <LoginTooltip /></div>}
                    <div className={styles.tradAction}>卖出价</div>
                    <div>
                        <Input suffix={<span >{JJInstrument}</span>} value={sellPrice} onChange={e => sliderChange({ sellPrice: this.formatNum({ value: e.target.value, pointNum: quotedDecimalNumber }) })} className={styles.input} />
                        <div className={styles.fold}>≈ {format.convertCNY(this.props.RateUseList, sellPrice, currentInstrument)}</div>
                    </div>
                    <div className={styles.tradAction} style={{ marginTop: 35 }}>卖出量</div>
                    <Input suffix={<span >{BJInstrument}</span>} value={sellVolume} onChange={e => sliderChange({ sellVolume: this.formatNum({ value: e.target.value, max: Number(getSellTotal), pointNum: 4 }) })} className={styles.input} />
                    <Slider step={this.getSliderPoints(transactionQuantityDecimal)} style={{ margin: '10px 0' }} max={Number(getSellTotal)} value={Number(sellVolume)} onChange={value => sliderChange({ sellVolume: this.formatNum({ value: value.toString(), max: Number(getSellTotal), pointNum: transactionQuantityDecimal }) })} />
                    <Row>
                        <Col span={4}>0</Col>
                        <Col span={18} style={{ textAlign: 'right' }}>{getSellTotal} {BJInstrument}</Col>
                    </Row>
                    <div className={styles.sum}>交易额 {format.multiply(sellPrice, sellVolume, transactionAmount)} {JJInstrument}</div>
                    <Spin spinning={this.state.sellloading}><button disabled={userId ? false : true} className={styles.buyButton} onClick={() => this.orderInsert("1")}>卖出 {BJInstrument}</button></Spin>
                </div>
            </Col>

        </Row>
    }
}

export default connect((state, props) => {
    return {
        buyPrice: state.trade.buyPrice,
        buyVolume: state.trade.buyVolume,
        sellPrice: state.trade.sellPrice,
        sellVolume: state.trade.sellVolume,
        userId: state.user.userId,
        userInfo: state.user.userInfo,
        currentInstrument: state.kine.currentInstrument,
        instrumentIdData: state.kine.instrumentIdData,
        dataSource: state.kine.dataSource,
        RateUseList: state.other.RateUseList,
        buyList: state.kine.buyList,
        sellList: state.kine.sellList,
        setSellPrice: state.kine.setSellPrice,
        setBuyPrice: state.kine.setBuyPrice,
        decimalsPointList: state.other.decimalsPointList,
        props
    }
}, (dispatch, props) => {
    return {
        sliderChange: (parms) => {
            dispatch({
                type: 'trade/save',
                payload: {
                    ...parms
                }
            })
        },
        savePrice: (parms) => {
            console.log(parms)
            dispatch({
                type: 'trade/save',
                payload: {
                    ...parms
                }
            })
        },
        saveStatus: (parms) => {
            dispatch({
                type: 'kine/save',
                payload: {
                    ...parms
                }
            })
        },
        dispatch
    }

})(Trade)