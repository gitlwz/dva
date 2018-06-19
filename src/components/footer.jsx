import React, { Component, PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import logo from '../../src/assets/yinghe/yhLog.png';
import language from '../language';

import styles from './footer.less';
import { connect } from 'dva';


/**
 * 模块:赢和超腾尾部
 * 创建时间:2018-5-24
 * 创建人:席坤
 */
class Footer extends Component {


    pushNewPage = (url) => {
        this.props.dispatch(routerRedux.push(url))
    }

    // 渲染
    render() {
        const borderStyle = { borderLeft: '1px solid rgba(86,86,86,1)', padding: '0 50px' };
        const dataJSON = language
        return (
            <div className={styles.footer}>
                <div style={{ marginLeft: 200 }}>
                    <img src={logo} />
                </div>
                <div style={{ marginRight: 50, display: 'flex', flexDirection: "row", alignItems: 'center' }}>

                    <div style={{ ...borderStyle }}>
                        <p className={styles.title}>{dataJSON.GYConinX}</p>
                        <p onClick={() => this.pushNewPage("/joinus")}>{dataJSON.JRWM}</p>
                        <p onClick={() => this.pushNewPage("./contactUs")}>{dataJSON.LXWM}</p>
                        <p onClick={() => this.pushNewPage("./stipulation?application")}>{dataJSON.SSSQ}</p>
                    </div>
                    <div style={{ ...borderStyle }}>
                        <p className={styles.title}>{dataJSON.TKSM}</p>
                        <p onClick={() => this.pushNewPage("/stipulation?userAgreement")}>{dataJSON.YHXY}</p>
                        <p onClick={() => this.pushNewPage("/stipulation?privacy")}>{dataJSON.YSTK}</p>
                        <p onClick={() => this.pushNewPage("/stipulation?copyright")}>{dataJSON.FLSML}</p>
                    </div>
                    <div style={{ ...borderStyle }}>
                        <p className={styles.title}>{dataJSON.FZGJ}</p>
                        <p onClick={() => this.pushNewPage("/yhRate")}>{dataJSON.FLSM}</p>
                        <p onClick={() => this.pushNewPage("/downloadclient")}>{dataJSON.KHDXZ}</p>
                        <p>{dataJSON.WDAPIXZ}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        currtLanguage: state.app.currtLanguage,
    }
})(Footer);
