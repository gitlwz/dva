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
import styles from './bibi.less';
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
        let bgColor = (this.props.theme == "white" ? styles.bgDarkColor : styles.bgWhiteColor);
        let cardHeader = (this.props.theme == "white" ? styles.darkCardHeader : styles.whiteCardHeader);
        const borderRadius = { borderRadius: '0 0 8px 8px' }
        const { userId, search, searchByInstrum, currentInstrument, dataByInstrumentId } = this.props;
        let Account = this.getAccount();
        return <div style={{ padding: '10px 30px', backgroundColor: '#FFFFFF' }}>
            <Row>
                <Col span="5">
                    <div style={{ height: 90, borderRadius: '8px', background: '#FFCD38' }} className={bgColor}>
                        <Row style={{ marginLeft: 20, height: '100%', padding: '18px 0' }} type="flex" justify="center">
                            <Col span={24}>
                                <Row>
                                    <Col span={12}><div className={styles.assetDiv} style={{ color: '#3E3E3E' }}>净资产折合</div></Col>
                                    <Col span={12}>{this.state.isLook ? <Icon type="eye" style={{ fontSize: 24, color: '#565656' }} onClick={() => this.changLook()} /> : <Icon type="eye-o" style={{ fontSize: 24, color: '#08c' }} onClick={() => this.changLook()} />} </Col>
                                </Row>
                            </Col>
                            {userId ?
                                <Col span={24}><div className={styles.assetDiv}>{this.state.isLook ? "******" : Account["btcCount"]} BTC ≈ {this.state.isLook ? "******" : Account["cnyCount"]} CNY</div></Col> :
                                <Col span={24}><LoginTooltip /></Col>
                            }
                        </Row>
                    </div>
                    {/*合约*/}
                    <div style={{ height: 320, marginTop: 10, borderRadius: '8px' }} className={bgColor}>
                        <div className={cardHeader}> 市场 <input placeholder="搜索" className={styles.search} value={search} onChange={e => searchByInstrum(e.target.value.toUpperCase())} /> </div>
                        <div style={{ margin: "10px 20px", overflowY: 'scroll', height: 250 }}>
                            <Indenture />
                        </div>
                    </div>
                    {/*公告栏*/}
                    <div style={{ height: 900, marginTop: 10, borderRadius: '8px' }} className={bgColor}>
                        <div className={cardHeader}>公告栏</div>
                        <Notice />
                    </div>
                </Col>
                <Col span="19">
                    <div style={{ marginLeft: 10 }}>
                        <div className={cardHeader} style={{ color: '#565656', fontSize: 14 }}><span style={{ color: '#3E3E3E', fontSize: 22 }}> {currentInstrument} {dataByInstrumentId.closePrice}</span> ≈ {formatData.convertCNY(this.props.RateUseList, dataByInstrumentId.closePrice, dataByInstrumentId.instrumentId)} 涨幅 {formatData.changePrice(dataByInstrumentId.closePrice, dataByInstrumentId.openPrice)}  高 {dataByInstrumentId.highestPrice}  低 {dataByInstrumentId.lowestPrice} 24H量 {dataByInstrumentId.volume}</div>
                        <div style={{ height: '490px', ...borderRadius }} className={bgColor}>
                            {!!currentInstrument ? <TVChartContainer symbol={currentInstrument} /> : ''}
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <Row>
                                {/*下单操作*/}
                                <Col span="14">
                                    <div style={{ height: '470px' }}>
                                        <div className={cardHeader}>限价交易<span style={{ color: '#565656' }}></span></div>
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
                                <Col span="15">
                                    <div className={cardHeader}><span style={{ color: this.props.tradeType == "1" ? '#747474' : '', cursor: 'pointer' }} onClick={() => this.changTradeType()}>我的委托</span> <span style={{ color: this.props.tradeType == "0" ? '#747474' : '', cursor: 'pointer' }} onClick={() => this.changTradeType()}>我的成交</span></div>
                                    <div className={bgColor} style={{ height: '360px', ...borderRadius }}>
                                        <MyEntrust />
                                    </div>
                                </Col>
                                {/*成交明细*/}
                                <Col span="9">
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
        userInfo: state.user.userInfo,
        search: state.kine.search,
        instrumentIds: state.kine.instrumentIds,
        currentInstrument: state.kine.currentInstrument,
        dataByInstrumentId: state.kine.dataByInstrumentId,
        dataSource: state.kine.dataSource,
        RateUseList: state.other.RateUseList,
        tradeType: state.trade.tradeType,
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
