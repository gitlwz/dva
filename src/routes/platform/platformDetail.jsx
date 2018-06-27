import React, { Component } from 'react';
import styles from './platform.less';
import { Row, Col } from 'antd';

class PlatformDetail extends Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    return (
      <div>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: this.props.item.msgBody }}/></pre>
        <Row type="flex" justify="center" align="middle">
          <button className={styles.returnButton} onClick={this.props.onClick}>返回</button>
        </Row>
      </div>
    )
  }
}

export default PlatformDetail
