import React from 'react';
import InputLabel from './InputLabel';
import { routerRedux } from 'dva/router';
import Validator from '../../tool/Validator';
import md5 from "md5";
import styles from './forgetPassword.less';
import styleInput from './InputLabel.less';
import { connect } from 'dva';

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEmailMsg: false,
            showCodeMsg: false,
            showConformMsg: false,
            showWordMsg: false,

            email: "",
            code: '',
            password: '',
            confirmWord: '',
            errMsg: '',

            buttonTitle: "发送验证码",
        }
    }


    //动态校验
    inputChange(parms) {
        switch (parms.name) {
            case "code":
                if (this.state.code == "") {
                    this.setState({ showCodeMsg: true, code: parms.value })
                } else {
                    this.setState({ code: parms.value, showCodeMsg: false })
                }
                break;
            case "email":
                if (Validator.email(parms.value)) {
                    this.setState({ showEmailMsg: false, email: parms.value })
                } else {
                    this.setState({ email: parms.value, showEmailMsg: true })
                }
                break;
            case "password":
                if (Validator.password(parms.value) == true) {
                    if (this.state.confirmWord != parms.value) {
                        this.setState({ password: parms.value, showWordMsg: false, showConformMsg: true })
                    } else {
                        this.setState({ password: parms.value, showWordMsg: false })
                    }
                } else {
                    this.setState({ password: parms.value, showWordMsg: true })
                }
                break;
            case "confirmWord":
                if (this.state.password != parms.value) {
                    this.setState({ confirmWord: parms.value, showConformMsg: true })
                } else {
                    this.setState({ confirmWord: parms.value, showConformMsg: false })
                }
                break;
            default:
                break;
        }
    }


    //修改密码
    btnClick() {
        if (this.state.email != "" && this.state.code != "" && this.state.password != "" & this.state.confirmWord != "" && this.state.showCodeMsg == false &&
            this.state.showConformMsg == false && this.state.showEmailMsg == false && this.state.showWordMsg == false) {
            this.props.dispatch({
                type: 'user/resetPassword',
                payload: {
                    body: [this.state.password, md5(this.state.password), this.state.code],
                    callback: (data) => {
                        if (data.errorCode == "0") {
                            this.props.dispatch(routerRedux.push("/user/login"))
                        } else {
                            this.setState({ errMsg: data.errorMsg })
                        }
                    }
                }
            })
        } else {
            if (this.state.code == "") {
                this.setState({ showCodeMsg: true })
            }
            if (this.state.email == "") {
                this.setState({ showEmailMsg: true })
            }
            if (this.state.password == "") {
                this.setState({ showWordMsg: true })
            }
            if (this.state.confirmWord == "") {
                this.setState({ showConformMsg: true })
            }
            return;
        }

    }

    //获取验证码
    loadButton() {
        let buttonStyle = { background: '#FFD965' };
        if (this.state.email != "" && this.state.showEmailMsg == false) {
            buttonStyle = { background: '#FDCC39' }
        }
        return <button className={styles.buttonCode} style={{ ...buttonStyle }} onClick={(e) => {
            if (this.state.email != "" && this.state.showEmailMsg == false) {
                this.props.dispatch({
                    type: 'user/getVerification',
                    payload: {
                        email: [this.state.email],
                        callback: (data) => {
                            if (data.errorCode == "0") {
                                let index = 60;
                                this.timer = setInterval(() => {
                                    index -= 1;
                                    if (index == 0) {
                                        this.setState({ buttonTitle: "发送验证码" });
                                        buttonStyle = { background: '#FFD965' };
                                        clearInterval(this.timer)
                                    } else {
                                        this.setState({ buttonTitle: index + "重新发送" })
                                    }

                                }, 1000)
                            } else {
                                this.setState({ errMsg: data.errorMsg })
                            }
                        }
                    }
                })

            } else {
                this.setState({ showEmailMsg: true })
            }
        }} disabled={this.state.buttonTitle != "发送验证码" ? true : false}>{this.state.buttonTitle}</button>
    }

    render() {

        return <div className={styles.root}>
            <div style={{ textAlign: 'center' }}>
                <p className={styles.title}>找回密码</p>
            </div>
            <InputLabel lab="邮件地址" placeholder="请输入邮箱" value={this.state.email} inputChange={value => this.inputChange({ value: value, name: "email" })} showBorder={this.state.showEmailMsg} />
            {this.state.showEmailMsg == true ? <p className={styles.errP}>请输入有效的邮箱地址</p> : ''}
            <div className={styleInput.flex}>
                <label style={{ flex: 1 }} className={styleInput.label}>验证码</label>
                <input type="text" className={styles.code} value={this.state.code} style={{ border: this.state.showCodeMsg ? '1px solid rgba(255,66,0,1)' : '' }} onChange={e => this.inputChange({ value: e.target.value, name: "code" })} />
                {this.loadButton()}
            </div>
            {this.state.showCodeMsg == true ? <p className={styles.errP}>请输入有限验证码</p> : ''}
            <InputLabel lab="新密码" placeholder="请输入密码" type value={this.state.password} inputChange={value => this.inputChange({ value: value, name: "password" })} showBorder={this.state.showWordMsg} />
            {this.state.showWordMsg == true ?
                <div className={styleInput.flex}>
                    <div style={{ flex: 1 }}></div>
                    <div className={styles.mmbg}>
                        <p><span>!</span>您的密码长度6-24个字符</p>
                        <p><span>!</span>必须包含大写字母</p>
                        <p><span>!</span>必须包含小写字母</p>
                        <p><span>!</span>必须包含数字</p>
                    </div>
                </div> : ''}
            <InputLabel lab="确认密码" placeholder="请输入密码" type value={this.state.confirmWord} inputChange={value => this.inputChange({ value: value, name: "confirmWord" })} showBorder={this.state.showConformMsg} />
            {this.state.showConformMsg == true ? <p className={styles.errP}>请输入相同密码</p> : ''}
            {this.state.errMsg != "" ?
                <div className={styleInput.flex}>
                    <label style={{ flex: 1 }}></label>
                    <p className={styles.errP}>{this.state.errMsg}</p>
                </div> : ''}
            <InputLabel isButton buttonName="确定" buttonClick={() => this.btnClick()} />

        </div>
    }
}

export default connect()(ForgetPassword)  