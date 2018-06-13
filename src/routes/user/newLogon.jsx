import React from 'react';
import { Button, Modal, Form, Input, message, Row, Col, Checkbox, Icon } from "antd";
import { connect } from 'dva';
import styles from './login.less'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEmailMsg: false,
            showWordMsg: false,
            errMsg: '',
            email: '',
            password: "",

        }
    }

    inputChange(value) {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (!reg.test(value)) {
            this.setState({ showEmailMsg: true, email: value })
        } else {
            this.setState({ email: value, showEmailMsg: false })
        }
    }

    login() {

        if (this.state.email != "" && this.state.password != "") {

        } else {
            if (this.state.email == "") {
                this.setState({ showEmailMsg: true });
            }
            if (this.state.password == "") {
                this.setState({ showWordMsg: true, errMsg: '请输入密码' });
            }
            return;
        }

    }

    render() {
        return (
            <div>
                <div className={styles.login}>
                    <div style={{ textAlign: 'center' }}>
                        <p className={styles.dl}>登录</p>
                    </div>

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }} className={styles.label}>邮箱地址</label>
                        <input placeholder="请输入邮箱" type="text" value={this.state.email} onChange={e => this.inputChange(e.target.value)} className={this.state.showEmailMsg ? styles.errInput : ''} />
                    </div>
                    {this.state.showEmailMsg == true ? <p style={{ textAlign: 'right' }}>请输入有效的邮箱地址</p> : ''}

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }} className={styles.label}>密码</label>
                        <input placeholder="请输入密码" type="password" className={this.state.showWordMsg ? styles.errInput : ''} value={this.state.password} onChange={e => this.setState({ password: e.target.value, showWordMsg: false })} />
                    </div>
                    {this.state.showWordMsg == true ? <p style={{ textAlign: 'right' }}>{this.state.errMsg}</p> : ""}

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }}></label>
                        <button className={styles.logBtn} style={{ color: '#FFF' }} onClick={() => this.login()}>登录</button>
                    </div>

                    <a style={{ textAlign: 'right', display: 'block', margin: '10px 0' }} href="javascript:void(0)">忘记密码？</a>

                    <div className={styles.tooltip}>
                        <p>还没有账户？</p>
                        <p >创建一个账户加入世界最活跃的交易平台</p>
                        <a>点击注册</a>
                    </div>
                </div>
            </div>

        )
    }

}

export default Login;