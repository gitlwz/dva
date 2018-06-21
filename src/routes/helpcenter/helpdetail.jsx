import React, { Component, PropTypes } from 'react';
import styles from './helpdetail.less';
import NationTitle from '../../components/nationTitle';
import { Input } from 'antd';
import { connect } from 'dva';
const Search = Input.Search;
class HelpDetail extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount = () =>{
        this.props.dispatch({
            type: 'helpcenter/findAllPushHelpCenterByCondition',
            payload: {
                params :null
            }
        })
        this.props.dispatch({
            type: 'helpcenter/getHelpCenterById',
            payload: {
                id :this.props.match.params.id
            }
        })
    }
    onSearch = (value) =>{
        if(!!value){
            this.props.history.push("/searchresult/"+value)
        }
    }
    rightItemClick = (id) =>{
        if(!!id){
            this.props.history.push("/helpdetail/"+id)
        }
    }
    render() {
        let rightList = this.props.findAll.sort(function(a,b){
            return (b.addUp||0)-(a.addUp||0);
        })
        return (
            <div style={{backgroundColor:"#F7F7F7"}}>
                <div className={styles.body}>
                    <div className={styles.left}>
                        <div>
                            <span>帮助中心</span> > <span style={{fontWeight:"1000"}}>常见问题</span>
                        </div>    
                        <div className={styles.left_content}>
                            <div style={{ margin: '0 auto', height: '60px', color: '#565656', background: '#FECC39', borderRadius: '10px', fontSize: "30px", display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>{this.props.detail.helpTitle}</div>
                            <div className={styles.left_body}>
                                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                    <p dangerouslySetInnerHTML={{ __html: this.props.detail.helpBody }}  />
                                </pre>
                            </div>
                        </div>
                    
                    </div>
                    <div className={styles.right}>
                        <div className={styles.searchcontent + " searchcontent"}>
                            <Search
                                placeholder="输入搜索内容"
                                onSearch={this.onSearch}
                                enterButton
                            />
                        </div>
                        <div className={styles.right_content}>
                            <div className={styles.right_title}>
                                本文内容导航
                            </div>
                            {rightList.map((ele)=>(
                                <div key={ele.Id} onClick={()=>this.rightItemClick(ele.Id)} className={styles.right_item}>
                                    {ele.helpTitle}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { findAll,detail } = state.helpcenter
    
    return {
        findAll,
        detail,
        ...props
    }
})(HelpDetail);