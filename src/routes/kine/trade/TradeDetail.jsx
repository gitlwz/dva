import React from "react";
import { connect } from 'dva';
import { Spin } from 'antd';
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
            this.queryOperTradeByInstrumentID(nextProps.currentInstrument)
        }
    }

    queryOperTradeByInstrumentID(currentInstrument) {
        this.props.queryOperTradeByInstrumentID([{ "pageNo": 1, "pageSize": 100 }, currentInstrument])
    }

    render() {
        return <Spin spinning={this.props.tradeDetailLoding}>
            <div style={{ height: "100%", paddingLeft: 20}}>
                <TradeComponent trade dataList={this.props.operTradeByInstrumentIDList} titleList={this.state.titleList} handleOk={price => console.log(price)} />
            </div>
        </Spin>
    }
}

export default connect((state, props) => {
    return {
        currentInstrument: state.kine.currentInstrument,
        operTradeByInstrumentIDList: state.trade.operTradeByInstrumentIDList,
        tradeDetailLoding: state.trade.tradeDetailLoding,
        props
    }
}, (dispatch, props) => {
    return {
        queryOperTradeByInstrumentID: (parms) => {
            dispatch({
                type: 'trade/queryOperTradeByInstrumentID',
                payload: parms
            }),
                dispatch({
                    type: 'trade/save',
                    payload: {
                        tradeDetailLoding: true
                    }
                })
        }
    }
})(TradDetal)