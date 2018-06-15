import React from "react";
import PropTypes from 'prop-types';
import format from '../tool/formatNmber';
import styles from './tradDetail.less';

/**
 * 2018-6-12
 * 席坤:七档行情 交易明细公共组件
 */
export default class TradeComponent extends React.Component {

    //返回是七档行情还是成交明细,因匹配字段不同，改地方可以封装成动态化匹配字段
    isTradeDetail() {
        if (this.props.trade) {
            return this.props.dataList.map((item, index) => {
                return <div key={item.price} className={styles.header}>
                    <span>{item.time}</span>
                    <span style={{ color: item.level == "0" ? "#5CAF70" : '#DD5D36' }}>{item.level == "0" ? "买入" : '卖出'}</span>
                    <span>{item.price}</span>
                    <span>{item.volume}</span>

                </div>
            })
        } else {
            return this.props.dataList.map((item, index) => {
                return <div key={index} className={styles.header} onClick={() => this.props.handleOk(item.price)} onDoubleClick={() => alert(item.price)}>
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
                        return <span key={item}>{item}</span>
                    })}

                </div>
                {this.isTradeDetail()}
            </div>
        )
    }
}

TradeComponent.propTypes = {
    dataList: PropTypes.array.isRequired,         //数据
    titleList: PropTypes.array.isRequired
};

TradeComponent.defaultProps = {
    dataList: [],
    titleList: ["", "价格", "数量", "总价"]
};