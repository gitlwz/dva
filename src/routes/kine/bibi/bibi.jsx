import React from "react";
import { Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Market from '../market/Market';
import Trade from '../trade/Trade';
import TradDetal from '../trade/TradeDetail';
import Indenture from '../indenture/indenture';
import LoginTooltip from '../../../components/loginTooltip';
import MyEntrust from '../entrust/myEntrust';
import Notice from '../notice/notice';
import { TVChartContainer } from '../../../components/TVChartContainer'
import styles from './bibi.less';
/**
 * 币币主页布局
 */
class Bibi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLook: false,
            tradDetail: {}
        }
    }

    componentDidMount() {
        // WSClient.addEventListenerInstrument(subscribeSet.Topic_instrument + "public_instrument_KOG-CNHE,public_instrument_AIX-B…lic_instrument_ISQ-CNHE,public_instrument_ISQ-BTC");
        // webSocket.emitter.on(subscribeSet.Topic_instrument, (data) => {
        //     //console.log(data)
        //     this.setState({ tradDetail: data })
        // })

    }

    changLook() {
        this.setState({ isLook: !this.state.isLook })
    }

    render() {
        let bgColor = (this.props.theme == "dark" ? styles.bgDarkColor : styles.bgWhiteColor);
        let cardHeader = (this.props.theme == "dark" ? styles.darkCardHeader : styles.whiteCardHeader);
        const borderRadius = { borderRadius: '0 0 8px 8px' }
        const { userId, search, searchByInstrum, currentInstrument, instrumentIds, Currency } = this.props;
        return <div style={{ padding: '10px 30px', backgroundColor: 'rgba(32,38,55,1)' }}>
            <Row>
                <Col span="5">
                    <div style={{ height: 90, borderRadius: '8px' }} className={bgColor}>
                        <Row style={{ marginLeft: 20, height: '100%', padding: '18px 0' }} type="flex" justify="center">
                            <Col span={24}>
                                <Row>
                                    <Col span={12}><div className={styles.assetDiv} style={{ color: 'rgba(120,173,255,1)' }}>净资产折合</div></Col>
                                    <Col span={12}>{this.state.isLook ? <Icon type="eye" style={{ fontSize: 24, color: '#08c' }} onClick={() => this.changLook()} /> : <Icon type="eye-o" style={{ fontSize: 24, color: '#08c' }} onClick={() => this.changLook()} />} </Col>
                                </Row>
                            </Col>
                            {userId ?
                                <Col span={24}><div className={styles.assetDiv}>15455 BTC CNY</div></Col> :
                                <Col span={24}><LoginTooltip /></Col>
                            }
                        </Row>
                    </div>
                    {/*合约*/}
                    <div style={{ height: 320, marginTop: 10, borderRadius: '8px' }} className={bgColor}>
                        <div className={cardHeader}> 市场 <input placeholder="搜索" className={styles.search} value={search} onChange={e => searchByInstrum(instrumentIds, e.target.value, Currency)} /> </div>
                        <div style={{ margin: "10px 20px", overflowY: 'scroll', height: 250 }}>
                            <Indenture />
                        </div>
                    </div>
                    {/*公告栏*/}
                    <div style={{ height: 800, marginTop: 10, borderRadius: '8px' }} className={bgColor}>
                        <div className={cardHeader}>公告栏</div>
                        <Notice />
                    </div>
                </Col>
                <Col span="19">
                    <div style={{ marginLeft: 10 }}>
                        <div className={cardHeader}>{currentInstrument} 2.2492 ≈ 14.47 CNY 涨幅 -3.21% 高 2.3400 低 2.1945 24H量 2906862 IOTA</div>
                        <div style={{ height: 450, ...borderRadius }} className={bgColor}>
                            {<TVChartContainer symbol="EHT-BTC" />}
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <Row>
                                {/*下单操作*/}
                                <Col span="14">
                                    <div style={{ height: '470px' }}>
                                        <div className={cardHeader}>限价交易<span style={{ color: '#6C7F9C' }}>  市价交易</span></div>
                                        <div className={bgColor} style={{ height: "420px", ...borderRadius }}>
                                            <Trade />
                                        </div>
                                    </div>
                                </Col>
                                {/*七档行情*/}
                                <Col span="10">
                                    <div style={{ marginLeft: 10 }}>
                                        <div className={cardHeader}>七档行情</div>
                                        <div className={bgColor} style={{ height: "420px", ...borderRadius }}>
                                            <Market />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div style={{ marginTop: 10 }} >
                            <Row>
                                {/*我的委托*/}
                                <Col span="17">
                                    <div className={cardHeader}>我的委托</div>
                                    <div className={bgColor} style={{ height: '360px', ...borderRadius }}>
                                        <MyEntrust />
                                    </div>
                                </Col>
                                {/*成交明细*/}
                                <Col span="7">
                                    <div style={{ marginLeft: '10px' }}>
                                        <div className={cardHeader}>成交明细</div>
                                        <div className={bgColor} style={{ height: '360px', ...borderRadius, overflowY: 'scroll' }}>
                                            <TradDetal />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    }
}

export default connect((state, props) => {
    return {
        theme: state.app.theme,
        userId: state.user.userId,
        search: state.kine.search,
        instrumentIds: state.kine.instrumentIds,
        currentInstrument: state.kine.currentInstrument,
        Currency: state.kine.Currency,
        props
    }
}, (dispatch, props) => {
    return {
        searchByInstrum: (instrumentIds, value, Currency) => {
            if (value != "") {
                dispatch({
                    type: 'kine/save',
                    payload: {
                        instrumentIds: instrumentIds.filter(item => item.split("-")[0].match(value.toUpperCase())),
                        search: value.toUpperCase()
                    }
                })
            } else {
                dispatch({
                    type: 'kine/save',
                    payload: {
                        //instrumentIds: instrumentIds.filter(item => item.split("-")[1] == Currency),
                        search: value
                    }
                }),

                    dispatch({
                        type: 'kine/getInstrumentIds'
                    })
            }
        }

    }

})(Bibi)
