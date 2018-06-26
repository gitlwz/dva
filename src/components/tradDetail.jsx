import React from "react";
import PropTypes from 'prop-types';
import format from '../tool/formatNmber';
import { message } from "antd";
import styles from './tradDetail.less';
import { connect } from "dva";

/**
 * 2018-6-12
 * 席坤:七档行情 交易明细公共组件
 */
class TradeComponent extends React.Component {

    //撤单操作
    orderAction(item) {
        const { instrumentIdData, userId } = this.props;
        let orderData = {};
        orderData.actionFlag = "0";
        orderData.orderSysId = item.orderSysId;
        orderData.userId = item.clientId;
        orderData.clientId = item.clientId;
        orderData.participantId = item.clientId;
        orderData.volumeChange = Number(format.multiply(item.volumeTotal, instrumentIdData.volumeDivider));

        this.props.dispatch({
            type: 'trade/orderAction',
            payload: {
                orderData: orderData,
                callback: (data) => {
                    if (data.errorCode == "0") {
                        message.success("撤单成功!")
                        this.props.dispatch({
                            type: 'trade/queryOrderForClient',
                            payload: [userId, item.instrumentId, { "pageNo": 1, "pageSize": 10 }]
                        })
                    } else {
                        message.error("撤单失败!")
                    }
                }
            }
        })
    }

    //返回是七档行情还是成交明细,因匹配字段不同，改地方可以封装成动态化匹配字段
    isTradeDetail() {
        if (this.props.trade) {
            return this.props.dataList.map((item, index) => {
                return <div key={item.id} className={styles.header}>
                    <span style={{ textAlign: 'left' }}>{item.tradeTime}</span>
                    <span style={{ color: item.direction == "0" ? "#5CAF70" : '#DD5D36' }}>{item.direction == "0" ? "买入" : '卖出'}</span>
                    <span>{item.price}</span>
                    <span>{item.volume}</span>
                </div>
            })
        } else if (this.props.entrust) {
            return this.props.dataList.map((item, index) => {
                return <div key={item.orderSysId} className={styles.header} onDoubleClick={() => this.orderAction(item)}>
                    <span style={{ textAlign: 'left' }}>{item.tradingDay} {item.insertTime}</span>
                    <span>{item.instrumentId}</span>
                    <span style={{ color: item.direction == "0" ? "#5CAF70" : '#DD5D36' }}>{item.direction == "0" ? "买入" : '卖出'}</span>
                    <span>{item.limitPrice}</span>
                    <span>{item.volumeTotal}</span>
                    <span>{format.multiply(item.limitPrice, item.volumeTotal, 2)}</span>
                </div>
            })
        }
        else {
            return this.props.dataList.map((item, index) => {
                return <div key={index} className={styles.header} onClick={() => this.props.handleOk(item.price)}>
                    <span style={{ color: item.direction == "0" ? "#5CAF70" : '#DD5D36' }}>{item.direction == "0" ? "买" : '卖'}{index + 1}</span>
                    <span>{item.price}</span>
                    <span>{item.volume}</span>
                    <span>{format.multiply(item.price, item.volume, 2)}</span>
                </div>
            })
        }

    }
    render() {
        const { dataList, titleList } = this.props;
        return (
            <div className={styles.market}>
                <div className={styles.header + " " + styles.title}>
                    {titleList.map((item, index) => {
                        return <span key={item} style={{ textAlign: item == "时间" ? 'left' : '' }}>{item}</span>
                    })}
                </div>
                {this.isTradeDetail()}
            </div>
        )
    }
}


export default connect((state, props) => {
    return {
        instrumentIdData: state.kine.instrumentIdData,
        userId: state.user.userId,
        props
    }
})(TradeComponent)

TradeComponent.propTypes = {
    dataList: PropTypes.array.isRequired,         //数据
    titleList: PropTypes.array.isRequired
};

TradeComponent.defaultProps = {
    dataList: [],
    titleList: ["", "价格", "数量", "总价"]
};