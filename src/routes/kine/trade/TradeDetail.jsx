import React from "react";
import { connect } from 'dva';
import { Spin } from 'antd';
import PubSub from "pubsub-js";
import TradeComponent from '../../../components/tradDetail';

//import styles from '../market/Market.less';
/**
 * 模块:全部成交明细
 */
class TradDetal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            titleList: ["时间", "方向", "成交价", "成交量"]
        }
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentInstrument != nextProps.currentInstrument) {
            PubSub.publish('Polling.addsubscribe',
                [
                    { name: "getTradeDetail", payload: [nextProps.currentInstrument] },
                ]
            )
        }
    }

    componentWillUnmount() {
        PubSub.publish('Polling.delsubscribe', ["getTradeDetail"])
    }


    render() {
        return <Spin spinning={this.props.tradeDetailLoding}>
            <div style={{ height: "100%", paddingLeft: 20 }}>
                <TradeComponent trade dataList={this.props.getTradeDetailList} titleList={this.state.titleList} handleOk={price => console.log(price)} />
            </div>
        </Spin>
    }
}

export default connect((state, props) => {
    return {
        currentInstrument: state.kine.currentInstrument,
        getTradeDetailList: state.trade.getTradeDetailList,
        tradeDetailLoding: state.trade.tradeDetailLoding,
        props
    }
}, (dispatch) => {
    return {
        dispatch
    }
})(TradDetal)