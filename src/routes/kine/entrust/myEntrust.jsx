import React from "react";
import { connect } from 'dva';
import { Spin, Icon, message } from 'antd';
import PubSub from "pubsub-js";
import TradeComponent from '../../../components/tradDetail';
import styles from './myEntrust.less';

/**
 * 我的委托
 * 2018-6-16
 */
class MyEntrust extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading: true
        }
    }

    componentDidMount() {
        //从别的页面点击已经登录的情况下
        if (this.props.userInfo && !!this.props.userInfo.clientID && !!this.props.currentInstrument && this.props.userId) {
            this.getDataList(this.props.userInfo.clientID, this.props.currentInstrument, this.props.userId);
        }
    }

    getDataList(clientID, currentInstrument, userId) {
        if (!!clientID) {
            this.props.dispatch({
                type: 'trade/save',
                payload: {
                    orderForClientLoading: true
                }
            })
            PubSub.publish('Polling.addsubscribe',
                [
                    { name: "getUnfinishedOrder", payload: [clientID, currentInstrument, userId] },
                    { name: "getClientTradeDetail", payload: [clientID, currentInstrument, userId] }
                ]
            )
        }
    }

    componentWillReceiveProps(nextProps) {
        //改情况是刷新本页面从新获取userInfo
        if (!!nextProps.currentInstrument) {
            if (this.props.userInfo != nextProps.userInfo && !!nextProps.userInfo.clientID) {
                this.getDataList(nextProps.userInfo.clientID, nextProps.currentInstrument, nextProps.userId)
            }
        }

        //userInfo已经有了,切换货币对
        if (nextProps.userInfo && !!nextProps.userInfo.clientID) {
            if (this.props.currentInstrument != nextProps.currentInstrument) {
                this.getDataList(nextProps.userInfo.clientID, nextProps.currentInstrument, nextProps.userId)
            }
        }
    }


    componentWillUnmount() {
        PubSub.publish('Polling.delsubscribe', ["getUnfinishedOrder"]);
        PubSub.publish('Polling.delsubscribe', ["getClientTradeDetail"]);
    }

    batchOrderAction(direction) {
        const { currentInstrument, userInfo, userId } = this.props;
        this.props.dispatch({
            type: 'trade/batchOrderAction',
            payload: {
                orderData: [userInfo.clientID, currentInstrument, direction],
                callback: (data) => {
                    if (data.errorCode == '0') {
                        message.success("撤销成功!");
                        this.props.dispatch({
                            type: 'trade/queryOrderForClient',
                            payload: [userId, currentInstrument, { "pageNo": 1, "pageSize": 10 }]
                        })
                    } else {
                        message.success("撤销失败!");
                    }
                }
            }
        })
    }

    render() {
        const IconStyle = { color: '#6C7F9C', fontSize: 16, marginLeft: 20 }
        let dataList = this.props.tradeType == "0" ? this.props.orderForClientList : this.props.operTradeList;
        return (
            <div style={{ height: '100%', padding: '0 20px' }}>
                <Spin spinning={this.props.orderForClientLoading}>
                    <div style={{ height: 300, overflowY: 'scroll' }}>
                        {this.props.tradeType == "0" ? <TradeComponent dataList={dataList} titleList={["时间", "货币对", "买卖", "委单价", "剩余委托数量", "总价"]} entrust /> :
                            <TradeComponent trade dataList={dataList} titleList={["时间", "方向", "成交价", "成交量"]} handleOk={price => console.log(price)} />
                        }
                    </div>
                </Spin>
                <div style={{ height: '1px', background: '#233044', margin: '15px 30px 10px 0' }}></div>
                <div className={styles.action}>
                    <span>撤单提示(双击单笔委托可撤单)</span>
                    <Icon type="delete" style={{ ...IconStyle }} /><span onClick={() => this.batchOrderAction("0")}>撤销买入</span>
                    <Icon type="delete" style={{ ...IconStyle }} /> <span onClick={() => this.batchOrderAction("1")}>撤销卖出</span>
                    <Icon type="delete" style={{ ...IconStyle }} /><span onClick={() => this.batchOrderAction("")}>撤销所有</span>
                </div>
            </div>

        )
    }
}

export default connect((state, props) => {
    return {
        currentInstrument: state.kine.currentInstrument,
        userInfo: state.user.userInfo,
        userId: state.user.userId,
        orderForClientList: state.trade.orderForClientList,
        operTradeList: state.trade.operTradeList,
        orderForClientLoading: state.trade.orderForClientLoading,
        tradeType: state.trade.tradeType,
        props
    }
}, (dispatch, props) => {
    return {

        dispatch
    }
})(MyEntrust)
