import React from "react";
import { Row, Col } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Market from '../market/Market';
import Trade from '../trade/Trade';
import TradDetal from '../trade/TradeDetail';
import Indenture from '../indenture/indenture';
import { TVChartContainer } from '../../../components/TVChartContainer'
import styles from './bibi.less';
/**
 * 币币主页布局
 */
class Bibi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        let bgColor = (this.props.theme == "dark" ? styles.bgDarkColor : styles.bgWhiteColor);
        let cardHeader = (this.props.theme == "dark" ? styles.darkCardHeader : styles.whiteCardHeader);
        const borderRadius = { borderRadius: '0 0 8px 8px' }
        //const { language, currtLanguage } = this.props;
        const { tradDetail } = this.state;
        const { userId } = this.props;
        return <div style={{ padding: '10px 30px', backgroundColor: 'rgba(32,38,55,1)' }}>
            <Row>
                <Col span="5">
                    <div style={{ height: 90, borderRadius: '8px' }} className={bgColor}>
                        <Row style={{ marginLeft: 20, height: '100%', padding: '18px 0' }} type="flex" justify="center">
                            <Col span={24}><div className={styles.asset}>净资产折合</div></Col>
                            <Col span={24}><div style={{ color: 'rgba(161,178,196,1)' }}>请<span className={styles.asset}>&nbsp;&nbsp;登录&nbsp;&nbsp;</span>或&nbsp;&nbsp;<span className={styles.asset}>注册&nbsp;&nbsp;</span>后进行交易</div></Col>
                            <Col span={24}><div className={styles.assetDiv} style={{ color: 'rgba(120,173,255,1)' }}>净资产折合</div></Col>
                            {userId ?
                                <Col span={24}><div className={styles.assetDiv}>15455 BTC CNY</div></Col> :
                                <Col span={24}><div className={styles.assetDiv}>请<span className={styles.asset} onClick={() => this.props.pushRouter("/user/login")}>&nbsp;&nbsp;登录&nbsp;&nbsp;</span>或&nbsp;&nbsp;<span className={styles.asset} onClick={() => this.props.pushRouter("/user/regis")}>注册&nbsp;&nbsp;</span>后进行交易</div></Col>
                            }
                        </Row>
                    </div>
                    {/*合约*/}
                    <div style={{ height: 320, marginTop: 10, borderRadius: '8px' }} className={bgColor}>
                        <div className={cardHeader}>市场</div>
                        <div className={cardHeader}> 市场 <input placeholder="搜索" className={styles.search} /> </div>
                        <div style={{ margin: "10px 20px", overflowY: 'scroll', height: 250 }}>
                            <Indenture />
                        </div>
                    </div>
                    {/*公告栏*/}
                    <div style={{ height: 800, marginTop: 10, borderRadius: '8px' }} className={bgColor}>
                        <div className={cardHeader}>公告栏</div>
                    </div>
                </Col>
                <Col span="19">
                    <div style={{ marginLeft: 10 }}>
                        <div className={cardHeader}>{tradDetail.instrumentName} 2.2492 ≈ 14.47 CNY 涨幅 -3.21% 高 2.3400 低 2.1945 24H量 2906862 IOTA</div>
                        <div style={{ minHeight: 300, ...borderRadius }} className={bgColor}>
                            <TVChartContainer />
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
                                    </div>
                                </Col>
                                {/*成交明细*/}
                                <Col span="7">
                                    <div style={{ marginLeft: '10px' }}>
                                        <div className={cardHeader}>成交明细</div>
                                        <div className={bgColor} style={{ height: '360px', ...borderRadius }}>
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
        language: state.app.language,
        currtLanguage: state.app.currtLanguage,
        userId: state.user.userId,
        props
    }
}, (dispatch, props) => {
    return {

        pushRouter: (url) => {
            // if (props.location.pathname == url) {
            //     return;
            // }
            dispatch(routerRedux.push(url))
        },
    }

})(Bibi)
