import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Icon, Select, message, Input, Modal } from 'antd';
import style from './asset.less';
import styleA from './SecurityCenter.less';
import language from '../../language'
import { transpileModule } from '../../../node_modules/typescript';
import QDModal from '../../components/QDModal/index';
const Option = Select.Option;

class SecurityCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.selectValue = '1';
    }
    componentWillMount = () => {

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
        if (applyStatus < 2) {
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
        if (applyStatus < 3) {
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
        let { applyStatus, checkStatus } = this.props.userInfo;
        if (checkStatus == 1) {
            return <div style={{ marginTop: "20px" }}>
                工作人员正在审核中...
            </div>
        }
        if (checkStatus == 3) {
            return <div>
                <div style={{ marginTop: "20px" }}>
                    审核被驳回，请重新上传
                </div>
                <div style={{ marginTop: "20px" }}>
                    <Select defaultValue={this.selectValue} style={{ width: '60%' }} onChange={this.SelecthandleChange}>
                        <Option value="1">{language.asset.SFYZ}</Option>
                        <Option value="2">{language.asset.HZYZ}</Option>
                        <Option value="3">{language.asset.JGKHYZ}</Option>
                    </Select>
                    <Button onClick={this.selectOnClick} className="asset_btn SecurityCenter_btn" type="primary">提交验证文件</Button>
                </div>
            </div>
        }
        if (applyStatus > 2) {
            return this.checkcOrrect();
        } else {
            return <div>
                <div style={{ marginTop: "20px" }}>
                    {language.asset.AZXGBMGD}
                </div>
                <div style={{ marginTop: "20px" }}>
                    <Select defaultValue={this.selectValue} style={{ width: '60%' }} onChange={this.SelecthandleChange}>
                        <Option value="1">{language.asset.SFYZ}</Option>
                        <Option value="2">{language.asset.HZYZ}</Option>
                        <Option value="3">{language.asset.JGKHYZ}</Option>
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
                            {language.asset.OO}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.openGo("/reopenGoogle/" + this.props.userInfo.email)} className="asset_btn SecurityCenter_btn SecurityCenter_btn_yz" type="primary">{language.asset.KQGGLBYZ}</Button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.openGo("/smSverification")} className="asset_btn SecurityCenter_btn SecurityCenter_btn_yz" type="primary">{language.asset.KQSJDXYZ}</Button>
                        </div>
                        <br />
                    </div>
                )
            case "4":
                return (
                    // <div>谷歌验证已开启 | 短信验证未开启</div>
                    <div>
                        <div style={{ marginTop: "20px" }}>
                            {language.asset.OO}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.cloceCheck('4')} className="asset_btn SecurityCenter_btn_yz">{language.asset.GBGGLBYZ}</Button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.openGo("/smSverification")} className="asset_btn SecurityCenter_btn SecurityCenter_btn_yz" type="primary">{language.asset.KQSJDXYZ}</Button>
                        </div>
                        <br />
                    </div>


                )
            case "5":
                return (
                    // <div>谷歌验证未开启 | 短信验证已开启</div>
                    <div>
                        <div style={{ marginTop: "20px" }}>
                            {language.asset.OO}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.openGo("/reopenGoogle/" + this.props.userInfo.email)} className="asset_btn SecurityCenter_btn SecurityCenter_btn_yz" type="primary">{language.asset.KQGGLBYZ}</Button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.cloceCheck('5')} className="asset_btn SecurityCenter_btn_yz">{language.asset.GBSJDXYZ}</Button>
                        </div>
                        <br />
                    </div>
                )
            case "6":
                return (
                    <div>
                        <div style={{ marginTop: "20px" }}>
                            {language.asset.OO}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.cloceCheck('4')} className="asset_btn SecurityCenter_btn_yz">{language.asset.GBGGLBYZ}</Button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={() => this.cloceCheck('5')} className="asset_btn SecurityCenter_btn_yz">{language.asset.GBSJDXYZ}</Button>
                        </div>
                        <br />
                    </div>
                )
            default:
                break;
        }
    }

    //昵称修改
    saveNickname() {
        this.props.dispatch({
            type: 'user/saveNickname',
            payload: {
                body: [this.props.userInfo.nickname],
                callback: (data) => {
                    if (data.errorCode == 0) {
                        message.success("修改成功！")
                        this.setState({
                            visible: false
                        })
                        this.props.dispatch({
                            type: 'user/findUserInfo'
                        })
                    }
                }
            }
        })
    }

    render() {
        let { clientID, clientName, nickname, registeredName, applyStatus } = this.props.userInfo;
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

        const children = <Input value={this.props.userInfo.nickname} onChange={e => this.props.dispatch({
            type: 'user/save',
            payload: {
                userInfo: {
                    nickname: e.target.value
                }
            }
        })} />

        return (

            <div style={{ paddingTop: '53px' }}>

                <QDModal
                    title="修改昵称"
                    visible={this.state.visible}
                    onOk={() => this.saveNickname()}
                    onCancel={() => { this.setState({ visible: false }) }}
                    width={400}
                    okText="确认"
                    cancelText="取消"
                    children={children}
                />



                }
                <div className={style.right_title}>
                    {language.AQZX}
                </div>
                <div className={style.right_bz}>
                    <div className={styleA.card}>
                        <Row className={styleA.rowF} type="flex" justify="center" align="top">
                            <Col className={styleA.rowF_title} span={4}>{language.asset.XM}</Col>
                            <Col span={20}>{clientName}</Col>
                        </Row>


                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>昵称</Col>
                            <Col span={20}>
                                <span>{nickname}</span>
                                <Button onClick={() => this.setState({ visible: true })} className="asset_btn SecurityCenter_btn" type="primary">修改昵称</Button>
                            </Col>
                        </Row>

                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>{language.asset.YHID}</Col>
                            <Col span={20}>{clientID}</Col>
                        </Row>
                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>{language.asset.ZCYX}</Col>
                            <Col span={20}>{registeredName}</Col>
                        </Row>
                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>{language.asset.DLMM}</Col>
                            <Col span={20}>
                                <span>{"******"}</span>
                                <Button onClick={() => this.props.history.push("/user/forgetPassword")} className="asset_btn SecurityCenter_btn" type="primary">{language.asset.XG}</Button>
                            </Col>
                        </Row>
                        <Row className={styleA.rowF}>
                            <Col className={styleA.rowF_title} span={4}>{language.asset.ZJMM}</Col>
                            <Col span={20}>
                                <span>{accountPassword}</span>
                                {this.props.userInfo.applyStatus >= 4 ? <Button onClick={this.resetPasswords} className="asset_btn SecurityCenter_btn" type="primary">{language.asset.CZMM}</Button> : null}
                            </Col>
                        </Row>
                    </div>
                    <div className={styleA.card}>
                        <div className={styleA.yz_title}>
                            <span>1</span>
                            <span>{language.asset.YXYZ}</span>
                        </div>
                        {this._renderEmailVerify()}
                    </div>
                    <div className={styleA.card}>
                        <div className={styleA.yz_title}>
                            <span>2</span>
                            <span>{language.asset.SFYZ}</span>
                        </div>
                        {this._renderIDCardVerify()}
                    </div>
                    <div className={styleA.card}>
                        <div className={styleA.yz_title}>
                            <span>3</span>
                            <span>{language.asset.LBYZ}</span>
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