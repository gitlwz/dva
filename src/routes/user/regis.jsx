import React from 'react';
import { Button, Modal, Form, Input, message, Row, Col, Checkbox, Icon } from "antd";
import { connect } from 'dva';
import styles from './regisx.less'

class Regis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCountryMsg: false,
            showEmailMsg: false,
            showWordMsg: false,
            showConformMsg: false,

            country: '',
            email: '',
            password: '',
            confirmWord: '',
            check: false
        }
    }

    inputChange(parms) {
        switch (parms.name) {
            case "country":
                this.setState({ country: parms.value, showCountryMsg: false })
                break;
            case "email":
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if (!reg.test(parms.value)) {
                    this.setState({ showEmailMsg: true, email: parms.value })
                } else {
                    this.setState({ email: parms.value, showEmailMsg: false })
                }
                break;
            case "password":
                var reg1 = /\d[a-zA-Z]|[a-zA-Z]\d/;
                var reg2 = /^[\da-zA-Z]{6,20}$/;
                if (reg1.test(parms.value) && reg2.test(parms.value)) {
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


    regis() {

        if (this.state.country != "" && this.state.email != "" && this.state.password != "" & this.state.confirmWord != "") {

        } else {
            if (this.state.country == "") {
                this.setState({ showCountryMsg: true })
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

    render() {
        const { showConformMsg, showCountryMsg, showEmailMsg, showWordMsg } = this.state;
        return (
            <div>
                <div className={styles.login}>
                    <div style={{ textAlign: 'center' }}>
                        <p className={styles.zc}>邮箱注册</p>
                    </div>

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }}>国籍</label>
                        <select value={this.state.country} className={showCountryMsg ? styles.errInput : ''} onChange={e => this.inputChange({ value: e.target.value, name: 'country' })}>
                            <option>请选择国籍</option>
                            <option>中国</option>
                            <option>美国</option>
                            <option>日本</option>
                        </select>
                    </div>
                    {this.state.showCountryMsg == true ? <p style={{ textAlign: 'right' }}>请选择国籍</p> : ''}

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }}>邮箱地址</label>
                        <input placeholder="请输入邮箱" type="text" className={showEmailMsg ? styles.errInput : ''} value={this.state.email} onChange={e => this.inputChange({ value: e.target.value, name: 'email' })} />
                    </div>
                    {this.state.showEmailMsg == true ? <p style={{ textAlign: 'right' }}>请输入有效的邮箱地址</p> : ''}

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }}>密码</label>
                        <input placeholder="请输入密码" type="password" className={showWordMsg ? styles.errInput : ''} value={this.state.password} onChange={e => this.inputChange({ value: e.target.value, name: 'password' })} />
                    </div>
                    {this.state.showWordMsg == true ? <p style={{ textAlign: 'right' }}>您的密码长度必须在6-20且必须包含大写字母和小写字母以及数字</p> : ''}

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }}>确认密码</label>
                        <input placeholder="请确认密码密码" type="password" className={showConformMsg ? styles.errInput : ''} value={this.state.confirmWord} onChange={e => this.inputChange({ value: e.target.value, name: 'confirmWord' })} />
                    </div>

                    {this.state.showConformMsg == true ? <p style={{ textAlign: 'right' }}>请输入相同密码密码</p> : ''}
                    <div className={styles.flex}>
                        <label style={{ flex: 1 }}></label>
                        <div style={{ color: '#FFF', fontSize: '13px', width: '336px', marginTop: 15 }}>
                            <input style={{ width: 16, height: 16, verticalAlign: 'middle' }} type="checkbox" value={this.state.check} onChange={e => this.setState({ check: e.target.checked })} />  <span style={{ verticalAlign: 'middle' }}>我已阅读并同意</span>
                        </div>
                    </div>

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }}></label>
                        <button className={styles.logBtn} style={{ color: '#FFF' }} onClick={() => this.regis()}>注册</button>
                    </div>

                    <div style={{ textAlign: 'right', marginTop: 10 }}>
                        <a>免费声明</a>
                        <a style={{ color: '#FDCC39', margin: '0 10px' }}>服务条款</a>
                        <a>隐私保护</a>
                    </div>

                    <div className={styles.tooltip}>
                        <div style={{ fontSize: '13px', lineHeight: '24px' }}>
                            您提供的电子邮件地址将成为您的GALAXY的ID，并将用于未来的所有通信，包括账户恢复。 像保护你的GALAXY账户一样保护你的电子邮件账户。 使用一次性电子邮件地址注册将被拒绝
                       </div>
                    </div>
                </div>
                <style>


                </style>
            </div>

        )
    }

}

export default Regis;