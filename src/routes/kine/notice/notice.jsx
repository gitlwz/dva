import React from 'react';
import styles from './notice.less';

class Notice extends React.Component {
    render() {
        return (
            <div style={{ padding: '13px 20px' }}>
                <div className={styles.root}>
                    <div className={styles.msg}>新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标</div>
                    <div className={styles.time}>2018-05-22</div>
                </div>
                <div className={styles.root}>
                    <div className={styles.msg}>题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标</div>
                    <div className={styles.time}>2018-05-22</div>
                </div>
                <div className={styles.root}>
                    <div className={styles.msg}>新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题</div>
                    <div className={styles.time}>2018-05-22</div>
                </div>
            </div>
        )
    }
}

export default Notice