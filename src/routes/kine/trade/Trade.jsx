import React from "react";
import { connect } from 'dva';
import { Row, Col, Input, Slider, Button } from 'antd';
import WSClient from '../../../services/WSClient';
import webSocket from '../../../services/webSocketConfig';
import subscribeSet from '../../../services/subscribeSet';
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
        // WSClient.addEventListenerTradeDetail(subscribeSet.Topic_tradeDetail + "KOG-CNHE");
        // webSocket.emitter.on(subscribeSet.Topic_tradeDetail, (data) => {
        //     console.log(data)
        // })
    }

    render() {
        const marks = {
            0: 0,
            26: 26,
            37: 37,
            100: {
                // style: {
                //     color: '#f50',
                // },
                label: <strong>100BTC</strong>,
            },
        };
        const { buyData, sellData, sliderChange, userInfo } = this.props;

        return <Row type="flex" justify="space-between">
            <Col span="11">
                <div style={{ marginLeft: 20 }}>
                    <div className={styles.usable}>可用 1.5555BTC</div>
                    <div className={styles.tradAction}>买入价</div>
                    <div>
                        <Input suffix={<span>USDT</span>} value={buyData.price} onChange={e => sliderChange({ buyData: { price: e.target.value } })} className={styles.input} />
                        <div className={styles.fold}>≈≈3999 CNY</div>
                    </div>
                    <div className={styles.tradAction} style={{ marginTop: 35 }}>买入量</div>
                    <Input suffix={<span>ZEC</span>} value={buyData.volume} onChange={e => sliderChange({ buyData: { volume: e.target.value } })} className={styles.input} />
                    <Slider style={{ margin: '20px 0', background: 'rgba(203,229,255,0.14)' }} marks={marks} value={buyData.volume} onChange={value => sliderChange({ buyData: { volume: value } })} className={styles.input} />
                    <div className={styles.sum}>交易额0.11111111</div>
                    <button className={styles.sellButton} disabled={userInfo.name ? false : true}>买入BTC</button>
                </div>
            </Col>

            <Col span="11">
                <div style={{ marginRight: 20 }}>
                    <div className={styles.usable}>可用 1.5555BTC</div>
                    <div className={styles.tradAction}>卖出价</div>
                    <div>
                        <Input suffix={<span>USDT</span>} value={sellData.price} onChange={e => sliderChange({ sellData: { price: e.target.value } })} className={styles.input} />
                        <div className={styles.fold}>≈≈3999 CNY</div>
                    </div>
                    <div className={styles.tradAction} style={{ marginTop: 35 }}>卖出量</div>
                    <Input suffix={<span>ZEC</span>} value={sellData.volume} onChange={e => sliderChange({ sellData: { volume: e.target.value } })} className={styles.input} />
                    <Slider style={{ margin: '20px 0', background: 'rgba(203,229,255,0.14)' }} marks={marks} value={sellData.volume} onChange={value => sliderChange({ sellData: { volume: value } })} />
                    <div className={styles.sum}>交易额0.11111111</div>
                    <button disabled={userInfo.name ? false : true} className={styles.buyButton}>卖出BTC</button>
                </div>
            </Col>

        </Row>
    }
}

export default connect((state, props) => {
    return {
        buyData: state.trade.buyData,
        sellData: state.trade.sellData,
        userInfo: state.app.userInfo,
        props
    }
}, (dispatch, props) => {
    return {
        sliderChange: (parms) => {
            dispatch({
                type: 'trade/save',
                payload: {
                    ...props,
                    ...parms
                }
            })
        }
    }

})(Trade)