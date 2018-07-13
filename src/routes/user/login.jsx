import React from 'react';
import InputLabel from './InputLabel';
import { routerRedux } from 'dva/router';
import Validator from '../../tool/Validator';
import { connect } from 'dva';
import md5 from "md5";
import { Modal } from 'antd';
import languageData from '../../language/index'
import styles from './login.less';
import singleStyle from './InputLabel.less';
import SlidingValidation from "../../components/sliding-validation"
import Img from "../../assets/yinghe/矢量智能对象@2x.png"
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEmailMsg: false,
            showWordMsg: false,
            errMsg: '',
            userName: '',
            password: "",

            visible:false

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

    loginFun(){
        this.props.dispatch({
            type: 'user/login',
            payload: {
                body: { userName: this.state.userName, password: md5(this.state.password), verification_code: '1231', extends: JSON.stringify({ isTrader: "3" }) },
                callback: (data) => {
                    if (data.errorCode == "0") {
                        this.pushRouter("/home")
                    } else {
                        this.setState({ errMsg: data.errorMsg, showWordMsg: true })
                    }
                }
            }
        })
    }
    sliding = ()=>{
        setTimeout(()=>{
            this.loginFun()
            this.setState({
                visible:false
            })
        },500)
    }
    LoginClick() {
        if (this.state.userName != "" && this.state.password != "" && this.state.showEmailMsg == false) {
            this.setState({
                visible:true
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
                    <div style={{ textAlign: "center", display: 'flex', display: '-webkit-flex', flexDirection: "row" }}>
                        <label style={{ flex: 1 }} className={singleStyle.label}>  </label>
                        <p className={styles.dl}>{languageData.Login}</p>
                    </div>
                    <input type="password" style={{ display: 'none' }} />

                    <InputLabel lab={languageData.YX} placeholder={languageData.QSSYX} value={this.state.userName} inputChange={value => this.inputChange(value)} showBorder={this.state.showEmailMsg} />


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
                    <Modal
                        width="354px"
                        closable={false}
                        footer={null}
                        title=""
                        visible={this.state.visible}
                        onOk={()=>{}}
                        onCancel={()=>this.setState({visible:false})}
                        >
                        <div style={{textAlign:"center"}}>
                            <img style={{marginBottom:"20px"}} src={Img}/>
                            {this.state.visible&&<SlidingValidation succeed={this.sliding}  succeedColr="#FDCC39"/>}
                        </div>
                        
                    </Modal>
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
