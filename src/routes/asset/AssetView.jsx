import React, { Component, PropTypes } from 'react';
import style from './asset.less';
import styleA from './AssetView.less';
import fromat from '../../tool/formatNmber';
import { connect } from 'dva';
import { Row, Col, Select, Button, Table, Divider, message, Input } from 'antd';
import QDModal from '../../components/QDModal/index';
import Tabs from "../../components/tabs";
import language from '../../language'
let accountPasswordGload = null;
const Option = Select.Option;

class AssetView extends Component {
    constructor(props) {
        super(props);
        this.currency = null; //代表全部
        this.state = {
            tab: "币币交易账户",
            currency: "",
            currencyKind: "",//
            upNavSelected: 0,
            visible: false,
            volume: 0,
            modalData: {}
        }
    }

    componentWillMount = () => {
        this.props.dispatch({
            type: "asset/findAllCurrencys",
        })
        this.getDataList();
    }
    componentWillReceiveProps = (nextProps) => {
        if (this.props.userInfo.clientID !== nextProps.userInfo.clientID) {
            this.props.dispatch({
                type: 'asset/currencyChange',
                payload: {
                    currency: [nextProps.userInfo.clientID, nextProps.userInfo.email]
                }
            })
        }
    }

    getDataList() {

        if (this.state.tab == "币币交易账户") {
            this.getAccount();
        } else {
            this.findFabiAccountByClientId();
        }
    }

    //查询法币资金
    findFabiAccountByClientId() {
        this.props.dispatch({
            type: 'asset/findFabiAccountByClientId',
            payload: [this.state.currency]
        })
    }

    //查询币币交易账户
    getAccount() {
        if (!!this.props.userInfo.clientID) {
            this.props.dispatch({
                type: 'asset/getTraderAssetOverview',
                payload: [this.props.userInfo.clientID, this.props.userInfo.email]
            })
        }
    }

    currencyChange = (value) => {
        this.setState({ currency: value })
    }
    queryClick = () => {
        if (this.state.upNavSelected == 0) {
            this.props.dispatch({
                type: 'asset/save',
                payload: {
                    currency: this.state.currency
                }
            })
            this.getAccount();
        } else {
            this.findFabiAccountByClientId();
        }
    }

    findAccountDetail(currency) {
        this.setState({ currencyKind: currency })
        this.props.dispatch({
            type: 'asset/findAccountDetail',
            payload: {
                currency: [currency],
                callback: (data) => {
                    if (data.errorCode == 0) {
                        this.setState({ visible: true, modalData: data.data })
                    }
                }
            }
        })
    }

    //划转数量校验
    checkInput(value) {
        let max = this.state.upNavSelected == 1 ? this.state.modalData.fabiAccountCapitalGetAvalibleMoney : this.state.modalData.operTradingAccountGetAvailable;

        this.setState({ volume: fromat.NumberCheck({ value: value, max: max }) });
    }


    transfer() {
        if (this.state.volume == 0 || this.state.volume == "") {
            message.error("请输入有效的数量!");
            return
        }
        this.props.dispatch({
            type: "asset/accountExchabge",
            payload: {
                body: [this.state.currencyKind, this.state.volume, this.state.upNavSelected == 0 ? '1' : '0'],
                callback: (data) => {
                    if (data.errorCode == 0) {
                        this.setState({ visible: false, modalData: {}, volume: 0 })
                        message.success("转入成功")
                        setTimeout(() => {
                            this.getDataList();
                        }, 1000)
                    }
                }
            }
        })
    }

    render() {
        const columns = [{
            title: language.asset.BZ,
            dataIndex: 'currency',
        }, {
            title: language.asset.KY,
            dataIndex: 'available',
            render: (text) => (text * 1)
        }, {
            title: language.asset.DJ,
            dataIndex: "frozenMoney",
            render: (text) => (text * 1)
        }, {
            title: language.asset.ZE,
            dataIndex: 'balance',
            render: (text) => (text * 1)
        }, {
            title: language.asset.CZ,
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    this.state.tab == "币币交易账户" ? <div>
                        <a href={"#/otherRecharge/" + record.currency} style={{ color: "rgba(253,204,57,1)" }}>充值</a>
                        <Divider type="vertical" />
                        <a onClick={() => {
                            if (!accountPasswordGload) {
                                message.info(language.asset.QXSZZJMM)
                                return
                            }
                            this.props.history.push("/otherPresent/" + record.currency)
                        }} style={{ color: "rgba(253,204,57,1)" }}>提现</a>
                        <Divider type="vertical" />
                        {(record.currency == "BTC" || record.currency == "USDT" || record.currency == "ETH") ?
                            <a style={{ color: "rgba(253,204,57,1)" }} onClick={() => this.findAccountDetail(record.currency)}>转到法币账户</a> : ""
                        }
                    </div> :
                        <a style={{ color: "rgba(253,204,57,1)" }} onClick={() => this.findAccountDetail(record.currency)}>转到币币账户</a>
                )
            }
        }];
        let dataSource = this.props.dataSource;
        if (this.state.tab == "币币交易账户") {
            dataSource = dataSource.filter((item, index) => {
                item.key = index;
                if (!!this.props.currency) {
                    return item.currency === this.props.currency
                }
                return !!item.currency
            })
        }
        return (
            <div className={style.gutte_right}>
                <div className={style.right_title}>
                    {language.ZCZL}
                </div>
                <div className={style.right_bz}>
                    <Row>
                        <Col span={12}>
                            <Tabs tabList={[{ title: "币币交易账户", upNavSelected: 0 }, { title: "法币交易账户", upNavSelected: 1 }]} tab={this.state.tab} tabChange={item =>
                                this.setState({ tab: item.title, upNavSelected: item.upNavSelected }, () => this.getDataList())} />
                        </Col>
                        <Col span={12}>
                            <span className={style.right_currtext}>{language.asset.BZ}</span>
                            <Select value={this.state.currency} onChange={this.currencyChange} style={{ width: 200 }} >
                                <Option value="">{language.asset.QB}</Option>
                                {this.props.currencyList.map((ele, index) => {
                                    return <Option value={ele} key={ele}>{ele}</Option>
                                })}
                            </Select>
                            <span className={styleA.right_query}><Button onClick={() => this.queryClick()}>{language.asset.CX}</Button></span>
                        </Col>
                    </Row>

                </div>
                <QDModal visible={this.state.visible}
                    onCancel={() => this.setState({ visible: false, modalData: {}, volume: 0 })}
                    onOk={() => this.transfer()}
                    title="资产互转" on>
                    <div style={{ padding: "0px 40px" }} className={styleA.modalContent}>
                        <p>币种</p>
                        <Input disabled value={this.state.currencyKind} />
                        <p>从</p>
                        <Input disabled value={this.state.upNavSelected == 1 ? "法币交易账户" : "币币交易账户"} />
                        <div style={{ textAlign: 'right', marginTop: "-15px" }}>{this.state.upNavSelected == 1 ? "法币" : "币币"}余额:{this.state.upNavSelected == 1 ? this.state.modalData.fabiAccountCapitalGetAvalibleMoney : this.state.modalData.operTradingAccountGetAvailable} {this.state.currencyKind}</div>
                        <p>划转至</p>
                        <Input disabled value={this.state.upNavSelected == 0 ? "法币交易账户" : "币币交易账户"} />
                        <div style={{ textAlign: 'right', marginTop: "-15px" }}>{this.state.upNavSelected == 0 ? "法币" : "币币"}余额:{this.state.upNavSelected == 0 ? this.state.modalData.fabiAccountCapitalGetAvalibleMoney : this.state.modalData.operTradingAccountGetAvailable} {this.state.currencyKind}</div>
                        <p>数量</p>
                        <Input value={this.state.volume} onChange={e => this.checkInput(e.target.value)} suffix={<span style={{ color: "#FFBF00", fontSize: 13 }} onClick={() => {
                            this.setState({ volume: this.state.upNavSelected == 1 ? this.state.modalData.fabiAccountCapitalGetAvalibleMoney : this.state.modalData.operTradingAccountGetAvailable })
                        }}>全部</span>} />
                        <div style={{ textAlign: 'right', marginTop: "-15px" }}>可划转数量:{this.state.upNavSelected == 1 ? this.state.modalData.fabiAccountCapitalGetAvalibleMoney : this.state.modalData.operTradingAccountGetAvailable} {this.state.currencyKind}</div>
                    </div>
                </QDModal>
                <div className={styleA.right_table + " AssetView"}>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        size="middle"
                        rowKey="currency"
                        pagination={false}
                    />
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { currentSelect, currency, dataSource, findByUserID, currencyList, accountDeail } = state.asset
    let { userInfo = {} } = state.user
    accountPasswordGload = findByUserID.accountPassword
    return {
        findByUserID,
        currency,
        userInfo,
        currentSelect,
        currencyList,
        dataSource,
        accountDeail,
        ...props
    }
})(AssetView);