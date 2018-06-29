import React from 'react';
import { connect } from 'dva';
import InputLabel from './InputLabel';
import { routerRedux, Link } from 'dva/router';
import Validator from '../../tool/Validator';
import md5 from "md5";
import styles from './regisx.less'

class Regis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCountryMsg: false,
            showEmailMsg: false,
            showWordMsg: false,
            showConformMsg: false,

            country: '中国',
            email: '',
            password: '',
            confirmWord: '',
            check: true,

            errMsg: ''
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'user/queryCountryList',
        })
    }

    //动态校验提示
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
                var reg1 = /(?=^.{6,20}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?!.*[!@#$%^&*? ])(?!.*\n).*$/;
                if (reg1.test(parms.value)) {
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
        if (this.state.check == false) {
            this.setState({ errMsg: "请先阅读并同意!" })
            return;
        }
        if (this.state.country != "" && this.state.email != "" && this.state.password != "" & this.state.confirmWord != "" && this.state.showConformMsg == false &&
            this.state.showCountryMsg == false && this.state.showEmailMsg == false && this.state.showWordMsg == false) {
            this.props.dispatch({
                type: 'user/regis',
                payload: {
                    body: [this.state.email, md5(this.state.password), this.state.country],
                    callback: (data) => {
                        if (data.errorCode == "0") {
                            this.pushRouter("/user/login")
                        } else {
                            this.setState({ errMsg: data.errorMsg })
                        }

                    }
                }
            })
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

    loadTipView() {
        const divStyle = { fontSize: '13px', lineHeight: '24px', color: '#FFFFFF' }
        if (this.state.password != "" && this.state.showWordMsg == false) {
            return <div style={{ ...divStyle, marginTop: 80 }}>
                <p style={{ color: '#FDCC39', fontSize: 16, textAlign: 'center' }}>提醒!</p>
                切勿将密码用于其他任何地方的交易所,尤其是您注册的电子邮件地址
            </div>
        }
        return <div style={{ ...divStyle }}>
            <p style={{ color: '#FDCC39', fontSize: 16, textAlign: 'center' }}>提醒!</p>
            您提供的电子邮件地址将成为您的SUNDAX的ID，并将用于未来的所有通信，包括账户恢复。 像保护你的SUNDAX账户一样保护你的电子邮件账户。 使用一次性电子邮件地址注册将被拒绝
            </div>
    }

    pushRouter(url) {
        this.props.dispatch(routerRedux.push(url))
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
                        <select value={this.state.country} className={styles.select} onChange={e => this.inputChange({ value: e.target.value, name: 'country' })} style={{ border: showCountryMsg ? styles.errInput : '' }}>
                            <option value="">请选择国籍</option>
                            {this.props.countryList.map(item => {
                                return <option value={item.countryCN} key={item.id}>{item.countryCN}</option>
                            })}
                        </select>
                    </div>
                    {showCountryMsg == true ? <p className={styles.errP}>请选择国籍</p> : ''}

                    <InputLabel lab="邮箱地址" placeholder="请输入邮箱" value={this.state.email} inputChange={value => this.inputChange({ value: value, name: 'email' })} showBorder={showEmailMsg} />

                    {showEmailMsg == true ? <p className={styles.errP}>请输入有效的邮箱地址</p> : ''}

                    {showWordMsg == true ?
                        <div className={styles.flex}>
                            <div style={{ flex: 1 }}></div>
                            <div className={styles.mmbg}>
                                <p><span>!</span>您的密码长度6-24个字符</p>
                                <p><span>!</span>必须包含大写字母</p>
                                <p><span>!</span>必须包含小写字母</p>
                                <p><span>!</span>必须包含数字</p>
                            </div>
                        </div> : ''}
                    <input type="password" style={{ display: 'none' }} />

                    <InputLabel lab="密码" placeholder="请输入密码" type value={this.state.password} inputChange={value => this.inputChange({ value: value, name: 'password' })} showBorder={showWordMsg} />

                    <InputLabel lab="确认密码" placeholder="请确认密码" type value={this.state.confirmWord} inputChange={value => this.inputChange({ value: value, name: 'confirmWord' })} showBorder={showConformMsg} />

                    {showConformMsg == true ? <p className={styles.errP}>请输入相同密码</p> : ''}

                    <div className={styles.flex}>
                        <label style={{ flex: 1 }}></label>
                        <div style={{ color: '#FFF', fontSize: '13px', width: '336px', marginTop: 15, display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <div className={styles.checkbox}>
                                <input type="checkbox" id="checkbox" checked={this.state.check} value={this.state.check} onChange={e => this.setState({ check: e.target.checked })} />
                                <label >我已阅读并同意</label>
                            </div>
                        </div>
                    </div>

                    {this.state.errMsg != "" ?
                        <div className={styles.flex}>
                            <label style={{ flex: 1 }}></label>
                            <p style={{ width: '336px' }} className={styles.errP}>{this.state.errMsg}</p>
                        </div> : ''}

                    <InputLabel isButton buttonName="注册" buttonClick={() => this.regis()} />


                    <div className={styles.errP}>
                        <Link to="/stipulation?copyright">法律声明</Link>
                        <Link to="/stipulation?userAgreement" className={styles.aSelect}>用户条款</Link>
                        <Link to="/stipulation?privacy">隐私保护</Link>
                    </div>

                    <div className={styles.tooltip}>
                        <div></div>
                        {this.loadTipView()}
                    </div>
                </div>
            </div>

        )
    }

}

export default connect((state, props) => {
    return {
        countryList: state.user.countryList,
        props
    }
})(Regis);