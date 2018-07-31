import React from "react";
import { connect } from 'dva';
import { Spin } from 'antd';
import TradeComponent from '../../../components/tradDetail';
import PubSub from "pubsub-js";
/**
 * 模块:七档行情
 */
class Market extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            sellList: [],
            buyList: []
        }
    }

    componentDidMount() {
        if (!!this.props.currentInstrument) {
            PubSub.publish('Polling.addsubscribe',
                [
                    { name: "findBuyMarket", payload: this.props.currentInstrument },
                    { name: "findSellMarket", payload: this.props.currentInstrument }
                ]
            )
        }
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.currentInstrument != nextProps.currentInstrument) {
            PubSub.publish('Polling.addsubscribe',
                [
                    { name: "findBuyMarket", payload: nextProps.currentInstrument },
                    { name: "findSellMarket", payload: nextProps.currentInstrument }
                ]
            )
        }
    }

    componentWillUnmount() {
        PubSub.publish('Polling.delsubscribe', ["findBuyMarket"]);
        PubSub.publish('Polling.delsubscribe', ["findSellMarket"]);
    }

    render() {
        const titleList = ["", "价格" + "(" + this.props.currentInstrument.split("-")[1] + ")", "数量" + "(" + this.props.currentInstrument.split("-")[0] + ")", "总价" + "(" + this.props.currentInstrument.split("-")[1] + ")"];
        return <div style={{ height: '100%' }}>
            <Spin spinning={this.props.markLoading}>
                <TradeComponent dataList={this.props.sellList} titleList={titleList} sort={1} direction="1" handleOk={priceString => {
                    if (priceString != "---") {
                        this.props.handleOk({ buyPrice: priceString, sellPrice: priceString })
                    }
                }} />
                <div style={{ height: '1px', width: '95%', background: '#233044', margin: '5px 10px' }}></div>
                <TradeComponent dataList={this.props.buyList} sort={1} titleList={[]} direction="0" handleOk={priceString => {
                    if (priceString != "---") {
                        this.props.handleOk({ sellPrice: priceString, buyPrice: priceString })
                    }
                }} />
            </Spin>
        </div>
    }
}

export default connect((state, props) => {
    return {
        currentInstrument: state.kine.currentInstrument,
        buyList: state.kine.buyList,
        sellList: state.kine.sellList,
        markLoading: state.kine.markLoading,
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
        },
        findBuyMarket: (parms) => {
            dispatch({
                type: 'kine/findBuyMarket',
                payload: [parms]
            })
        },
        findSellMarket: (parms) => {
            dispatch({
                type: 'kine/findSellMarket',
                payload: [parms]
            })
        }
    }
})(Market)