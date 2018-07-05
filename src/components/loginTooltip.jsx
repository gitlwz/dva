import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './loginTooltip.less';
/**
 * 席坤
 * 2018-6-15
 * 未登录提示用户登录注册组件
 */
class LoginTooltip extends React.Component {
    pushRouter(url) {
        this.props.dispatch(routerRedux.push(url))
    }
    render() {
        const { custStyle } = this.props;
        return (
            <div style={custStyle} className={styles.assetDiv}>请<span className={styles.asset} onClick={() => this.pushRouter("/user/login")}>&nbsp;&nbsp;登录&nbsp;&nbsp;</span>或&nbsp;&nbsp;<span className={styles.asset} onClick={() => this.pushRouter("/user/regis")}>注册&nbsp;&nbsp;</span>后进行查看</div>
        )
    }

}

export default connect()(LoginTooltip)
