import React, { Component, PropTypes } from 'react';
import styles from './helpcenter.less';
import { Input } from 'antd';
import Logo from "../../assets/帮助中心.png";
import { Row, Col } from 'antd';
import { connect } from 'dva';
const Search = Input.Search;
/**
 * 帮助中心
 */
class HelpCenter extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount = () => {
        this.props.dispatch({
            type: 'helpcenter/findAllPushHelpCenterByCondition',
            payload: {
                params :null
            }
        })
    }
    itemList = (title) =>{
        let listArr =  this.props.findAll.filter((ele)=> ele.questionType === title);
        return listArr.map((ele,index)=>(
                <div onClick={()=>this.itemClick(ele.Id)} key={index} className={styles.gutter_box}>{ele.helpTitle}</div>
            ))
    }
    itemClick = (id) => {
        if(!!id){
            this.props.history.push("/helpdetail/"+id)
        }
    }
    onSearch = (value) =>{
        if(!!value){
            this.props.history.push("/searchresult/"+value)
        }
    }
    render() {
        let titleArr = Array.from(new Set(this.props.findAll.map((ele)=> ele.questionType)));
        if(titleArr.length > 3){
            titleArr.length = 3;
        }
        return (
            <div style={{ backgroundColor: "#F7F7F7" }}>
                <div className={styles.body}>
                    <div className={styles.title}>
                        <span style={{fontWeight:"1000"}}>帮助中心</span> > <span>常见问题</span>
                        <div className={styles.searchcontent + " searchcontent"}>
                            <Search
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
                            <Row gutter={96}>
                                {titleArr.map((ele)=>{
                                    return(
                                        <Col key={ele} className="gutter-row" span={8}>
                                            <div className={styles.gutter_box_title}>{ele}</div>
                                            {this.itemList(ele)}
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { findAll } = state.helpcenter
    console.log("findAll",findAll)
    return {
        findAll,
        ...props
    }
})(HelpCenter);