import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import dark from './dark.less';
import light from './light.less';

class Notice extends React.Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'other/findMessageList',
            payload: { "pageNo": 1, "pageSize": 10 }
        })
    }

    loadMessage() {
        let styles = this.props.theme == "dark" ? dark : light;
        if (this.props.messageList.length > 0) {
            return this.props.messageList.map(item => {
                return <div className={styles.root} key={item.msgID} onClick={() => this.props.dispatch(routerRedux.push("/Platform?msgID=" + item.msgID))}>
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
        theme: state.app.theme,
        messageList: state.other.messageList,
        props
    }
})(Notice)