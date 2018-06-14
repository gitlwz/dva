import React, { Component, PropTypes } from 'react';
import styles from './helpcenter.less';
import Logo from "../../assets/帮助中心.png";
import { Row, Col,Button ,Icon,Input} from 'antd';
import stylesmy from './searchresult.less';

const Search = Input.Search;
/**
 * 帮助中心
 */
class SearchResult extends Component {
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
                            <Row gutter={192}>
                                <Col className="gutter-row" span={14}>
                                    <div className={styles.gutter_box_title}>搜索结果<span className={stylesmy.result}>结果项：7条</span></div>

                                    <div className={styles.gutter_box}>222</div>
                                    <div className={styles.gutter_box}>2222</div>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <div className={stylesmy.content}>
                                        <div className={stylesmy.wt}>未找到你想要的？还有其他问题？</div>
                                        <Button href="/#/joinus" style={{backgroundColor:"#FECC39",borderColor:"#FECC39",color:"#565656"}} type="primary">联系我们<Icon type="caret-right" /></Button>
                                    </div>
                                    
                                </Col>
                                
                            </Row>
                        </div>
                    </div>
                    <div className={stylesmy.bz}>备注：搜索结果内容往下衍生</div>
                </div>
            </div>

        )
    }
}

export default SearchResult