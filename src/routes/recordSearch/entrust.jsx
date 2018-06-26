import React, { Component, PropTypes } from 'react';
import style from '../asset/asset.less'
import styleA from './Recharge.less';
import { connect } from 'dva';
import DataFormatter from '../../tool/dataFormat';
import { Row, Col, Select, Button, Table, Pagination } from 'antd';
import Tabs from './tabs';
const Option = Select.Option;


//委托查询
class Entrust extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: 10,
            tab: '委托查询',
            tradeTimeFlag: '3',
            orderStatus: "0"
        }
    }

    componentDidMount() {
        this.getEntrustList();
    }

    //查询委托列表
    getEntrustList() {
        const { registeredName, clientId, clientName } = this.props.userInfo;
        // tradeTimeFlag 1:全部  2.当天   3:历史
        // type 

        if (this.props.userInfo && !!this.props.userInfo.clientID) {
            let action = 'record/entrustList';
            if (this.state.tradeTimeFlag == "3" || this.state.tradeTimeFlag == "4") {
                action = 'record/queryOrderForClient';
            }
            this.props.dispatch({
                type: action,
                payload: [
                    {
                        "registeredName": registeredName,
                        "tradeTimeFlag": this.state.tradeTimeFlag,
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

    render() {
        //分页
        const pagination = {
            total: this.props.entrustData.totalRecord,
            current: this.state.pageNo,
            showSizeChanger: true,
            showQuickJumper: true,
            onShowSizeChange: (page, pageSize) => {
                this.setState({ pageNo: page, pageSize: pageSize }, () => this.getEntrustList())
            },
            onChange: (page, pageSize) => {
                this.setState({ pageNo: page, pageSize: pageSize }, () => this.getEntrustList())
            }
        }

        const columns1 = [
            {
                title: "委托时间",
                dataIndex: 'insert',
                render: (index, item) => {
                    return <div style={{ whiteSpace: 'nowrap' }}>{item.insertDate} {item.insertTime}</div>
                }
            }, {
                title: '委托单号',
                dataIndex: 'orderSysId',
            }, {
                title: '名称',
                dataIndex: 'instrumentId',
            }, {
                title: '方向',
                dataIndex: 'direction',
                render: (text, item) => {
                    if (item.direction == "0") {
                        return <span style={{ color: '#FF4200' }}>买</span>
                    } else {
                        return <span style={{ color: '#349B00' }}>卖</span>
                    }
                }
            }, {
                title: '价格',
                dataIndex: 'limitPrice',
            }, {
                title: '数量',
                dataIndex: 'volumeTotalOriginal'
            }, {
                title: '总额',
                dataIndex: 'totalPrice',
            }, {
                title: '成交数量',
                dataIndex: 'volumeTraded'
            }, {
                title: '委托状态',
                dataIndex: 'orderStatus',
                render: (text, item) => {
                    return <span>{DataFormatter.orderStatus(item.orderStatus)}</span>
                }
            }];
        const columns2 = [
            {
                title: '成交时间',
                dataIndex: 'tradeTime',
                render: (index, item) => {
                    return <div style={{ whiteSpace: 'nowrap' }}>{item.tradeTime}</div>
                }
            }, {
                title: '成交单号',
                dataIndex: 'orderSysId',
            }, {
                title: '名称',
                dataIndex: 'instrumentId',
            },
            {
                title: '方向',
                dataIndex: 'direction',
                render: (text, item) => {
                    if (item.direction == "0") {
                        return <span style={{ color: '#FF4200' }}>买</span>
                    } else {
                        return <span style={{ color: '#349B00' }}>卖</span>
                    }
                }
            }, {
                title: '价格',
                dataIndex: 'priceString',
            }, {
                title: '数量',
                dataIndex: 'volume'
            }, {
                title: '成交额',
                dataIndex: 'totalPrice',
            }, {
                title: '交易手续费',
                dataIndex: 'fee',

            }];

        return (
            <div className={style.gutte_right}>
                <div className={style.right_title}> 委托查询 </div>
                <div className={style.right_bz}>
                    <Tabs tabList={[{ title: "委托查询", tradeTimeFlag: '3' }, { title: "当日成交", tradeTimeFlag: '1' }, { title: "历史成交", tradeTimeFlag: '2' }, { title: "未成交委托查询", tradeTimeFlag: '4' }]}
                        tab={this.state.tab} tabChange={item => this.setState({ tab: item.title, tradeTimeFlag: item.tradeTimeFlag, pageNo: 1 }, () => {
                            this.props.dispatch({
                                type: 'record/save',
                                payload: {
                                    entrustData: {
                                        content: []
                                    }
                                }
                            })
                            this.getEntrustList()
                        })} />
                </div>
                <div className={styleA.right_table + " AssetView"}>
                    {(this.state.tradeTimeFlag == "3" || this.state.tradeTimeFlag == "4") ?
                        <Table
                            rowKey="id"
                            columns={columns1}
                            dataSource={this.props.entrustData.content}
                            pagination={pagination}
                            loading={this.props.loading}
                        /> :
                        <Table
                            rowKey="orderSysId"
                            columns={columns2}
                            dataSource={this.props.entrustData.content}
                            pagination={pagination}
                            loading={this.props.loading}
                        />
                    }
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    return {
        entrustData: state.record.entrustData,
        loading: state.loading.models.record,
        userInfo: state.user.userInfo,
        props
    }
})(Entrust);