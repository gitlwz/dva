import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import style from './otherRecharge.less'

/**
 * 资产管理
 */
class Asset extends Component {
    constructor(props) {
        super(props);


    }
   
    render() {
        return (
            <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <div className={style.content}>
                    <div className={style.title}>
                        其他货币充值
                    </div>
                </div>
            </div>

        )
    }
}
export default connect((state, props) => {
    return {
        ...props,
    }
})(Asset);