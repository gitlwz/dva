import React, { Component, PropTypes } from 'react';
import style from './asset.less';
import styleA from './AssetView.less';
import { connect } from 'dva';
import { Row, Col, Select, Button, Table, Divider, message } from 'antd';
let accountPasswordGload = null;
let _that = null;
const Option = Select.Option;
const columns = [{
    title: '币种',
    dataIndex: 'currency',
}, {
    title: '可用',
    dataIndex: 'available',
}, {
    title: '冻结',
    dataIndex: 'frozenMoney',
}, {
    title: '总额',
    dataIndex: 'balance',
}, {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record, index) => {
        return (
            <div>
                <a href={"#/otherRecharge/" + record.currency} style={{ color: "rgba(253,204,57,1)" }}>充值</a>
                <Divider type="vertical" />
                <a onClick={() => {
                    if (!accountPasswordGload) {
                        message.info("请先设置资金密码！")
                        return
                    }
                    _that.props.history.push("/otherPresent/" + record.currency)
                }} style={{ color: "rgba(253,204,57,1)" }}>提现</a>
            </div>
        )
    }
}];
class AssetView extends Component {
    constructor(props) {
        super(props);
        this.currency = null; //代表全部
    }

    componentWillMount = () => {
        _that = this;
        if (!!this.props.userInfo.clientID) {
            this.props.dispatch({
                type: 'asset/currencyChange',
                payload: {
                    currency: [this.props.userInfo.clientID,this.props.userInfo.email]
                }
            })
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (this.props.userInfo.clientID !== nextProps.userInfo.clientID) {
            this.props.dispatch({
                type: 'asset/currencyChange',
                payload: {
                    currency: [nextProps.userInfo.clientID,nextProps.userInfo.email]
                }
            })
        }
    }
    currencyChange = (value) => {
        let _value = value === "全部" ? null : value;
        this.currency = _value;
    }
    queryClick = () => {
        this.props.dispatch({
            type: 'asset/save',
            payload: {
                currency: this.currency
            }
        })
    }
    render() {
        let dataSource = this.props.dataSource.filter((item, index) => {
            item.key = index;
            if (!!this.props.currency) {
                return item.currency === this.props.currency
            }
            return !!item.currency
        })
        return (
            <div className={style.gutte_right}>
                <div className={style.right_title}>
                    资产总览
                </div>
                <div className={style.right_bz}>
                    <span className={style.right_currtext}>币种</span>
                    <Select defaultValue="全部" onChange={this.currencyChange} style={{ width: 200 }} >
                        <Option value="全部">全部</Option>
                        <Option value="BTC">BTC</Option>
                        <Option value="ETH">ETH</Option>
                        <Option value="USDT">USDT</Option>
                        <Option value="EOS">EOS</Option>
                    </Select>
                    <span className={styleA.right_query}><Button onClick={this.queryClick}>查询</Button></span>
                </div>
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
    let { currentSelect, currency, dataSource, findByUserID } = state.asset
    let { userInfo = {} } = state.user
    console.log("%%%%%%%5",state.user)
    accountPasswordGload = findByUserID.accountPassword
    return {
        findByUserID,
        currency,
        userInfo,
        currentSelect,
        dataSource,
        ...props
    }
})(AssetView);