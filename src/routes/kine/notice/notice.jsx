import React from 'react';
import styles from './notice.less';
import { connect } from 'dva';

class Notice extends React.Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'other/findMessageList',
            payload: { "pageNo": 1, "pageSize": 10 }
        })
    }

    loadMessage() {
        if (this.props.messageList.length > 0) {
            return this.props.messageList.map(item => {
                return <div className={styles.root} key={item.msgID}>
                    <div className={styles.msg}>{item.msgTitle}</div>
                    <div className={styles.time}>{item.operateDate + "-" + item.operateTime}</div>
                </div>
            })
        }
    }

    render() {
        return (
            <div style={{ padding: '13px 20px' }}>
                {this.loadMessage()}
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        messageList: state.other.messageList,
        props
    }
})(Notice)