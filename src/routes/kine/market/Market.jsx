import React from "react";
import { connect } from 'dva';
import { Spin } from 'antd';
import TradeComponent from '../../../components/tradDetail';

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
        console.log("初始化一次!")
        // WSClient.addEventListenerMarket(subscribeSet.Topic_change_mblmarketdata + "ISQ-BTC");
        // webSocket.emitter.on(subscribeSet.Topic_change_mblmarketdata, (data) => {
        //     if (data.length > 0) {
        //         if (data && data[0].direction == '1') {
        //             this.setState({ sellList: data })
        //         } else {
        //             this.setState({ buyList: data })
        //         }
        //     }
        // })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentInstrument != nextProps.currentInstrument) {
            this.props.findBuyMarket(nextProps.currentInstrument);
            this.props.findSellMarket(nextProps.currentInstrument);
        }
    }
    render() {
        return <div>
            <Spin spinning={this.props.markLoading}>
                <TradeComponent dataList={this.props.buyList.slice(0, 7)} handleOk={price => this.props.handleOk({ buyPrice: price })} />
                <div style={{ height: '1px', width: '100%', background: '#233044', margin: '5px 10px' }}></div>
                <TradeComponent dataList={this.props.sellList.slice(0, 7)} titleList={[]} handleOk={price => this.props.handleOk({ sellPrice: price })} />
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