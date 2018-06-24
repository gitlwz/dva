import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Input, message, Select, Button, Spin } from 'antd';
import style from './smSverification.less'
const { Option, OptGroup } = Select;
const InputGroup = Input.Group;
const Search = Input.Search;

/**
 * 资产管理
 */
class smSverification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0
        }
    }
    componentWillMount = () => {

    }
    test = (value) => {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(value)) {
            return false;
        } else {
            return true;
        }
    }
    yzTest = (value) => {
        var myreg = /^[0-9]{6}$/;     
        if (!myreg.test(value)) {
            return false;
        } else {
            return true;
        }
    }
    setTime = () => {
        setTimeout(() => {
            if (this.state.time <= 0) {
                return;
            }
            this.setState({
                time: this.state.time - 1
            })
            this.setTime()
        }, 1000)
    }
    inputChange = (e) => {
        if (this.test(e.target.value)) {
            this.props.dispatch({
                type: 'smSverification/save',
                payload: {
                    phoneError: {
                        show: false,
                        text: ""
                    }
                }
            })
        } else {
            this.props.dispatch({
                type: 'smSverification/save',
                payload: {
                    phoneError: {
                        show: true,
                        text: "请输入有效的手机号码"
                    }
                }
            })
        }
    }
    getCode = () => {
        if(!!this.props.userInfo.mobilePhone){
            this.props.dispatch({
                type: 'smSverification/bankBindingMessageSent',
                payload: {
                    params: this.props.userInfo.mobilePhone
                }
            })
            this.setState({
                time: 120
            }, this.setTime())
            return;
        }
        if (!!this.test(this.refs.input.input.value)) {
            this.props.dispatch({
                type: 'smSverification/registrerMessageSent',
                payload: {
                    params: this.refs.input.input.value
                }
            })
            this.setState({
                time: 120
            }, this.setTime())
        } else {
            this.props.dispatch({
                type: 'smSverification/save',
                payload: {
                    phoneError: {
                        show: true,
                        text: "请输入有效的手机号码"
                    }
                }
            })
        }
    }
    yzmChange = (e) =>{
        if (this.yzTest(e.target.value)) {
            this.props.dispatch({
                type: 'smSverification/save',
                payload: {
                    noteError: {
                        show: false,
                        text: ""
                    }
                }
            })
        } else {
            this.props.dispatch({
                type: 'smSverification/save',
                payload: {
                    noteError: {
                        show: true,
                        text: "请输入正确的验证码"
                    }
                }
            })
        }
    }
    //提交
    submint = () => {
        let yzm = this.refs.yzm.input.value;
        let phone = null;
        let type = 'smSverification/messageCheck';
        let parmas = [];
        if(!!this.props.userInfo.mobilePhone){
            phone = this.props.userInfo.mobilePhone;
            type = 'smSverification/resetGooleOrMessageCheck'
            parmas = ['1',yzm]
        }else{
            phone = this.refs.input.input.value;
            parmas = [yzm,this.props.userInfo.email,phone]
        }
        if(!this.test(phone)){
            this.props.dispatch({
                type: 'smSverification/save',
                payload: {
                    phoneError: {
                        show: true,
                        text: "请输入有效的手机号码"
                    }
                }
            })
            return
        }
        if(!this.yzTest(yzm)){
            this.props.dispatch({
                type: 'smSverification/save',
                payload: {
                    noteError: {
                        show: true,
                        text: "请输入正确的验证码！"
                    }
                }
            })
            return
        }
        if(!this.props.userInfo.email){
            message.error("请先登录！")
            return;
        }
        this.props.dispatch({
            type: type,
            payload: parmas
        })
    }
    render() {
        let showContent = {}
        if(!!this.props.userInfo.mobilePhone){
            showContent.text = "重新开启短信验证！"
            showContent.phone = false;
        }else{
            showContent.text = "绑定手机验证！"
            showContent.phone = true;
        }
         
        return (
            <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <Spin spinning={this.props.loading} size="large" >
                    <div className={style.content}>
                        <div className={style.title}>
                            {showContent.text}
                        </div>
                        <div className={style.detail}>
                            <div className={style.detail_content + " smSverification"}>
                                <div className={style.sj}>手机号码</div>
                                {showContent.phone?<Input ref="input" onChange={this.inputChange} placeholder="输入手机号码" />:<span style={{fontSize:"18px"}}>{this.props.userInfo.mobilePhone.slice(0,2) +"*******"+ this.props.userInfo.mobilePhone.slice(-2)}</span>}
                                <div style={{ visibility: this.props.phoneError.show ? "visible" : "hidden" }} className={style.error}>{this.props.phoneError.text}</div>

                                <div style={{ marginTop: "20px" }} className={style.sj}>验证码</div>
                                <Input
                                    ref="yzm"
                                    onChange={this.yzmChange}
                                    className={style.input}
                                    placeholder="输入验证码"
                                    size="large"
                                />
                                <Button disabled={this.state.time > 0 ? true : false} onClick={this.getCode} className="hqbtn">{this.state.time > 0 ? this.state.time + "后重新发送" : "获取验证码"}</Button>
                                <div style={{ visibility: this.props.noteError.show ? "visible" : "hidden" }} className={style.error}>{this.props.noteError.text}</div>
                                <div style={{ marginTop: "24px" }}>
                                    <Button onClick={this.submint} style={{ height: '40px', width: '100%', color: "#565656" }} type="primary">提交</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { loading, phoneError, noteError } = state.smSverification
    let {userInfo={}} = state.user
    return {
        userInfo,
        noteError,
        phoneError,
        loading,
        ...props,
    }
})(smSverification);