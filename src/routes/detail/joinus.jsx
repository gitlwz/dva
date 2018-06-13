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
                <div className={styles.body}>
                    {joinus.map((item, index) => {
                        return (
                            <div className={styles.item} key={index}>
                                <div className={styles.title}>
                                    <span className={styles.no}>NO.{index + 1}</span>
                                    <span className={styles.jonp}>{item.title}</span>
                                </div>
                                <div className={styles.content}>
                                    <pre style={{ fontSize: '16px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                        {item.content}
                                    </pre>
                                </div>
                            </div>
                        )
                    })}
                    <div className={styles.footer}>
                        如果您有意向，请将个人简历投至hr@hr@jamta.com
                        </div>
                </div>
            </div>
        )
    }
}

export default JoinUs