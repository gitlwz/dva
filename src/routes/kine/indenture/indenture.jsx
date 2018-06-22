import React from "react";
import { connect } from 'dva';
import { Row, Col, Spin } from 'antd';
import PubSub from "pubsub-js";
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
            currency: 'USDT',
            checkedArray: JSON.parse(window.localStorage.getItem("instrumentIdCheck")) || [],
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'kine/getInstrumentIds'
        });
        PubSub.publish('Polling.addsubscribe',
            [
                { name: "list24HVolume" },
            ]
        )
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.instrumentIds != nextProps.instrumentIds) {

        }
    }

    componentWillUnmount() {
        PubSub.publish('Polling.delsubscribe', ["list24HVolume"])
    }

    loadCurrencys() {
        const currencys = ["USDT", "BTC", "ETH"];
        return <div>{currencys.map(item => {
            return <span className={styles.currency} style={{ marginRight: '15px', borderBottom: this.state.currency == item ? '2px solid rgb(120, 173, 255)' : '' }} onClick={() => this.setState({ currency: item })} key={item}>{item}</span>
        })}
        </div>
    }

    checked(e, instrumentId) {
        e = e || window.event;
        if (e.stopPropagation) { //W3C阻止冒泡方法  
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE阻止冒泡方法  
        }
        let checkedArray = this.state.checkedArray;
        if (checkedArray.length > 0) {
            if (checkedArray.indexOf(instrumentId) > -1) {
                checkedArray.splice(checkedArray.indexOf(instrumentId), 1);
            } else {
                checkedArray.push(instrumentId);
            }
        } else {
            checkedArray.push(instrumentId);
        }
        window.localStorage.setItem("instrumentIdCheck", JSON.stringify(checkedArray));
        //window.location.reload();
        this.setState({ checkedArray: checkedArray })
    }

    //点击合约事件
    changeInstrum(instrumId) {
        this.props.dispatch({
            type: 'kine/save',
            payload: {
                currentInstrument: instrumId,
                markLoading: true
            }
        });
        if (!!this.props.userId) {
            this.props.dispatch({
                type: 'kine/findByInstrumentID',
                payload: instrumId
            })
        }
    }

    loadInstrument() {
        let dataSource = [];
        let checkedArray = this.state.checkedArray;
        for (let i = 0; i < this.props.instrumentIds.length; i++) {
            dataSource.push({ instrumentId: this.props.instrumentIds[i], price: Math.random(1000).toFixed(2), rose: Math.random().toFixed(2) })
        }

        for (let j = 0; j < checkedArray.length; j++) {
            for (let i = 0; i < dataSource.length; i++) {
                if (dataSource[i].instrumentId == checkedArray[j]) {
                    dataSource[i]["checked"] = true
                }
            }
        }
        //this.setState({ dataSource: dataSource })
        if (dataSource.length > 0)
            return dataSource.filter(item => {
                if (this.state.currency == "ZX") {
                    return item.checked == true;
                } else {
                    if (this.props.search != "") {
                        return (this.state.currency == item.instrumentId.split("-")[1] && item.instrumentId.split("-")[0].match(this.props.search))
                    } else {
                        return this.state.currency == item.instrumentId.split("-")[1]
                    }

                }
            }).map(item => {
                return <Row className={styles.row} key={item.instrumentId} onClick={() => this.changeInstrum(item.instrumentId)}>
                    <Col className={styles.col} span={8}>
                        <div style={{ display: "flex", alignItems: 'center' }}>
                            <img src={item.checked == true ? selectStar : star} style={{ paddingRight: 10, alignSelf: 'center' }} onClick={(e) => this.checked(e, item.instrumentId)} />
                            <span> {item.instrumentId.split("-")[0]}</span>
                        </div>
                    </Col>
                    <Col className={styles.col} span={8} style={{ textAlign: 'center' }}>{item.price}</Col>
                    <Col className={styles.col} span={8} style={{ textAlign: 'right', paddingRight: 10 }}>{item.rose}</Col>
                </Row>
            })


    }

    render() {
        return <div className={styles.root} style={{ height: '100%' }}>
            <Spin spinning={this.props.loading}>
                <Row type="flex" justify="space-between">
                    <Col>{this.loadCurrencys()}</Col>
                    <Col style={{ paddingRight: 20 }}><span className={styles.currency} onClick={() => this.setState({ currency: 'ZX' })}>自选</span></Col>
                </Row>

                <Row type="flex" style={{ margin: '10px 0' }} className={styles.header}>
                    <Col className={styles.header} span={8}>币种</Col>
                    <Col className={styles.header} span={8} style={{ textAlign: 'center' }}>最新价</Col>
                    <Col className={styles.header} span={8} style={{ textAlign: 'right', paddingRight: 10 }}>涨幅</Col>
                </Row>

                {this.loadInstrument()}
            </Spin>
        </div>
    }
}



export default connect((state, props) => {
    return {
        instrumentIds: state.kine.instrumentIds,
        loading: state.kine.loading,
        userId: state.user.userId,
        search: state.kine.search,
        props
    }
}, (dispatch, props) => {
    return {
        dispatch
    }
})(Indenture)