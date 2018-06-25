import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import style from './minerFee.less'

/**
 * 资产管理
 */
class minerFee extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        
        return (
            <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                    <div className={style.content}>
                        <div className={style.title}>矿工费说明</div>
                        <div className={style.detail}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在一个公有链上, 任何人都可以免费读写数据。 正常情况来说是可以免费将货币发送到任何地方，但实际情况不完全是这样。 在某些情况下你必须支付手续费才能完成转账，由于挖矿需要计算能力和电费, 所以矿工们的服务需要得到一定的报酬, 这也是矿工费的由来。 这里说的手续费就是矿工费。交易的过程一般需要支付一定量的手续费，如果选择不支付也是可以的。 但矿工会优先打包交易手续费高的交易，如果没有支付交易手续费，你的交易可能要等很久才会被打包。 也就是说一笔交易所产生的转账费用会奖励给打包包含这笔交易的区块的矿工。
                        </div>
                    </div>
            </div>
        )
    }
}
export default minerFee;