//我的订单

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import style from './orderManager.less'

class MyOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount = () => {

    }

    render() {
        return (
            <div style={{ paddingTop: '53px' }}>
                <div className={style.right_title}>
                    我的订单
                </div>
                <div className={style.right_bz}>
                    222222222
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    return {
    }
})(MyOrder);