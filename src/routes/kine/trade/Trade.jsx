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
    formatNum(value) {
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

        console.log(volumeTotalOriginal)
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
        }
        this.props.dispatch({
            type: 'trade/orderInsert',
            payload: {
                orderData: orderData,
                callback: (data) => {
                    if (direction == "0") {
                        message.success("委托买入成功!");
                        //委托成功后查询委托列表
                        this.props.dispatch({
                            type: 'trade/queryOrderForClient',
                            payload: [userId, currentInstrument, { "pageNo": 1, "pageSize": 10 }]
                        })
                    } else {
                        message.success("委托卖出成功!")
                        this.props.dispatch({
                            type: 'trade/queryOrderForClient',
                            payload: [userId, currentInstrument, { "pageNo": 1, "pageSize": 10 }]
                        })
                    }
                }
            }
        })
    }

    render() {
        const marks = {
            0.1: 0,
            26.5: 26,
            37.55: 37,
            100.6: {
                style: {
                    color: 'white',
                },
                label: <strong>1000</strong>,
            },
        };
        const { buyPrice, buyVolume, sellPrice, sellVolume, sliderChange, userId, currentInstrument } = this.props;

        return <Row type="flex" justify="space-between">
            <Col span="11">
                <div style={{ marginLeft: 20 }}>
                    {userId ? <div className={styles.usable}>可用 1.5555  {currentInstrument}</div> : <LoginTooltip custStyle={{ marginTop: '14px' }} />}

                    <div className={styles.tradAction}>买入价</div>
                    <div>
                        <Input suffix={<span>{currentInstrument}</span>} value={buyPrice} onChange={e => sliderChange({ buyPrice: this.formatNum(e.target.value) })} className={styles.input} />
                        <div className={styles.fold}>≈≈ {format.multiply(buyPrice, 3.14, 2)} CNY</div>
                    </div>
                    <div className={styles.tradAction} style={{ marginTop: 35 }}>买入量</div>
                    <Input suffix={<span>{currentInstrument}</span>} value={buyVolume} onChange={e => sliderChange({ buyVolume: (this.formatNum(e.target.value)) })} className={styles.input} />
                    <Slider step={0.01} style={{ margin: '20px 0', background: 'rgba(203,229,255,0.14)' }} marks={marks} value={Number(buyVolume)} onChange={value => sliderChange({ buyVolume: value })} className={styles.input} />
                    <div className={styles.sum}>交易额 {format.multiply(buyPrice, buyVolume, 2)}</div>
                    <button className={styles.sellButton} disabled={userId ? false : true} onClick={() => this.orderInsert("0")}>买入{currentInstrument}</button>
                </div>
            </Col>

            <Col span="11">
                <div style={{ marginRight: 20 }}>
                    <div className={styles.usable}></div>
                    <div className={styles.tradAction}>卖出价</div>
                    <div>
                        <Input suffix={<span>{currentInstrument}</span>} value={sellPrice} onChange={e => sliderChange({ sellPrice: this.formatNum(e.target.value) })} className={styles.input} />
                        <div className={styles.fold}>≈≈ {format.multiply(sellPrice, 3.14, 2)} CNY</div>
                    </div>
                    <div className={styles.tradAction} style={{ marginTop: 35 }}>卖出量</div>
                    <Input suffix={<span>{currentInstrument}</span>} value={sellVolume} onChange={e => sliderChange({ sellVolume: this.formatNum(e.target.value) })} className={styles.input} />
                    <Slider step={0.01} style={{ margin: '20px 0', background: 'rgba(203,229,255,0.14)' }} marks={marks} value={Number(sellVolume)} onChange={value => sliderChange({ sellVolume: value })} />
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