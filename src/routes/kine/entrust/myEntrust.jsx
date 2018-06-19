import React from "react";
import moment from 'moment';
import { connect } from 'dva';
import { Spin, Icon, message } from 'antd';
import format from '../../../tool/formatNmber';
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
        let array = []
        for (let i = 0; i < 10; i++) {
            let element = {
                time: moment().format("HH:MM:SS"), instrumentId: 'BTC', direction: Math.random() > 0.5 ? "1" : "0",
                price: format.multiply(Math.random(1000).toFixed(2), i + 1, 2), volume: format.multiply(Math.random(1000).toFixed(4), i + 1, 2)
            }
            array.push(element);
        }
        this.setState({ dataSource: array });

        setTimeout(() => {
            this.setState({ loading: false })
        }, (2000))

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentInstrument != nextProps.currentInstrument) {
            this.props.queryOrderForClient([nextProps.userId, nextProps.currentInstrument, { "pageNo": 1, "pageSize": 10 }])
        }
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
        return (
            <div style={{ height: '100%', padding: '0 20px' }}>
                <Spin spinning={this.props.orderForClientLoading}>
                    <TradeComponent dataList={this.props.orderForClientList} titleList={["时间", "货币对", "买卖", "委单价", "剩余委数量", "总价"]} entrust />
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
        userId: state.user.userId,
        currentInstrument: state.kine.currentInstrument,
        userInfo: state.user.userInfo,
        userId: state.user.userId,
        orderForClientList: state.trade.orderForClientList,
        orderForClientLoading: state.trade.orderForClientLoading,
        props
    }
}, (dispatch, props) => {
    return {
        queryOrderForClient: (parms) => {
            dispatch({
                type: 'trade/queryOrderForClient',
                payload: parms
            })

            dispatch({
                type: 'trade/save',
                payload: {
                    orderForClientLoading: true
                }
            })
        },
        dispatch
    }
})(MyEntrust)