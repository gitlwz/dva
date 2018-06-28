import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Icon, Select, message } from 'antd';
import style from './asset.less';
import styleA from './SecurityCenter.less';
const Option = Select.Option;

class SecurityCenter extends Component {

    constructor(props) {
        super(props);
        this.selectValue = '1';
    }
    componentWillMount = () => {
        this.props.dispatch({
            type: 'asset/findByUserID'
        })
    }
    //发送验证邮箱
    sendEmil = () => {
        this.props.dispatch({
            type: 'asset/mailboxVerification'
        })
    }
    //身份选择
    SelecthandleChange = (value) => {
        this.selectValue = value
    }
    selectOnClick = () => {
        let { applyStatus } = this.props.userInfo;
        if(applyStatus <2 ){
            message.warning("请先进行邮箱验证！")
            return;
        }
        switch (this.selectValue) {
            case '1':
                this.props.history.push("/submitMessage")
                break;
            case '2':
                this.props.history.push("/submitMessageForeign")
                break;
            case '3':
                this.props.history.push("/submitMessageCompany")
                break;
            default:
                break;
        }
    }
    //关闭两步验证
    cloceCheck = (val) => {
        if (this.props.userInfo.applyStatus == 6) {
            this.props.dispatch({
                type: 'asset/stopCheck',
                payload: {
                    params: [this.props.userInfo.registeredName, val]
                }
            })
            return;
        }
        message.warning("两步验证必须有一个保持开启！")
    }
    //开启谷歌验证码
    openGo = (path) => {
        let { applyStatus } = this.props.userInfo;
        if(applyStatus <3 ){
            message.warning("请先进行身份证！")
            return;
        }
        if (!this.props.userInfo.email) {
            message.warning('请先登录账号！');
            return;
        }
        this.props.history.push(path)
    }
    //验证通过
    checkcOrrect = () => {
        return (
            <div className={styleA.yz_content}>
                <Icon className={styleA.yz_check} type="check" />
            </div>
        )
    }
    //重置资金密码
    resetPasswords = () => {
        this.props.history.push("/setMoneyPassword")
    }
    //邮箱验证
    _renderEmailVerify = () => {
        let { applyStatus } = this.props.userInfo;
        if (applyStatus > 1) {
            return this.checkcOrrect();
        } else {
            return (
                <div>
                    <div style={{ marginTop: "20px" }}>
                        请到您的收件箱查看激活邮件，并点击其中的激活链接进行激活
                    </div>
                    <div>
                        如您未收到邮件，请点击「发送验证邮件」按钮重试。
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <Button onClick={this.sendEmil} className="asset_btn SecurityCenter_btn" type="primary">发送验证邮件</Button>
                    </div>
                    <br />
                </div>
            )
        }

    }
    //身份验证
    _renderIDCardVerify = () => {
        let { applyStatus } = this.props.userInfo;
        if (applyStatus > 2) {
            return this.checkcOrrect();
        } else {
            return <div>
                <div style={{ marginTop: "20px" }}>
                    按照有关部门规定，也为了更好地保护您的资产安全，请完成以下身份验证。身份验证资料经审核通过后不可更改。
                        </div>
                <div>
                    请选择身份验证类型
                        </div>
                <div style={{ marginTop: "20px" }}>
                    <Select defaultValue={this.selectValue} style={{ width: '60%' }} onChange={this.SelecthandleChange}>
                        <Option value="1">身份证验证</Option>
                        <Option value="2">护照验证</Option>
                        <Option value="3">机构客户验证</Option>
                    </Select>
                    <Button onClick={this.selectOnClick} className="asset_btn SecurityCenter_btn" type="primary">提交验证文件</Button>
                </div>
                <br />
            </div>
        }
    }
    //两步验证
    _renderTwoStepsVerify = () => {
        let { applyStatus } = this.props.userInfo;
        switch (applyStatus) {
            case "1":
            case "2":
            case "3":
                return (
                    <div>
                        <div style={{ marginTop: "20px" }}>
                            两步验证是使用动态密码，在设备隔离的情况下进行验证，使用将增加您账户的安全性。
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.openGo("/reopenGoogle/" + this.props.userInfo.email)} className="asset_btn SecurityCenter_btn SecurityCenter_btn_yz" type="primary">开启谷歌两步验证</Button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.openGo("/smSverification")} className="asset_btn SecurityCenter_btn SecurityCenter_btn_yz" type="primary">开启手机两步验证</Button>
                        </div>
                        <br />
                    </div>
                )
            case "4":
                return (
                    // <div>谷歌验证已开启 | 短信验证未开启</div>
                    <div>
                        <div style={{ marginTop: "20px" }}>
                            两步验证是使用动态密码，在设备隔离的情况下进行验证，使用将增加您账户的安全性。
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.cloceCheck('4')} className="asset_btn SecurityCenter_btn_yz">关闭谷歌两步验证</Button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.openGo("/smSverification")} className="asset_btn SecurityCenter_btn SecurityCenter_btn_yz" type="primary">开启手机短信验证</Button>
                        </div>
                        <br />
                    </div>


                )
            case "5":
                return (
                    // <div>谷歌验证未开启 | 短信验证已开启</div>
                    <div>
                        <div style={{ marginTop: "20px" }}>
                            两步验证是使用动态密码，在设备隔离的情况下进行验证，使用将增加您账户的安全性。
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.openGo("/reopenGoogle/" + this.props.userInfo.email)} className="asset_btn SecurityCenter_btn SecurityCenter_btn_yz" type="primary">开启谷歌两步验证</Button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.cloceCheck('5')} className="asset_btn SecurityCenter_btn_yz">关闭手机短信验证</Button>
                        </div>
                        <br />
                    </div>
                )
            case "6":
                return (
                    <div>
                        <div style={{ marginTop: "20px" }}>
                            两步验证是使用动态密码，在设备隔离的情况下进行验证，使用将增加您账户的安全性。
                    </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.cloceCheck('4')} className="asset_btn SecurityCenter_btn_yz">关闭谷歌两步验证</Button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.cloceCheck('5')} className="asset_btn SecurityCenter_btn_yz">关闭手机短信验证</Button>
                        </div>
                        <br />
                    </div>
                )
            default:
                break;
        }
    }
    render() {
        let { clientID, clientName, registeredName, applyStatus } = this.props.userInfo;
        if (!!clientName) {
            clientName = "**" + clientName.substr(clientName.length - 1, 1);
        } else {
            clientName = "未完成身份验证";
        }
        let accountPassword;
        if (!!this.props.findByUserID.accountPassword) {
            accountPassword = "******";
        } else {
            accountPassword = "未设置";
        }
        return (
            <div style={{ paddingTop: '53px' }}>

                <div className={style.right_title}>
                    安全中心
                </div>
                <div className={style.right_bz}>
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
                                <Button onClick={() => this.props.history.push("/user/forgetPassword")} className="asset_btn SecurityCenter_btn" type="primary">修改</Button>
                            </Col>
                        </Row>
                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>资金密码</Col>
                            <Col span={20}>
                                <span>{accountPassword}</span>
                                {this.props.userInfo.applyStatus >= 4 ? <Button onClick={this.resetPasswords} className="asset_btn SecurityCenter_btn" type="primary">重置密码</Button> : null}
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
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { currentSelect, findByUserID } = state.asset
    let { userInfo = {} } = state.user
    return {
        userInfo,
        currentSelect,
        findByUserID,
        ...props
    }
})(SecurityCenter);