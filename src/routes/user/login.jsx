import React from 'react';
import InputLabel from './InputLabel';
import { routerRedux } from 'dva/router';
import Validator from '../../tool/Validator';
import { connect } from 'dva';
import md5 from "md5";
import languageData from '../../language/index'
import styles from './login.less';
import singleStyle from './InputLabel.less';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEmailMsg: false,
            showWordMsg: false,
            errMsg: '',
            userName: '',
            password: "",

        }
    }
    componentDidMount = () => {
        document.addEventListener('keydown', this.onkeydownEvent)
    }
    onkeydownEvent = (e) => {
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            this.LoginClick()
        }
    }
    inputChange(value) {
        if (!Validator.email(value)) {
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
        this.pushRouter("/user/forgetPassword")
    }
    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.onkeydownEvent)
    }
    render() {
        return (
            <div>
                <div className={styles.login}>
                    <div style={{ textAlign: "center", display: 'flex', display: '-webkit-flex',flexDirection: "row" }}>
                      <label style={{ flex: 1 }} className={singleStyle.label}>  </label>
                        <p className={styles.dl}>{languageData.Login}</p>
                    </div>
                    <input type="password" style={{ display: 'none' }} />

                    <InputLabel lab={languageData.YX} placeholder="请输入邮箱" value={this.state.userName} inputChange={value => this.inputChange(value)} showBorder={this.state.showEmailMsg} />


                    {this.state.showEmailMsg == true ? <p className={styles.errP}>{languageData.QSRYXDYXDZ}</p> : ''}


                    <InputLabel lab={languageData.MM} placeholder={languageData.QSRMM} value={this.state.password} type inputChange={value => this.setState({ password: value, showWordMsg: false })} showBorder={this.state.showWordMsg} />

                    {this.state.showWordMsg == true ? <p className={styles.errP}>{this.state.errMsg}</p> : ""}

                    <InputLabel isButton buttonName={languageData.Login} buttonClick={() => this.LoginClick()} />
                    <a style={{ textAlign: 'right', display: 'block', margin: '10px 0', color: 'white' }} href="javascript:void(0)" onClick={() => this.pushRouter("/user/forgetPassword")}>{languageData.WJMM}?</a>

                    <div className={styles.tooltip}>
                        <div>{languageData.HMYZH}</div>
                        <div>{languageData.CJYGZHJRSJ}</div>
                        <a style={{ color: '#FDCC39', textDecoration: 'underline' }} onClick={() => this.pushRouter("/user/regis")}>{languageData.DJZC}</a>
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
