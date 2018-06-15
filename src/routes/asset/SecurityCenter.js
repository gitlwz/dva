import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import style from './asset.less';
import styleA from './SecurityCenter.less';
class SecurityCenter extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ display: this.props.currentSelect == "安全中心" ? "block" : "none" ,paddingTop: '53px'}}>
                <div className={style.right_title}>
                    安全中心
                    <span className={style.zh}>727770481@qq.com</span>
                </div>
                <div className={style.right_bz}>
                    <div className={styleA.card}></div>
                    <div className={styleA.card}></div>
                    <div className={styleA.card}></div>
                    <div className={styleA.card}></div>
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    let {currentSelect} = state.asset
    return {
        currentSelect,
        ...props
    }
})(SecurityCenter);