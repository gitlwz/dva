import React from "react";
import { connect } from 'dva';
import { Row, Col, Input, Select, message } from 'antd';
import QDModal from "../../../components/QDModal"
import card from '../../../assets/card.png';
import weixin from '../../../assets/微信@3x.png';
import zhifubao from '../../../assets/支付宝@3x.png'
import styles from './accountSeting.less';

class AccoutSeting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: '',
            type: '',

            realName: '',
            bankID: '',
            bankName: '',
            bankAccountID: '',
            confirmBankAccountID: '',
            bankAccountPhoto: '',
            bankAccountPassword: '',

            alipayAccount: '',
            alipayAccountPhoto: '',

            wechatAccount: '',
            wechatAccountPhoto: '',
            accountPassword: '',
        }
    }

    componentWillMount() {
        this.getSubBankAccout();
    }

    getSubBankAccout() {
        this.props.dispatch({
            type: 'release/findBySubBankAccount'
        })
    }

    modalOk = () => {
        switch (this.state.type) {
            case "card":
                if (this.state.realName == "") {
                    message.error("请输入姓名!");
                    return;
                }
                var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
                // if (!pattern.test(this.state.bankAccountID)) {
                //     message.error("请输入有效的银行卡号!");
                //     return;
                // }
                if (this.state.bankAccountID != this.state.confirmBankAccountID) {
                    message.error("请输入相同的银行卡号")
                    return
                }
                if (this.state.accountPassword == "") {
                    message.error("请输入资金密码");
                    return
                }

                let body = {};
                body.realName = this.state.realName;
                body.bankID = this.state.bankID;
                body.bankName = this.state.bankName;
                body.bankAccountID = this.state.bankAccountID;
                body.accountPassword = this.state.accountPassword;
                this.props.dispatch({
                    type: 'user/bindingToModify',
                    payload: {
                        body: [body],
                        callback: (data) => {
                            if (data.errorCode == 0) {
                                message.success("设置成功!")
                            } else {
                                message.error(data.errorMsg)
                            }
                            this.getSubBankAccout();
                            this.modalCancel();
                        }
                    }
                })
                break;

            default:
                break;
        }
    }

    modalCancel = () => {
        this.setState({
            visible: false,
            realName: '',
            bankID: '',
            bankName: '',
            bankAccountID: '',
            confirmBankAccountID: '',
            bankAccountPhoto: '',
            bankAccountPassword: '',

            alipayAccount: '',
            alipayAccountPhoto: '',

            wechatAccount: '',
            wechatAccountPhoto: '',
            accountPassword: '',
        })
    }

    changModal(parms) {
        this.setState({
            ...this.state,
            ...parms
        })
    }


    loadModalContent() {
        switch (this.state.type) {
            case "card":
                return (
                    <div className={styles.modalContent}>
                        <p>姓名</p>
                        <Input placeholder="请输入姓名" value={this.state.realName} onChange={e => { this.setState({ realName: e.target.value }) }} />
                        <p>开户银行</p>
                        <Select value={this.state.bankID} onChange={e => this.setState({ bankID: e })} style={{ width: '100%' }}>
                            <Select.Option value="1">招商</Select.Option>
                            <Select.Option value="2">招商</Select.Option>
                        </Select>
                        <p>开户支行</p>
                        <Input placeholder="请输入开户支行全称" value={this.state.bankName} onChange={e => { this.setState({ bankName: e.target.value }) }} />
                        <p>银行卡号</p>
                        <Input placeholder="请输入您的银行卡号" value={this.state.bankAccountID} onChange={e => { this.setState({ bankAccountID: e.target.value }) }} />
                        <p>再次确认卡号</p>
                        <Input placeholder="请再次输入您的银行卡号" value={this.state.confirmBankAccountID} onChange={e => { this.setState({ confirmBankAccountID: e.target.value }) }} />
                        <p>资金密码</p>
                        <Input type="password" style={{ display: 'none' }} />
                        <Input placeholder="为保证您的资金安全，请输入资金密码" type="text" value={this.state.accountPassword} onChange={(e) => {
                            e.target.type = "password";
                            this.setState({ accountPassword: e.target.value })
                        }} />
                    </div>
                )
                break;
            case "zhifubao":
                return (
                    <div className={styles.modalContent}>
                        <p>姓名</p>
                        <Input placeholder="请输入姓名" value={this.state.realName} onChange={e => this.setState({ realName: e.target.value })} />
                        <p>{this.props.photoType}账号</p>
                        <Input placeholder="请输入您的支付宝账号" value={this.state.alipayAccount} onChange={e => this.setState({ alipayAccount: e.target.value })} />
                        <p>资金密码</p>
                        <input type="password" style={{ display: 'none' }} />
                        <Input placeholder="为保证您的资金安全，请输入资金密码" type="text" value={this.state.accountPassword} onChange={(e) => {
                            e.target.type = "password";
                            this.setState({ accountPassword: e.target.value })
                        }} />
                    </div>
                )
            case "weixin":
                return (
                    <div className={styles.modalContent}>
                        <p>姓名</p>
                        <Input placeholder="请输入姓名" value={this.state.realName} onChange={e => this.setState({ realName: e.target.value })} />
                        <p>{this.props.photoType}账号</p>
                        <Input placeholder="请输入您的支付宝账号" value={this.state.wechatAccount} onChange={e => this.setState({ wechatAccount: e.target.value })} />
                        <p>资金密码</p>
                        <input type="password" style={{ display: 'none' }} />
                        <Input placeholder="为保证您的资金安全，请输入资金密码" type="text" value={this.state.accountPassword} onChange={(e) => {
                            e.target.type = "password";
                            this.setState({ accountPassword: e.target.value })
                        }} />
                    </div>
                )
            default:
                break;
        }
    }

    render() {
        const { subBankAccountInfo } = this.props;
        return (
            <div style={{ paddingTop: '53px' }}>
                <div className={styles.right_title}>
                    充提管理
                </div>
                <div className={styles.right_bz} loading={this.props.loading}>
                    <div className={styles.card}>
                        <Row>
                            <Col span={2}><img src={card} /></Col>

                            <Col span={22} >
                                <Row style={{ borderBottom: '1px solid #EEEEEE' }}>
                                    <Col span={20} className={styles.card_title}><div>银行卡卡号</div></Col>
                                    <Col span={2} className={styles.card_title}><span style={{ color: '#FFBF00' }}>{!!subBankAccountInfo.bankAccountID ?
                                        <span onClick={() => this.changModal({
                                            type: 'card',
                                            visible: true,
                                            realName: subBankAccountInfo.realName,
                                            bankID: subBankAccountInfo.bankID,
                                            bankName: subBankAccountInfo.bankName,
                                            bankAccountID: subBankAccountInfo.bankAccountID,
                                        })}>修改</span> :
                                        <span onClick={() => this.changModal({
                                            type: "card",
                                            visible: true,
                                            realName: subBankAccountInfo.realName,
                                        })}> 绑定</span>}</span></Col>
                                </Row>
                                {!!subBankAccountInfo.bankAccountID ?
                                    <div className={styles.content}>
                                        <div>姓名:{subBankAccountInfo.realName}</div>
                                        <div>银行信息:{subBankAccountInfo.bankName}  银行卡号:{subBankAccountInfo.bankAccountID}  隐藏</div>
                                    </div> :
                                    <div className={styles.content}>
                                        未绑定
                                    </div>
                                }
                            </Col>
                        </Row>

                        <div style={{ borderBottom: '1px solid #EEEEEE' }}></div>

                        <Row style={{ marginTop: 20 }}>
                            <Col span={2}><img src={zhifubao} /></Col>

                            <Col span={22} >
                                <Row style={{ borderBottom: '1px solid #EEEEEE' }}>
                                    <Col span={20} className={styles.card_title}><div>支付宝账户</div></Col>
                                    <Col span={2} className={styles.card_title}><span style={{ color: '#FFBF00' }}>{!!subBankAccountInfo.alipayAccount ?
                                        <span onClick={() => this.changModal({
                                            type: 'card',
                                            visible: true,
                                            realName: subBankAccountInfo.realName,
                                            alipayAccount: subBankAccountInfo.alipayAccount,
                                        })}>修改</span> :
                                        <span onClick={() => this.changModal({
                                            type: "zhifubao",
                                            visible: true,
                                            realName: subBankAccountInfo.realName,
                                        })}> 绑定</span>}</span></Col>
                                </Row>
                                {!!subBankAccountInfo.alipayAccount ?
                                    <div className={styles.content}>
                                        <div>姓名:{subBankAccountInfo.realName}</div>
                                        <div>支付宝账户:{subBankAccountInfo.alipayAccount}  隐藏</div>
                                    </div> :
                                    <div className={styles.content}>
                                        未绑定
                                    </div>
                                }
                            </Col>
                        </Row>

                        <div style={{ borderBottom: '1px solid #EEEEEE' }}></div>
                        <Row style={{ marginTop: 20 }}>
                            <Col span={2}><img src={weixin} /></Col>

                            <Col span={22} >
                                <Row style={{ borderBottom: '1px solid #EEEEEE' }}>
                                    <Col span={20} className={styles.card_title}><div>微信账户</div></Col>
                                    <Col span={2} className={styles.card_title}><span style={{ color: '#FFBF00' }}>{!!subBankAccountInfo.wechatAccount ?
                                        <span onClick={() => this.changModal({
                                            type: 'card',
                                            visible: true,
                                            realName: subBankAccountInfo.realName,
                                            wechatAccount: subBankAccountInfo.wechatAccount,
                                        })}>修改</span> :
                                        <span onClick={() => this.changModal({
                                            type: "weixin",
                                            visible: true,
                                            realName: subBankAccountInfo.realName,
                                        })}> 绑定</span>}</span></Col>
                                </Row>
                                {!!subBankAccountInfo.alipayAccount ?
                                    <div className={styles.content}>
                                        <div>姓名:{subBankAccountInfo.realName}</div>
                                        <div>微信账户:{subBankAccountInfo.wechatAccount}  隐藏</div>
                                    </div> :
                                    <div className={styles.content}>
                                        未绑定
                                    </div>
                                }
                            </Col>
                        </Row>
                    </div>

                    <QDModal
                        visible={this.state.visible}
                        title={this.state.title}
                        onOk={this.modalOk}
                        onCancel={this.modalCancel}
                    >
                        <div style={{ padding: "0px 40px" }}>
                            {this.loadModalContent()}
                        </div>
                    </QDModal>
                </div>
            </div >
        )
    }
}
export default connect((state, props) => {
    return {
        subBankAccountInfo: state.release.subBankAccountInfo,
        loading: state.loading.models.release,
        props
    }
})(AccoutSeting)
