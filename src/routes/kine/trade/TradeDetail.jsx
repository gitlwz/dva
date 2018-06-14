import React from "react";
import { connect } from 'dva';
import moment from 'moment';
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
        let array = []
        for (let i = 0; i < 10; i++) {
            let body = { time: moment().format("HH:MM:SS"), level: Math.random() > 0.5 ? "1" : "0", price: Math.random(1000).toFixed(2), volume: Math.random(1000).toFixed(4) };
            array.push(body)
        }
        this.setState({ dataSource: array })
    }

    render() {
        return <div >
            <TradeComponent trade dataList={this.state.dataSource} titleList={this.state.titleList} handleOk={price => console.log(price)} />

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
})(TradDetal)