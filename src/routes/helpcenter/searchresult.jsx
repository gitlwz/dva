import React, { Component, PropTypes } from 'react';
import styles from './helpcenter.less';
import Logo from "../../assets/帮助中心.png";
import { Link } from 'dva/router';
import { Row, Col, Button, Icon, Input } from 'antd';
import stylesmy from './searchresult.less';
import { connect } from 'dva';
const Search = Input.Search;
/**
 * 帮助中心
 */
class SearchResult extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount = () => {
        this.props.dispatch({
            type: 'helpcenter/findAllPushHelpCenterByCondition',
            payload: {
                params: this.props.match.params.search
            }
        })
    }
    onSearch = (value) => {
        if (!!value) {
            this.props.history.push("/searchresult/" + value)
        }
    }
    itemClick = (id) => {
        if (!!id) {
            this.props.history.push("/helpdetail/" + id)
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: "#F7F7F7" }}>
                <div className={styles.body}>
                    <div className={styles.title}>
                        <span style={{ fontWeight: "1000" }}>帮助中心</span> > <span>常见问题</span>
                        <div className={styles.searchcontent + " searchcontent"}>
                            <Search
                                defaultValue={this.props.match.params.search}
                                placeholder="输入搜索内容"
                                onSearch={this.onSearch}
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
                                    <div className={styles.gutter_box_title}>搜索结果<span className={stylesmy.result}>结果项：{this.props.findAllSearch.length}条</span></div>
                                    {this.props.findAllSearch.map((ele => (
                                        <div key={ele.Id} onClick={() => this.itemClick(ele.Id)} className={styles.gutter_box}>{ele.helpTitle}</div>
                                    )))}
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <div className={stylesmy.content}>
                                        <div className={stylesmy.wt}>未找到你想要的？还有其他问题？</div>
                                        <Link to="/contactUs" style={{ backgroundColor: "#FECC39", borderColor: "#FECC39", color: "#565656" }} type="primary">联系我们<Icon type="caret-right" /></Link>
                                    </div>

                                </Col>

                            </Row>
                        </div>
                    </div>
                    {/*<div className={stylesmy.bz}>备注：搜索结果内容往下衍生</div>*/}
                </div>
            </div>

        )
    }
}

export default connect((state, props) => {
    let { findAllSearch } = state.helpcenter
    return {
        findAllSearch,
        ...props
    }
})(SearchResult);
