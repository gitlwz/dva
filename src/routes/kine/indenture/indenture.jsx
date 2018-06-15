import React from "react";
import { connect } from 'dva';
import { Row, Col } from 'antd';
import star from "../../../assets/yinghe/形状 2 副本@2x.png";
import selectStar from "../../../assets/yinghe/形状 2@2x.png";
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

    getRandomStr() {
        var result = [];
        for (var i = 0; i < 3; i++) {
            var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
            //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
            result.push(String.fromCharCode(65 + ranNum));
        }
        return result.join('');
    }
    componentDidMount() {
        let dataSource = []
        const loadData = async () => {
            await this.props.getInstrumentIds();
            console.log(this.props.instrumentIds)
        }
        loadData();
        for (let i = 0; i < this.props.instrumentIds.length; i++) {
            dataSource.push({ instrumentId: this.props.instrumentIds[i], price: Math.random(1000).toFixed(2), rose: Math.random().toFixed(2) })
        }
        this.setState({ dataSource })

        // dataSource.push({ indenture: this.getRandomStr(), price: Math.random(1000).toFixed(2), rose: Math.random().toFixed(2) })
        let checkedArray = JSON.parse(window.localStorage.getItem("instrumentIdCheck")) || [];
        //this.setState({ dataSource: checkedArray })
    }


    loadCurrencys() {
        const currencys = ["USDT", "BTC", "ETH"];
        return <div>{currencys.map(item => {
            return <span className={styles.currency} style={{ marginRight: '20px', borderBottom: this.state.currency == item ? '2px solid rgb(120, 173, 255)' : '' }} onClick={() => this.setState({ currency: item })} key={item}>{item}</span>
        })}
        </div>
    }

    checked(instrumentId) {
        let instrumentIds = this.state.dataSource;
        let checkedArray = JSON.parse(window.localStorage.getItem("instrumentIdCheck")) || [];
        // if (checkedArray.length > 0) {
        //     for (let i = 0; i < checkedArray.length; i++) {
        //         if (checkedArray[i].indenture == instrumentId) {

        //         } else {

        //         }

        //     }

        //     for (let i = 0; i < instrumentIds.length; i++) {
        //         if (instrumentId == instrumentIds[i].indenture) {
        //             instrumentIds[i]["check"] = true;
        //         }
        //     }

        // } else {
        //     checkedArray.push(instrumentIds.filter(item => item.indenture == instrumentId)[0])
        // }

        window.localStorage.setItem("instrumentIdCheck", JSON.stringify(instrumentIds));
        this.setState({ dataSource: instrumentIds })
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
                this.props.instrumentIds.map(item => {
                    return <Row className={styles.row} key={item.price}>
                        <Col className={styles.col} span={8}>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <img src={item.check == true ? selectStar : star} style={{ paddingRight: 10, alignSelf: 'center', marginTop: '-3px' }} onClick={() => this.checked(item.indenture)} />
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
        instrumentIds: state.other.instrumentIds,
        props
    }
}, (dispatch, props) => {
    return {
        getInstrumentIds: (parms) => {
            dispatch({
                type: 'other/getInstrumentIds'
            })
        }
    }
})(Indenture)