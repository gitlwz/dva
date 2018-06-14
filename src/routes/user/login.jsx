import React from 'react';
import { Button, Modal, Form, Input, message, Row, Col, Checkbox, Icon } from "antd";
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import md5 from "md5";
import styles from './login.less'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currLanguage: "China",
            showEmailMsg: false,
            showWordMsg: false,
            errMsg: '',
            userName: '',
            password: "",

        }
    }

    inputChange(value) {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (!reg.test(value)) {
            this.setState({ showEmailMsg: true, userName: value })
        } else {
            this.setState({ userName: value, showEmailMsg: false })
        }
    }


    LoginClick() {
        if (this.state.userName != "" && this.state.password != "" && this.state.showEmailMsg == false) {
            this.props.dispatch({
                type: 'user/login',
                payload: {
                    body: { userName: this.state.userName, password: md5(this.state.password), verification_code: '123', extends: JSON.stringify({ isTrader: "3" }) },
                    callback: (data) => {
                        if (data.errorCode == "0") {
                            this.pushRouter("/home")
                        } else {
                            this.setState({ errMsg: data.errorMsg, showWordMsg: true })
                        }
                    }
                }
            })
            //LoginService.userLogon(this.state.userName, md5(this.state.password), "1234").then(res => this.pushRouter("/")).catch(err => this.setState({ errMsg: err.errorMsg, showWordMsg: true }))
        } else {
            if (this.state.userName == "") {
                this.setState({ showEmailMsg: true });
            }
            if (this.state.password == "") {
                this.setState({ showWordMsg: true, errMsg: '请输入密码' });
            }
            return;
        }
    }

    pushRouter(url) {
        this.props.dispatch(routerRedux.push(url))
    }

    forgetPass() {
        let mail = this.state.userName;
        var filter = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (!filter.test(mail)) {
            message.error("请输入邮箱!")
            return;
        }
        this.pushRouter("./user/forgetPassword?mail=" + this.state.userName)
    }

    render() {
        return (
            <div>
                <div className={styles.login}>
                    <div style={{ textAlign: 'center' }}>
                        <p className={styles.dl}>登录</p>
                    </div>
                    <input type="password" style={{ display: 'none' }} />
                    <div className={styles.flex}>
                        <label style={{ flex: 1 }} className={styles.label}>邮箱地址</label>
                        <input placeholder="请输入邮箱" type="text" value={this.state.userName} onChange={e => this.inputChange(e.target.value)} className={this.state.showEmailMsg ? styles.errInput : ''} />
                    </div>
                    {this.state.showEmailMsg == true ? <p style={{ textAlign: 'right', marginBottom: 10 }}>请输入有效的邮箱地址</p> : ''}

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }} className={styles.label}>密码</label>
                        <input placeholder="请输入密码" type="text" className={this.state.showWordMsg ? styles.errInput : ''} value={this.state.password} onChange={e => {
                            e.target.type = "password";
                            this.setState({ password: e.target.value, showWordMsg: false })
                        }} />
                    </div>
                    {this.state.showWordMsg == true ? <p style={{ textAlign: 'right' }}>{this.state.errMsg}</p> : ""}

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }}></label>
                        <button className={styles.logBtn} style={{ color: '#FFF' }} onClick={() => this.LoginClick()}>登录</button>
                    </div>

                    <a style={{ textAlign: 'right', display: 'block', margin: '10px 0', color: 'white' }} href="javascript:void(0)" onClick={() => {
                        if (this.state.userName != "" && this.state.showEmailMsg == false) {
                            this.pushRouter("./user/forgetPassword?mail=" + this.state.userName)
                        } else {
                            this.setState({ showEmailMsg: true })
                        }
                    }}>忘记密码？</a>

                    <div className={styles.tooltip}>
                        <div>还没有账户？</div>
                        <div>创建一个账户加入世界最活跃的交易平台</div>
                        <a style={{ color: '#FDCC39', textDecoration: 'underline' }} onClick={() => this.pushRouter("/user/regis")}>点击注册</a>
                    </div>
                </div>
            </div>

        )
    }

}

export default connect((state, props) => {
    return {
        props
    }
})(Login);