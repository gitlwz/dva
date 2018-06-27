import React from "react";
import { connect } from 'dva';
import { Row, Col, Input, Slider, message } from 'antd';
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
        }
    }
    componentDidMount() {
        console.log(this.props)
    }

    //格式化数字
    formatNum(value, max) {
        if (max == 0) {
            return 0;
        }
        if (!!value && !!max && Number(value) > max) {
            value = max;
            message.error("超过最大值" + max + "请重新输入");
            return value;
        }
        return format.NumberCheck({ value: value, pointNum: 2 })
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
        }
        this.props.dispatch({
            type: 'trade/orderInsert',
            payload: {
                orderData: orderData,
                callback: (data) => {
                    if (direction == "0") {
                        message.success("委托买入成功!");
                    } else {
                        message.success("委托卖出成功!")
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
                return data["btcCount"];
            }
            return 0;
        }
        return 0;
    }

    render() {

        const { buyPrice, buyVolume, sellPrice, sellVolume, sliderChange, userId, currentInstrument, dataSource } = this.props;
        //获取可买最大数量
        const getButTotal = this.getTotal(currentInstrument.split("-")[1]);
        //获取可卖最大数量
        const getSellTotal = this.getTotal(currentInstrument.split("-")[0]);

        return <Row type="flex" justify="space-between">
            <Col span="11">
                <div style={{ marginLeft: 20 }}>
                    {userId ? <div className={styles.usable}>可用 {getButTotal}  {currentInstrument.split("-")[1]}</div> : <div className={styles.usable} > <LoginTooltip /></div>}

                    <div className={styles.tradAction}>买入价</div>
                    <div>
                        <Input suffix={<span>{currentInstrument}</span>} value={buyPrice} onChange={e => sliderChange({ buyPrice: this.formatNum(e.target.value) })} className={styles.input} />
                        <div className={styles.fold}>≈≈ {format.convertCNY(this.props.RateUseList, buyPrice, currentInstrument)}</div>
                    </div>
                    <div className={styles.tradAction} style={{ marginTop: 35 }}>买入量</div>
                    <Input suffix={<span>{currentInstrument}</span>} value={buyVolume} onChange={e => sliderChange({ buyVolume: this.formatNum(e.target.value, format.buyMax(getButTotal, buyPrice)) })} className={styles.input} />
                    <Slider step={0.01} style={{ margin: '10px 0', background: 'rgba(203,229,255,0.14)' }} max={format.buyMax(getButTotal, buyPrice)} value={Number(buyVolume)} onChange={value => sliderChange({ buyVolume: value })} className={styles.input} />
                    <Row>
                        <Col span={12}>0</Col>
                        <Col span={12} style={{ textAlign: 'right' }}>{format.buyMax(getButTotal, buyPrice)} {currentInstrument.split("-")[1]}</Col>
                    </Row>
                    <div className={styles.sum}>交易额 {format.multiply(buyPrice, buyVolume, 2)}</div>
                    <button className={styles.sellButton} disabled={userId ? false : true} onClick={() => this.orderInsert("0")}>买入 {currentInstrument}</button>
                </div>
            </Col>

            <Col span="11">
                <div style={{ marginRight: 20 }}>
                    {userId ? <div className={styles.usable}>可用 {getSellTotal} {currentInstrument.split("-")[0]}</div> : <div className={styles.usable} > <LoginTooltip /></div>}
                    <div className={styles.tradAction}>卖出价</div>
                    <div>
                        <Input suffix={<span>{currentInstrument}</span>} value={sellPrice} onChange={e => sliderChange({ sellPrice: this.formatNum(e.target.value) })} className={styles.input} />
                        <div className={styles.fold}>≈≈ {format.convertCNY(this.props.RateUseList, sellPrice, currentInstrument)}</div>
                    </div>
                    <div className={styles.tradAction} style={{ marginTop: 35 }}>卖出量</div>
                    <Input suffix={<span>{currentInstrument}</span>} value={sellVolume} onChange={e => sliderChange({ sellVolume: this.formatNum(e.target.value, format.buyMax(getSellTotal, sellPrice)) })} className={styles.input} />
                    <Slider step={0.01} style={{ margin: '10px 0', background: 'rgba(203,229,255,0.14)' }} max={format.buyMax(getSellTotal, sellPrice)} value={Number(sellVolume)} onChange={value => sliderChange({ sellVolume: value })} />
                    <Row>
                        <Col span={12}>0</Col>
                        <Col span={12} style={{ textAlign: 'right' }}>{format.buyMax(getSellTotal, sellPrice)} {currentInstrument.split("-")[0]}</Col>
                    </Row>
                    <div className={styles.sum}>交易额 {format.multiply(sellPrice, sellVolume, 2)}</div>
                    <button disabled={userId ? false : true} className={styles.buyButton} onClick={() => this.orderInsert("1")}>卖出 {currentInstrument}</button>
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
        dispatch
    }

})(Trade)