import React from "react";
import { connect } from 'dva';
import { Row, Col, Input, Slider, Button } from 'antd';
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

    }

    //格式化数字
    formatNum(value) {
        console.log(value)
        return format.NumberCheck({ value: value, pointNum: 2 })
    }

    toceshi(value) {
        console.log(value);
        return value * 1
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
                label: <strong>满了</strong>,
            },
        };
        const { buyPrice, buyVolume, sellPrice, sellVolume, sliderChange, userInfo } = this.props;

        return <Row type="flex" justify="space-between">
            <Col span="11">
                <div style={{ marginLeft: 20 }}>
                    <div className={styles.usable}>可用 1.5555BTC</div>
                    <div className={styles.tradAction}>买入价</div>
                    <div>
                        <Input suffix={<span>USDT</span>} value={buyPrice} onChange={e => sliderChange({ buyPrice: this.formatNum(e.target.value) })} className={styles.input} />
                        <div className={styles.fold}>≈≈3999 CNY</div>
                    </div>
                    <div className={styles.tradAction} style={{ marginTop: 35 }}>买入量</div>
                    <Input suffix={<span>ZEC</span>} value={buyVolume} onChange={e => sliderChange({ buyVolume: (this.formatNum(e.target.value)) })} className={styles.input} />
                    <Slider step={0.01} style={{ margin: '20px 0', background: 'rgba(203,229,255,0.14)' }} marks={marks} value={buyVolume} onChange={value => sliderChange({ buyVolume: value })} className={styles.input} />
                    <div className={styles.sum}>交易额0.11111111</div>
                    <button className={styles.sellButton} disabled={userInfo.name ? false : true}>买入BTC</button>
                </div>
            </Col>

            <Col span="11">
                <div style={{ marginRight: 20 }}>
                    <div className={styles.usable}>可用 1.5555BTC</div>
                    <div className={styles.tradAction}>卖出价</div>
                    <div>
                        <Input suffix={<span>USDT</span>} value={sellPrice} onChange={e => sliderChange({ sellPrice: this.formatNum(e.target.value) })} className={styles.input} />
                        <div className={styles.fold}>≈≈3999 CNY</div>
                    </div>
                    <div className={styles.tradAction} style={{ marginTop: 35 }}>卖出量</div>
                    <Input suffix={<span>ZEC</span>} value={sellVolume} onChange={e => sliderChange({ sellVolume: e.target.value })} className={styles.input} />
                    <Slider style={{ margin: '20px 0', background: 'rgba(203,229,255,0.14)' }} marks={marks} value={sellVolume} onChange={value => sliderChange({ sellVolume: value })} />
                    <div className={styles.sum}>交易额0.11111111</div>
                    <button disabled={userInfo.name ? false : true} className={styles.buyButton}>卖出BTC</button>
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
        userInfo: state.app.userInfo,
        props
    }
}, (dispatch, props) => {
    return {
        sliderChange: (parms) => {
            console.log(parms)
            for (const key in parms) {
                parms[key] = parms[key] * 1
            }
            dispatch({
                type: 'trade/save',
                payload: {
                    ...parms
                }
            })
        }
    }

})(Trade)