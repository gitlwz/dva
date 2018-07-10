//我的订单

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Select, DatePicker, Divider, Button, Table } from 'antd';
import style from './orderManager.less'
import moment from 'moment';
import QDModal from "../../../components/QDModal"
const Option = Select.Option;
const { RangePicker } = DatePicker;


class MyOrder extends Component {
    constructor(props) {
        super(props);
        this.orderColumns = [
            {
                title: "订单号",
                dataIndex: "orderID",
                width: 200,
                fixed: 'left'
            }, {
                title: "发布编号",
                dataIndex: "postersID",
                width: 200,
            }, {
                title: "创建时间",
                dataIndex: "operateTime",
                width: 200,
                render: (item, record, index) => {
                    return <span>{record.operateDate} {record.operateTime}</span>
                },
            }, {
                title: "币种",
                dataIndex: "currency",
                width: 80,
            }, {
                title: "类型",
                dataIndex: "businessType",
                width: 90,
                render: (item, record, index) => {
                    if (record.businessType == "0") {
                        return <div style={{ color: 'rgba(255,25,0,1)' }}>买入</div>
                    } else {
                        return <div style={{ color: 'rgba(52,155,0,1)' }}>卖出</div>
                    }
                },
            }, {
                title: "交易对象",
                dataIndex: "tradingName",
                width: 100,
            }, {
                title: "交易单价",
                dataIndex: "price",
                width: 120,
                sorter: (a, b) => a.price - b.price,
                render: (item, record) => {
                    return <span>{record.price}CNY</span>
                }
            }, {
                title: "数量",
                dataIndex: "number",
                width: 120,
                sorter: (a, b) => a.number - b.number,
            }, {
                title: "状态",
                dataIndex: "state",
                width: 150,
                render: (item, record, index) => {
                    switch (record.state) {
                        case '0':
                            return <div>待付款</div>
                            break;
                        case '1':
                            return <div >已付款,待确认</div>
                            break;
                        case '2':
                            return <div>已完成</div>
                            break;
                        case '3':
                            return <div >已取消</div>
                            break;
                    }
                }

            }, {
                title: "操作",
                width: 120,
                fixed: 'right',
                dataIndex: "action",
                render: (item, record) => {
                    switch (record.state) {
                        case '0':
                            return (<a onClick={() => this.props.dispatch(routerRedux.push("/tradingDetail/" + record.orderID))} style={{ color: "rgba(255,191,0,1)" }}>立即付款</a>)
                        case '1':
                            return (<a onClick={() => this.props.dispatch(routerRedux.push("/tradingDetail/" + record.orderID))} style={{ color: "rgba(255,191,0,1)" }}>确认收款</a>)
                        case '2':
                            return (<a onClick={() => this.props.dispatch(routerRedux.push("/tradingDetail/" + record.orderID))} style={{ color: "rgba(255,191,0,1)" }}>已完成</a>)
                        case '3':
                            return (<div> --</div>)
                        default:
                            return ""
                    }
                }
            }
        ];

        this.state = {
            query: {
                mmdata: '全部',
                currency: "全部",
                rangeData: [moment().subtract(1, 'months'), moment()],
                state: "全部"
            },
            columns: this.orderColumns,

            visible: false
        }
        this.postersID = "";
    }
    componentWillMount = () => {
        this.props.dispatch({
            type: "orderManager/findAllCurrencys",
        })
        this.PaginationChange(1, 10)
    }
    //取消点击事件
    countermand = (record) => {
        this.setState({
            visible: true,
        })
        this.postersID = record;
    }
    //取消点击事件
    modalOk = () => {
        this.props.dispatch({
            type: "orderManager/cancelBiddingPosters",
            payload: {
                params: [this.postersID.postersID],
                callBack: () => {
                    this.setState({
                        visible: false,
                    })
                    this.PaginationChange(this.props.current, this.props.pageSize)
                }
            }
        })
    }

    //页码变化
    PaginationChange = (current, pageSize) => {
        let { currency, mmdata, rangeData, state } = this.state.query
        let parmas = [
            '0',
            state == "全部" ? null : state,
            mmdata == "全部" ? null : mmdata,
            currency == "全部" ? null : currency,
            rangeData[0].format('YYYYMMDD'),
            rangeData[1].format('YYYYMMDD'),
            {
                pageSize,
                pageNo: current
            }
        ]
        this.props.dispatch({
            type: "orderManager/findOrderFormForWeb",
            payload: parmas
        })
    }
    render() {
        let x_with = 0;
        this.state.columns.forEach((ele) => {
            x_with += ele.width
        })
        return (
            <div style={{ paddingTop: '53px' }}>
                <div className={style.right_title}>
                    我的订单
                </div>
                <div className={style.right_bz}>
                    <div className="orderManager">

                        <div className="chaxun">
                            <div>
                                <Select value={this.state.query.mmdata} onChange={(mmdata) => { this.setState({ query: { ...this.state.query, mmdata } }) }} style={{ width: 150 }}>
                                    <Option value="全部">全部买/卖</Option>
                                    <Option value="0">买入</Option>
                                    <Option value="1">卖出</Option>
                                </Select>
                            </div>
                            <div>
                                <Select value={this.state.query.currency} onChange={(currency) => { this.setState({ query: { ...this.state.query, currency } }) }} style={{ width: 150 }}>
                                    <Option value="全部">全部币种</Option>
                                    {this.props.currency.map((ele) => {
                                        return <Option key={ele} value={ele}>{ele}</Option>
                                    })}
                                </Select>
                            </div>
                            <div>
                                <RangePicker onChange={(rangeData) => { this.setState({ query: { ...this.state.query, rangeData } }) }} value={this.state.query.rangeData} />
                            </div>
                            <div>
                                <Select value={this.state.query.state} onChange={(state) => { this.setState({ query: { ...this.state.query, state } }) }} style={{ width: 150 }}>
                                    <Option value="全部">全部状态</Option>
                                    <Option value="0">待审核</Option>
                                    <Option value="1">审核通过</Option>
                                    <Option value="2">审核驳回</Option>
                                    <Option value="3">已取消</Option>
                                </Select>
                            </div>
                            <div className="orderManager_btn">
                                <Button onClick={() => this.PaginationChange(this.props.current, this.props.pageSize)}>查询</Button>
                            </div>
                        </div>
                        <div className="orderManager_table">
                            <Table
                                dataSource={this.props.dataSource}
                                columns={this.state.columns}
                                scroll={{ x: x_with }}
                                rowKey="id"
                                pagination={{
                                    current: this.props.current,
                                    total: this.props.total,
                                    pageSize: this.props.pageSize,
                                    onChange: this.PaginationChange
                                }}
                            />
                        </div>
                        <QDModal
                            visible={this.state.visible}
                            title={"取消挂单"}
                            okText="取消挂单"
                            cancelText="我在想想"
                            onOk={this.modalOk}
                            onCancel={() => {
                                this.setState({
                                    visible: false
                                })
                            }}
                        >
                            <div style={{ 'textAlign': "center", 'fontSize': "16px", color: "rgba(86,86,86,1)" }}>如果您已经向卖家付款，千万不要取消交易</div>
                            {/* <div style={{'marginTop':'8px','textAlign':"center",'fontSize':"16px",color:"rgba(255,25,0,1)"}}>如果买方累计取消次数达{3}次，将会被限制买</div> */}
                        </QDModal>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { currency, current, total, pageSize, dataSource } = state.orderManager
    return {
        currency,
        current,
        total,
        pageSize,
        dataSource
    }
})(MyOrder);