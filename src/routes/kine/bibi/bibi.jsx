import React from "react";
import { Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import formatData from '../../../tool/formatNmber';
import Market from '../market/Market';
import Trade from '../trade/Trade';
import TradDetal from '../trade/TradeDetail';
import Indenture from '../indenture/indenture';
import LoginTooltip from '../../../components/loginTooltip';
import MyEntrust from '../entrust/myEntrust';
import Notice from '../notice/notice';
import { TVChartContainer } from '../../../components/TVChartContainer'
import PubSub from "pubsub-js";
import light from './light.less';
import dark from './dark.less';
/**
 * 币币主页布局
 */
class Bibi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLook: false,
        }
    }

    componentDidMount() {
        this.props.findAllExchangeRateUse();
        this.props.getAllInstrument();
        if (this.props.userInfo && !!this.props.userInfo.clientID && !!this.props.userId) {
            this.getAcountAsset(this.props.userInfo.clientID, this.props.userId);
        }

        if (!!this.props.currentInstrument) {
            this.getLastDayKline(this.props.currentInstrument)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentInstrument != nextProps.currentInstrument) {
            this.getLastDayKline(nextProps.currentInstrument);
        }
        if (this.props.userInfo != nextProps.userInfo && !!nextProps.userInfo.clientID) {
            this.getAcountAsset(nextProps.userInfo.clientID, nextProps.userId)
        }
    }

    getLastDayKline(currentInstrument) {
        PubSub.publish('Polling.addsubscribe',
            [
                { name: "getLastDayKline", payload: currentInstrument },
            ]
        );
    }

    getAcountAsset(clientID, userId) {
        PubSub.publish('Polling.addsubscribe',
            [
                { name: "getAcountAsset", payload: [clientID, userId] },
            ]
        );
    }

    componentWillUnmount() {
        PubSub.publish('Polling.delsubscribe', ["getLastDayKline"]);
        PubSub.publish('Polling.delsubscribe', ["getAcountAsset"]);
    }

    changLook() {
        this.setState({ isLook: !this.state.isLook })
    }

    changTradeType() {
        this.props.dispatch({
            type: 'trade/save',
            payload: {
                tradeType: this.props.tradeType == "0" ? "1" : "0"
            }
        })
    }

    changOrderType() {
        this.props.dispatch({
            type: 'kine/save',
            payload: {
                orderPriceType: this.props.orderPriceType == "0" ? "1" : "0"
            }
        })
    }

    //获取资产
    getAccount() {
        let account = this.props.dataSource;
        if (account.length > 0) {
            account = account.filter(item => item.ifTotal == true)[0];
            return account;
        }
        return { btcCount: 0, cnyCount: 0 };
    }

    render() {
        let styles = this.props.theme == "dark" ? dark : light;
        let CardBgColor = styles.CardBgColor;
        let CardHeader = styles.CardHeader;
        const borderRadius = { borderRadius: '0 0 8px 8px' }
        const { userId, search, searchByInstrum, currentInstrument, dataByInstrumentId } = this.props;
        let Account = this.getAccount();
        return <div style={{ padding: '10px 30px' }} className={styles.bgColor}>
            <Row>
                <Col span="5">
                    <div style={{ height: 90, borderRadius: '8px' }} className={styles.CardBgColor}>
                        <Row style={{ marginLeft: 20, height: '100%', padding: '18px 0' }} type="flex" justify="center">
                            <Col span={24}>
                                <Row>
                                    <Col span={12}><div className={styles.assetDiv}>净资产折合</div></Col>
                                    <Col span={12}>{this.state.isLook ? <Icon type="eye" style={{ fontSize: 24, color: '#565656' }} onClick={() => this.changLook()} /> : <Icon type="eye-o" style={{ fontSize: 24, color: '#08c' }} onClick={() => this.changLook()} />} </Col>
                                </Row>
                            </Col>
                            {userId ?
                                <Col span={24}><div className={styles.asset}>{this.state.isLook ? "******" : Account["btcCount"]} BTC ≈ {this.state.isLook ? "******" : Account["cnyCount"]} CNY</div></Col> :
                                <Col span={24}><LoginTooltip /></Col>
                            }
                        </Row>
                    </div>
                    {/*合约*/}
                    <div style={{ height: 320, marginTop: 10, borderRadius: '8px' }} className={CardBgColor}>
                        <div className={CardHeader}> 市场 <input placeholder="搜索" className={styles.search} value={search} onChange={e => searchByInstrum(e.target.value.toUpperCase())} /> </div>
                        <div style={{ margin: "10px 20px", overflowY: 'scroll', height: 250 }}>
                            <Indenture />
                        </div>
                    </div>
                    {/*公告栏*/}
                    <div style={{ height: 900, marginTop: 10, borderRadius: '8px' }} className={CardBgColor}>
                        <div className={CardHeader}>公告栏</div>
                        <Notice />
                    </div>
                </Col>
                <Col span="19">
                    <div style={{ marginLeft: 10 }}>
                        <div className={CardHeader} className={styles.lastDayKine}> {currentInstrument} {dataByInstrumentId.closePriceString} <span>≈ {formatData.convertCNY(this.props.RateUseList, dataByInstrumentId.closePriceString, currentInstrument)} 涨幅 {formatData.changePrice(dataByInstrumentId.closePriceString, dataByInstrumentId.openPriceString)}  高 {dataByInstrumentId.highestPriceString}  低 {dataByInstrumentId.lowestPriceString} 24H量 {dataByInstrumentId.volumeString}</span></div>
                        <div style={{ height: '490px', ...borderRadius }} className={CardBgColor}>
                            {!!currentInstrument ? <TVChartContainer symbol={currentInstrument} theme={this.props.theme}/> : ''}
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <Row>
                                {/*下单操作*/}
                                <Col span="14">
                                    <div style={{ height: '470px' }}>
                                        <div className={CardHeader}><span style={{ color: this.props.orderPriceType == "1" ? '#747474' : '', cursor: 'pointer' }} onClick={() => this.changOrderType()}>限价交易</span> <span style={{ color: this.props.orderPriceType == "0" ? '#747474' : '', cursor: 'pointer' }} onClick={() => this.changOrderType()}>市价交易</span></div>
                                        <div className={CardBgColor} style={{ height: "420px", ...borderRadius }}>
                                            <Trade />
                                        </div>
                                    </div>
                                </Col>
                                {/*七档行情*/}
                                <Col span="10">
                                    <div style={{ marginLeft: 10 }}>
                                        <div className={CardHeader}>七档行情</div>
                                        <div className={CardBgColor} style={{ height: "420px", ...borderRadius }}>
                                            <Market />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div style={{ marginTop: 10 }} >
                            <Row>
                                {/*我的委托*/}
                                <Col span="15">
                                    <div className={CardHeader}><span style={{ color: this.props.tradeType == "1" ? '#747474' : '', cursor: 'pointer' }} onClick={() => this.changTradeType()}>我的委托</span> <span style={{ color: this.props.tradeType == "0" ? '#747474' : '', cursor: 'pointer' }} onClick={() => this.changTradeType()}>我的成交</span></div>
                                    <div className={CardBgColor} style={{ height: '360px', ...borderRadius }}>
                                        <MyEntrust />
                                    </div>
                                </Col>
                                {/*成交明细*/}
                                <Col span="9">
                                    <div style={{ marginLeft: '10px' }}>
                                        <div className={CardHeader}>成交明细</div>
                                        <div className={CardBgColor} style={{ height: '360px', ...borderRadius, overflowY: 'scroll' }}>
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
        userInfo: state.user.userInfo,
        search: state.kine.search,
        instrumentIds: state.kine.instrumentIds,
        currentInstrument: state.kine.currentInstrument,
        dataByInstrumentId: state.kine.dataByInstrumentId,
        dataSource: state.kine.dataSource,
        RateUseList: state.other.RateUseList,
        tradeType: state.trade.tradeType,
        orderPriceType: state.kine.orderPriceType,
        props
    }
}, (dispatch, props) => {
    return {
        searchByInstrum: (value) => {
            dispatch({
                type: 'kine/save',
                payload: {
                    search: value
                }
            })
        },
        findAllExchangeRateUse: () => {
            dispatch({
                type: 'other/findAllExchangeRateUse'
            })
        },
        getAllInstrument: () => {
            dispatch({
                type: 'other/getAllInstrument'
            })
        },
        dispatch
    }

})(Bibi)
