import React, { Component, PropTypes } from 'react';
import style from './asset.less';
import styleA from './AssetView.less';
import { connect } from 'dva';
import { Row, Col, Select, Button, Table, Divider, message } from 'antd';
import language from '../../language' 
let accountPasswordGload = null;
let _that = null;
const Option = Select.Option;
const columns = [{
    title: language.asset.BZ,
    dataIndex: 'currency',
}, {
    title: language.asset.KY,
    dataIndex: 'available',
    render:(text)=>(text*1)
}, {
    title: language.asset.DJ,
    dataIndex: 'frozenMoney',
    render:(text)=>(text*1)
}, {
    title: language.asset.ZE,
    dataIndex: 'balance',
    render:(text)=>(text*1)
}, {
    title: language.asset.CZ,
    dataIndex: 'operation',
    render: (text, record, index) => {
        return (
            <div>
                <a href={"#/otherRecharge/" + record.currency} style={{ color: "rgba(253,204,57,1)" }}>充值</a>
                <Divider type="vertical" />
                <a onClick={() => {
                    if (!accountPasswordGload) {
                        message.info(language.asset.QXSZZJMM)
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
        let _value = value === language.asset.QB ? null : value;
        this.currency = _value;
    }
    queryClick = () => {
        this.props.dispatch({
            type: 'asset/save',
            payload: {
                currency: this.currency
            }
        })
        if (!!this.props.userInfo.clientID) {
            this.props.dispatch({
                type: 'asset/currencyChange',
                payload: {
                    currency: [this.props.userInfo.clientID,this.props.userInfo.email]
                }
            })
        }
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
                    {language.ZCZL}
                </div>
                <div className={style.right_bz}>
                    <span className={style.right_currtext}>{language.asset.BZ}</span>
                    <Select defaultValue={language.asset.QB} onChange={this.currencyChange} style={{ width: 200 }} >
                        <Option value={language.asset.QB}>{language.asset.QB}</Option>
                        {this.props.dataSource.map((ele,index)=>{
                            return <Option value={ele.currency}>{ele.currency}</Option>
                        })}
                    </Select>
                    <span className={styleA.right_query}><Button onClick={this.queryClick}>{language.asset.CX}</Button></span>
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