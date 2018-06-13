import React, { Component, PropTypes } from 'react';
import styles from './helpdetail.less';
import NationTitle from '../../components/nationTitle';
import { Input } from 'antd';
const Search = Input.Search;
class HelpDetail extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount = () =>{
        console.log("*******",this.props.match.params.id)
    }
    render() {
        return (
            <div style={{backgroundColor:"#F7F7F7"}}>
                <div className={styles.body}>
                    <div className={styles.left}>
                        <div>
                            <span>帮助中心</span> > <span style={{fontWeight:"1000"}}>常见问题</span>
                        </div>    
                        <div className={styles.left_content}>
                            <div style={{ margin: '0 auto', height: '60px', color: '#565656', background: '#FECC39', borderRadius: '10px', fontSize: "30px", display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>{'如何将小额资产 兑换成BNB'}</div>
                            <div className={styles.left_body}>
                                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                每个火币用户都可生成自己的邀请链接，邀请新用户注册火币。
被邀请用户注册成功并进行交易后，交易所会将交易手续费的一部分返还给邀请人做为佣金。

获取返佣教程：
1.【进入邀请页面】
在网站右上角，找到【我的邀请码】，点击进入【邀请页面】；

2.【获取个人邀请码】
在【邀请页面】通过以下2种方式邀请新用户：
1. 将我的邀请码发送给被邀请人，被邀请人注册时在注册页面填写该邀请码；
2. 将社交媒体的邀请链接直接发送给被邀请人，被邀请人通过链接注册时系统会自动填写邀请码；
3.【邀请记录】
点击【邀请页面】中【邀请记录】查看被邀请用户的注册成功状态，被邀请用户注册成功后，显示在此页面；
4.【返佣记录】
点击【邀请页面】中【返佣记录】查看返佣的具体信息
被邀请用户注册成功并进行交易后，平台会计算该笔交易的返佣金额，并在次日划转至用户账户中；返佣以USDT、点卡的形式进行发放；
如果被邀请用户使用非点卡支付交易费用，则用户获得的佣金为USDT；
如果被邀请用户使用点卡支付交易费用，则用户获得的佣金为点卡。
                                </pre>
                            </div>
                        </div>
                    
                    </div>
                    <div className={styles.right}>
                        <div className={styles.searchcontent + " searchcontent"}>
                            <Search
                                placeholder="输入搜索内容"
                                onSearch={value => console.log(value)}
                                enterButton
                            />
                        </div>
                        <div className={styles.right_content}>
                            <div className={styles.right_title}>
                                本文内容导航
                            </div>
                            <div className={styles.right_item}>
                                2222
                            </div>
                            <div className={styles.right_item}>
                                2222
                            </div>
                            <div className={styles.right_item}>
                                2222
                            </div>
                            <div className={styles.right_item}>
                                2222
                            </div>
                        </div>
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
            </div>
        )
    }
}
export default HelpDetail