import React, { Component, PropTypes } from 'react';
import style from '../asset/asset.less'
import styleA from './Recharge.less';
import { connect } from 'dva';
import DataFormatter from '../../tool/dataFormat';
import { Row, Col, Select, Button, Table, Pagination } from 'antd';
import Tabs from './tabs';
const Option = Select.Option;
const columns = [
    {
        title: '委托时间',
        dataIndex: 'insert',
        render: (item, index) => {
            return <div style={{ whiteSpace: 'nowrap' }}>{item.insert ? item.insert : "--"}</div>
        }

    }, {
        title: '委托单号',
        dataIndex: 'orderSysId',
    }, {
        title: '名称',
        dataIndex: 'instrumentId',
    }, {
        title: '买卖',
        dataIndex: 'direction',
        render: (item) => {
            return <span>{DataFormatter.getBaseEnumInfo("direction", item.direction)}</span>
        }
    }, {
        title: '委托价格',
        dataIndex: 'price',
        render: (item) => {
            return <span>{item.limitPrice ? item.limitPrice.toFixed(10) : '--'}</span>
        }
    }, {
        title: '委托数量',
        dataIndex: 'volumeTotalOriginal',
        render: (item) => {
            return <span>{item.volumeTotalOriginal ? item.volumeTotalOriginal.toFixed(4) : '--'}</span>
        }
    }, {
        title: '总额',
        dataIndex: 'totalPrice',
        render: (item) => {
            return <span>{item.totalPrice ? item.totalPrice.toFixed(14) : '--'}</span>
        }
    }, {
        title: '成交数量',
        dataIndex: 'volumeTraded',
        render: (item) => {
            return <span>{item.volumeTraded ? item.volumeTraded.toFixed(4) : "--"}</span>
        }
    }, {
        title: '委托状态',
        dataIndex: 'orderStatus',
        render: (item) => {
            return <span>{DataFormatter.getBaseEnumInfo("orderStatus", item.orderStatus)}</span>
        }
    }];

//委托查询
class Entrust extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: 10,
            tab: '委托查询',
            orderStatus: "0"
        }
    }

    componentDidMount() {
        this.getEntrustList();
    }


    componentWillReceiveProps(newxProps) {
        console.log("进来了")

    }

    //查询委托列表
    getEntrustList() {
        const { registeredName, clientId, clientName } = this.props.userInfo;
        // tradeTimeFlag 1:全部  2.当天   3:历史
        // orderStatus

        if (this.props.userInfo && !!this.props.userInfo.clientID) {
            this.props.dispatch({
                type: 'record/entrustList',
                payload: [{
                    "registeredName": registeredName,
                    "tradeTimeFlag": "2",
                    "clientId": clientId,
                    "clientName": clientName,
                    "direction": "",
                    "instrumentId": "",
                    "orderStatus": "",
                    "tradingdayStart": "",
                    "tradingdayEnd": ""
                },
                { "pageNo": this.state.pageNo, "pageSize": this.state.pageSize }, 5, 2]
            })
        }
    }

    currencyChange = (value) => {
        let _value = value === "全部" ? null : value;
        this.currency = _value;
    }
    queryClick = () => {
        this.props.dispatch({
            type: 'asset/currencyChange',
            payload: {
                currency: this.currency
            }
        })
    }
    render() {
        //分页
        const pagination = {
            total: this.props.entrustData.totalRecord,
            current: this.state.pageNo,
            showSizeChanger: true,
            showQuickJumper: true,
            onShowSizeChange: (page, pageSize) => {
                this.getEntrustList({ pageSize: pageSize, pageNo: page })
            },
            onChange: (page, pageSize) => {
                this.getEntrustList({ pageSize: pageSize, pageNo: page })
            }
        }
        return (
            <div className={style.gutte_right}>
                <div className={style.right_title}> 委托查询 <span className={style.zh}>727770481@qq.com</span>
                </div>
                <div className={style.right_bz}>
                    <Tabs tabList={[{ title: "委托查询", orderStatus: '0' }, { title: "当日成交", orderStatus: '1' }, { title: "历史成交", orderStatus: '1' }, { title: "未成交查询", orderStatus: '1' }]}
                        tab={this.state.tab} tabChange={item => this.setState({ tab: item.title, orderStatus: item.orderStatus })} />
                </div>
                <div className={styleA.right_table + " AssetView"}>
                    <Table
                        columns={columns}
                        dataSource={this.props.entrustData.content}
                        size="middle"
                        pagination={pagination}
                    />
                </div>
                <Pagination defaultCurrent={6} total={500} />
            </div>
        )
    }
}
export default connect((state, props) => {
    return {
        entrustData: state.record.entrustData,
        userInfo: state.user.userInfo,
        props
    }
})(Entrust);