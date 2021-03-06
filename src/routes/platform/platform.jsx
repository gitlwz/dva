import React, { Component } from 'react';
import styles from './platform.less';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import urlUtil from '../../utils/url';
import NationTitle from '../../components/nationTitle';
import PlatformDetail from './platformDetail';


var singleItem = {};

class Platform extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      msgID: '',
      pageNo: 1,
      pageSize: 10,
      detailData: {}
    }

    this.dataList = []
  }

  componentWillMount() {
    const parsed = urlUtil.strToObg(this.props.location.search);
    if (parsed && parsed.msgID) {
      this.setState({ msgID: parsed.msgID, showDetail: true })
    }
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
    this.dataList = this.props.messageList;
    if (this.state.msgID != "") {
      this.dataList = this.dataList.filter(item => item.msgID == this.state.msgID)
    };


    if (this.dataList.length > 0) {
      //this.setState({ detailData: dataList[0] || {} })
      return this.dataList.map((item) => {
        return <div className={styles.root} key={item.msgID} onClick={() => this.showDetail(item)}>
          <div className={styles.no}>NO.{item.number}</div>
          <div className={styles.right}>
            <div className={styles.msg}>{item.msgTitle}</div>
            <div className={styles.time}>{item.operateDate + " " + item.operateTime}</div>
          </div>
        </div>
      })
    }
  }

  changePage(actionType) {
    switch (actionType) {
      case 'minus': {
        this.setState({ pageNo: this.state.pageNo - 1 }, () => {
          this.findMessageList()
        })
        break;
      }
      case 'add': {
        this.setState({ pageNo: this.state.pageNo + 1 }, () => {
          this.findMessageList()
        })
        break;
      }
      default:
        break;
    }
  }

  loadPagination() {

    return (
      <Row type="flex" justify="center" gutter={24} align="middle" style={{ marginBottom: 15 }}>
        <Col>
          <button className={styles.returnButton} disabled={this.state.pageNo - 1 < 1 ? true : false} onClick={() => this.changePage('minus')}>上一页</button>
        </Col>
        <Col>
          <div className={styles.num}>{this.props.totalPage == 0 ? 0 : this.state.pageNo}/{this.props.totalPage}</div>
        </Col>
        <Col>
          <button className={styles.returnButton} disabled={this.state.pageNo + 1 > this.props.totalPage ? true : false} onClick={() => this.changePage('add')}>下一页</button>
        </Col>
      </Row>
    )

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
                {this.loadPagination()}
              </div>
              :
              <PlatformDetail item={this.dataList[0] || {}} onClick={this.toMainPage} />
          }
        </div>
      </div>
    )

  }

}

export default connect((state, props) => {
  return {
    messageList: state.other.messageList,
    totalPage: state.other.totalPage,
    props
  }
})(Platform)
