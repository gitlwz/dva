import React from "react";
import { connect } from 'dva';
import { Row, Col } from 'antd';
import TradeComponent from '../../../components/tradDetail';
import CalculateFunc from '../../../tool/CalculateFunc';

/**
 * 模块:七档行情
 */
class Market extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            sellList: [{ price: 1155454.6666, level: '1', volume: '4444.0000' }, { price: 135.8484, level: '1', volume: '4444.0000' }, { price: 9876.6666, level: '1', volume: '4444.0000' }, { price: 18.6666, level: '1', volume: '4444.0000' }, { price: 34.8484, level: '1', volume: '4444.0000' }, { price: 56.6666, level: '1', volume: '4444.0000' }, { price: 45.6666, level: '1', volume: '4444.0000' }],
            buyList: [{ price: 232.11, level: '0', volume: '68545.3' }, { price: 9898.11, level: '0', volume: '68545.3' }, { price: 555.11, level: '0', volume: '68545.3' }, { price: 1112.11, level: '0', volume: '68545.3' }, { price: 888.11, level: '0', volume: '68545.3' }, { price: 866.11, level: '0', volume: '68545.3' }, { price: 878.11, level: '0', volume: '68545.3' }]
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


    render() {
        return <div>
            <TradeComponent dataList={this.state.sellList} handleOk={price => this.props.handleOk({ buyData: { price: price } })} />
            <div style={{ height: '1px', width: '100%', background: '#233044', margin: '5px 10px' }}></div>
            <TradeComponent dataList={this.state.buyList} titleList={[]} handleOk={price => this.props.handleOk({ sellData: { price: price } })} />
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
})(Market)