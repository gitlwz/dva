import React, { Component, PropTypes } from 'react';
import styles from './helpcenter.less';
import { Input } from 'antd';
import Logo from "../../assets/帮助中心.png";
import { Row, Col } from 'antd';
const Search = Input.Search;
/**
 * 帮助中心
 */
class HelpCenter extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount = () => {

    }
    render() {
        return (
            <div style={{ backgroundColor: "#F7F7F7" }}>
                <div className={styles.body}>
                    <div className={styles.title}>
                        <span style={{fontWeight:"1000"}}>帮助中心</span> > <span>常见问题</span>
                        <div className={styles.searchcontent + " searchcontent"}>
                            <Search
                                placeholder="输入搜索内容"
                                onSearch={value => console.log(value)}
                                enterButton
                            />
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.logo}>
                            <img className={styles.img} src={Logo} alt="" />
                            <div className={styles.log_text}>
                                <div className={styles.log_text1}>
                                    帮&emsp;助&emsp;中&emsp;心
                                </div>
                                <div className={styles.log_text2}>
                                    如何正确使用SUNDAX
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            <Row gutter={96}>
                                <Col className="gutter-row" span={8}>
                                    <div className={styles.gutter_box_title}>常&emsp;见&emsp;问&emsp;题</div>

                                    <div className={styles.gutter_box}>222</div>
                                    <div className={styles.gutter_box}>2222</div>
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    <div className={styles.gutter_box_title}>交&emsp;易&emsp;指&emsp;南</div>
                                
                                    <div className={styles.gutter_box}>222</div>
                                    <div className={styles.gutter_box}>2222</div>
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    <div className={styles.gutter_box_title}>安&emsp;全</div>
                                
                                    <div className={styles.gutter_box}>222</div>
                                    <div className={styles.gutter_box}>2222</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default HelpCenter