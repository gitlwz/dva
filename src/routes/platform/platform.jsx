import React, { Component } from 'react';
import styles from './platform.less';
import { Pagination } from 'antd';
import { connect } from 'dva';
import NationTitle from '../../components/nationTitle';
import PlatformDetail from './platformDetail';


var singleItem = [];

class Platform extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      msgID: '',
      pageNo: 1,
      pageSize: 10
    }
  }

  componentDidMount() {
    this.findMessageList()
  }

  findMessageList() {
    this.props.dispatch({
      type: 'other/findMessageList',
      payload: {
        pageNo: this.state.pageNo,
        pageSize: this.state.pageSize
      }
    })
  }

  showDetail = (item) => {
    this.setState({
      showDetail: true,
      msgID: item.msgID
    })
    singleItem = item;
  }

  toMainPage = () => {
    this.setState({
      showDetail: false,
      msgID: ''
    })
  }


  loadMessage() {
    let dataList = this.props.messageList;
    if (this.state.msgID != "") {
      dataList = dataList.filter(item => item.msgID == this.state.msgID)
    };
    if (dataList.length > 0) {
      return dataList.map((item) => {
        return <div className={styles.root} key={item.msgID} onClick={() => this.showDetail(item)}>
          <div className={styles.no}>NO.{item.msgID}</div>
          <div className={styles.right}>
            <div className={styles.msg}>{item.msgTitle}</div>
            <div className={styles.time}>{item.operateDate + " " + item.operateTime}</div>
          </div>
        </div>
      })
    }
  }

  render() {
    return (
      <div className={styles.platform}>
        <NationTitle title="公告" />
        <div className={styles.content}>
          {this.loadMessage()}
          {
            !this.state.showDetail ?
              <div className={styles.custom}>
                <Pagination
                  simple
                  current={this.props.messageList.length == 0 ? 0 : this.state.pageNo}
                  total={this.props.messageList.length}
                  onChange={(page, pageSize) => this.setState({ pageNo: page, pageSize: pageSize }, () => {
                    this.findMessageList()
                  })}
                />
              </div>
              :
              <PlatformDetail item={singleItem} onClick={this.toMainPage} />
          }
        </div>
      </div>
    )

  }

}

export default connect((state, props) => {
  return {
    messageList: state.other.messageList,
    props
  }
})(Platform)
