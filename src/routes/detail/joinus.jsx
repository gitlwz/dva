import React, { Component, PropTypes } from 'react';
//import NationTitle from '../common/NationTitle';
import styles from './joinus.less';
import { joinus } from '../../dataJson/userData';

/**
 * 加入我们
 */
class JoinUs extends Component {
    render() {
        return (
            <div>
                <div>加入我们</div>
                <div style={{fontFamily:"PingFangSC-Regular"}} className={styles.body}>
                    {joinus.map((item, index) => {
                        return (
                            <div className={styles.item} key={index}>
                                <div className={styles.title}>
                                    <span className={styles.no}>NO.{index + 1}</span>
                                    <span className={styles.jonp}>{item.title}</span>
                                </div>
                                <div className={styles.content}>
                                    <pre style={{fontFamily:"PingFangSC-Regular", fontSize: '16px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                        {item.content}
                                    </pre>
                                </div>
                            </div>
                        )
                    })}
                    <div className={styles.footer}>
                    若要申请上述职位，请将简历发送至：hr@sundax.top
                        </div>
                </div>
            </div>
        )
    }
}

export default JoinUs