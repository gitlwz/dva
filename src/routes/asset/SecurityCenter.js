import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col,Button,Icon } from 'antd';
import style from './asset.less';
import styleA from './SecurityCenter.less';
class SecurityCenter extends Component{

    constructor(props) {
        super(props);
    }
    componentWillMount = () =>{
        this.props.dispatch({
            type: 'asset/queryClientApply'
        })
    }
    //验证通过
    checkcOrrect = () => {
        return(
            <div className={styleA.yz_content}>
                <Icon className={styleA.yz_check} type="check" />
            </div> 
        )
    }
    //邮箱验证
    _renderEmailVerify = () => {
        let {applyStatus} = this.props.userInfo;
        if(applyStatus > 1){
            return this.checkcOrrect();
        }else{
            return <div>邮箱验证未通过</div>
        }

    }
    //身份验证
    _renderIDCardVerify = () => {
        let {applyStatus} = this.props.userInfo;
        if(applyStatus > 2){
            return this.checkcOrrect();
        }else{
            return <div>身份验证未通过</div>
        }
    }

    //两步验证
    _renderTwoStepsVerify = () =>{
        let {applyStatus} = this.props.userInfo;
        switch (applyStatus) {
            case "1":
            case "2":
            case "3":
                return(
                    <div>两步验证未通过</div>
                )
            case "4":
                return(
                    <div>谷歌验证未开启 | 短信验证已开启</div>
                )
            case "5":
                return(
                    <div>谷歌验证已开启 | 短信验证未开启</div>
                )
            case "6":
                return this.checkcOrrect();
            default:
                break;
        }
    }
    render() {
        let {clientID,clientName, registeredName, applyStatus,accountPassword} = this.props.userInfo;
        if(!!clientID){
            clientName ="**" + clientName.substr(clientName.length-1,1);
            accountPassword = !!accountPassword?"******":"未设置";
        }
        return (
            <div style={{ display: this.props.currentSelect == "安全中心" ? "block" : "none" ,paddingTop: '53px'}}>
                
                <div className={style.right_title}>
                    安全中心
                    <span className={style.zh}>727770481@qq.com</span>
                </div>
                {!!clientID?<div className={style.right_bz}>
                    <div className={styleA.card}>
                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>姓名</Col>
                            <Col span={20}>{clientName}</Col>
                        </Row>
                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>用户ID</Col>
                            <Col span={20}>{clientID}</Col>
                        </Row>
                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>注册邮箱</Col>
                            <Col span={20}>{registeredName}</Col>
                        </Row>
                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>登录密码</Col>
                            <Col span={20}>
                                <span>{"******"}</span>
                                <Button className="asset_btn SecurityCenter_btn" type="primary">修改</Button>
                            </Col>
                        </Row>
                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>资金密码</Col>
                            <Col span={20}>
                                <span>{accountPassword}</span>
                                <Button className="asset_btn SecurityCenter_btn" type="primary">重置密码</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className={styleA.card}>
                        <div className={styleA.yz_title}>
                            <span>1</span>
                            <span>邮箱验证</span>
                        </div>
                        {this._renderEmailVerify()}
                    </div>
                    <div className={styleA.card}>
                        <div className={styleA.yz_title}>
                            <span>2</span>
                            <span>身份验证</span>
                        </div>
                        {this._renderIDCardVerify()}
                    </div>
                    <div className={styleA.card}>
                        <div className={styleA.yz_title}>
                            <span>3</span>
                            <span>两步验证</span>
                        </div>
                        {this._renderTwoStepsVerify()}
                    </div>
                </div>:null}
            </div>
        )
    }
}
export default connect((state, props) => {
    let {currentSelect,userInfo} = state.asset
    let {userId} = state.user
    return {
        userInfo,
        currentSelect,
        accountPassword:userId.accountPassword,
        ...props
    }
})(SecurityCenter);