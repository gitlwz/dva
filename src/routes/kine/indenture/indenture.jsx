import React from "react";
import { connect } from 'dva';
import { Row, Col } from 'antd';
import TradeComponent from '../../../components/tradDetail';
import CalculateFunc from '../../../tool/CalculateFunc';
import styles from './indenture.less';

/**
 * 模块:全部市场  合约
 */
class Indenture extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            currency: "USDT",//默认选中的货币对
            dataSource: []
        }
    }
    componentDidMount() {
        let dataSource = []
        for (let i = 0; i < 10; i++) {
            dataSource.push({ indenture: 'BTC', price: Math.random(1000).toFixed(2), rose: Math.random().toFixed(2) })
        }
        this.setState({ dataSource })
    }


    loadCurrencys() {
        const currencys = ["USDT", "BTC", "ETH"];
        return <div>{currencys.map(item => {
            return <span className={styles.currency} style={{ marginRight: '20px', borderBottom: this.state.currency == item ? '2px solid rgb(120, 173, 255)' : '' }} onClick={() => this.setState({ currency: item })} key={item}>{item}</span>
        })}
        </div>
    }

    render() {
        return <div className={styles.root}>
            <Row type="flex" justify="space-between">
                <Col>{this.loadCurrencys()}</Col>
                <Col style={{ paddingRight: 20 }}><span className={styles.currency}>自选</span></Col>
            </Row>
            <Row type="flex" style={{ margin: '10px 0' }} className={styles.header}>
                <Col className={styles.header} span={8}>币种</Col>
                <Col className={styles.header} span={8} style={{ textAlign: 'center' }}>最新价</Col>
                <Col className={styles.header} span={8} style={{ textAlign: 'right', paddingRight: 10 }}>涨幅</Col>
            </Row>
            {
                this.state.dataSource.map(item => {
                    return <Row className={styles.row} key={item.price}>
                        <Col className={styles.col} span={8}>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <img src={require("../../../assets/yinghe/形状 2@2x.png")} style={{ paddingRight: 10, alignSelf: 'center', marginTop: '-3px' }}/>
                                <span> {item.indenture}</span>
                            </div>

                        </Col>
                        <Col className={styles.col} span={8} style={{ textAlign: 'center' }}>{item.price}</Col>
                        <Col className={styles.col} span={8} style={{ textAlign: 'right', paddingRight: 10 }}>{item.rose}</Col>
                    </Row>
                })
            }

        </div>
    }
}

export default connect((state, props) => {
    return {
        props
    }
}, (dispatch, props) => {
    return {
        handleOk: (parms) => {
            dispatch({
                type: 'trade/save',
                payload: {
                    ...parms
                }
            })
        }
    }
})(Indenture)