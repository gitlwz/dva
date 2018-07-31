import React from "react";
import PropTypes from 'prop-types';
import format from '../tool/formatNmber';
import { message } from "antd";
import light from './tradeLight.less';
import dark from './tradeDrak.less';
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
                    } else {
                        message.error("撤单失败!")
                    }
                }
            }
        })
    }

    //返回是七档行情还是成交明细,因匹配字段不同，改地方可以封装成动态化匹配字段
    isTradeDetail() {
        let styles = this.props.theme == "dark" ? dark : light;
        if (this.props.trade) {
            return this.props.dataList.map((item, index) => {
                return <div key={item.id} className={styles.header}>
                    <span>{this.props.tradeDate ? item.tradeDate : ""} {item.tradeTime}</span>
                    <span style={{ color: item.direction == "0" ? "#5CAF70" : '#DD5D36', width: 50 }}>{item.direction == "0" ? "买入" : '卖出'}</span>
                    <span>{item.priceString}</span>
                    <span>{item.volumeString}</span>
                </div>
            })
        } else if (this.props.entrust) {
            return this.props.dataList.map((item, index) => {
                return <div key={item.orderSysId} className={styles.header} onDoubleClick={() => this.orderAction(item)}>
                    <span>{item.insertDate}  {item.insertTime}</span>
                    <span>{item.instrumentId}</span>
                    <span style={{ color: item.direction == "0" ? "#5CAF70" : '#DD5D36' }}>{item.direction == "0" ? "买入" : '卖出'}</span>
                    <span>{item.limitPrice}</span>
                    <span>{item.volumeTotal}</span>
                    <span>{!!item.totalPrice ? item.totalPrice : "---"}</span>
                </div>
            })
        }
        else {
            //固定七档行情
            let dataList = this.props.dataList || [];
            for (let i = dataList.length; i < 7; i++) {
                if (this.props.direction == "1") {
                    dataList.unshift({ price: "---", priceString: "---", volumeString: "---", direction: this.props.direction })
                } else {
                    dataList.push({ price: "---", priceString: "---", volumeString: "---", direction: this.props.direction })
                }
            }

            return dataList.map((item, index) => {
                return <div key={index} className={styles.header} onClick={() => this.props.handleOk(item.priceString)}>
                    <span style={{ color: item.direction == "0" ? "#5CAF70" : '#DD5D36' }}>{item.direction == "0" ? "买" + (index + 1) : '卖' + (this.props.dataList.length - index)}</span>
                    <span>{item.priceString}</span>
                    <span>{item.volumeString}</span>
                    <span>{!!item.totalPrice ? item.totalPrice : "---"}</span>
                </div>
            })
        }

    }
    render() {
        const { dataList, titleList } = this.props;
        let styles = this.props.theme == "dark" ? dark : light;
        return (
            <div style={this.props.style} className={styles.market}>
                <div className={styles.header + " " + styles.title}>
                    {titleList.map((item, index) => {
                        return <span key={item}>{item}</span>
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
        theme: state.app.theme,
        tradeType: state.trade.tradeType,
        currentInstrument: state.kine.currentInstrument,
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