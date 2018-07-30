import React, { Component, PropTypes } from 'react';
import { Table, Form, DatePicker, Select, Button } from 'antd';
import style from '../asset/asset.less'
import styleA from './Recharge.less';
import { connect } from 'dva';
import moment from 'moment';
import dataFormat from '../../tool/dataFormat';
import Tabs from '../../components/tabs';
import language from '../../language'
const { RangePicker } = DatePicker

//充提币记录
class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: 10,
            state: "",
            tab: '充币记录',
            currency: "",
            rangeData: [moment().subtract(1, 'months'), moment()],
            orderStatus: "0"
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: "asset/findAllCurrencys",
        });
        this.getRechargeList();
    }

    getRechargeList() {
        this.props.dispatch({
            type: 'record/rechargeList',
            payload: [this.state.orderStatus, this.state.rangeData[0].format("YYYYMMDD"), this.state.rangeData[1].format("YYYYMMDD"), this.state.currency, "", this.state.state, { "pageNo": this.state.pageNo, "pageSize": this.state.pageSize }]
        })
    }

    render() {
        //分页
        const pagination = {
            total: this.props.rechargeData.totalRecord,
            current: this.state.pageNo,
            showSizeChanger: true,
            showQuickJumper: true,
            onShowSizeChange: (page, pageSize) => {
                this.setState({ pageSize: pageSize, pageNo: page }, () => this.getRechargeList())
            },
            onChange: (page, pageSize) => {
                this.setState({ pageSize: pageSize, pageNo: page }, () => this.getRechargeList())
            }
        }

        const columns1 = [
            {
                title: '充值流水号',
                dataIndex: 'orderId',
            }, {
                title: '时间',
                dataIndex: 'formatDate',
            }, {
                title: '币种',
                dataIndex: 'wxtype',
            }, {
                title: '矿工费',
                dataIndex: 'fee'
            }, {
                title: '状态',
                dataIndex: 'receiptStatus',
                render: (text, item) => {
                    return <span>{dataFormat.reCharge(item.state)}</span>
                }
            }, {
                title: '金额',
                dataIndex: 'moneyInWeb',
                render: (text, item) => {
                    if (item.moneyType == "1") {
                        return <span>{item.moneyOut}</span>
                    } else {
                        return <span>{item.moneyIn}</span>
                    }
                }
            }, {
                title: '地址',
                dataIndex: 'address',
            }, {
                title: '区块链Hash',
                dataIndex: 'hash',
            }];

        const columns2 = [
            {
                title: "提币流水号",
                dataIndex: "orderId",
            }, {
                title: '创建时间',
                dataIndex: 'formatDate',
            }, {
                title: '币种',
                dataIndex: 'wxtype',
            }, {
                title: '矿工费',
                dataIndex: 'fee'
            },
            {
                title: '手续费',
                dataIndex: 'actualFee'
            },
            {
                title: '交易状态',
                dataIndex: 'state',
                render: (text, item) => {
                    return <span>{dataFormat.reCharge(item.state)}</span>
                }
            },
            {
                title: '审核状态',
                dataIndex: 'approveRemitStatus',
                render: (text, item) => {
                    return <span>{dataFormat.approveRemitStatus(item.approveRemitStatus)}</span>
                }
            }, {
                title: '金额',
                dataIndex: 'moneyInWeb',
                render: (text, item) => {
                    if (item.moneyType == "1") {
                        return <span>{item.moneyOut}</span>
                    } else {
                        return <span>{item.moneyIn}</span>
                    }
                }
            }, {
                title: '地址',
                dataIndex: 'address',
            }, {
                title: '区块链Hash',
                dataIndex: 'hash',
            }];
        return (
            <div className={style.gutte_right} style={{ overflowX: 'scroll' }}>
                <div className={style.right_title}>  </div>
                <div className={style.right_bz}>
                    <Tabs tabList={[{ title: "充币记录", orderStatus: '0' }, { title: "提币记录", orderStatus: '1' }]} tab={this.state.tab} tabChange={item =>
                        this.setState({
                            tab: item.title,
                            orderStatus: item.orderStatus,
                            pageNo: 1,
                            currency: "",
                            state: "",
                            rangeData: [moment().subtract(1, 'months'), moment()],
                        }, () => this.getRechargeList())} />
                </div>
                <Form layout="inline" style={{ marginTop: 15 }}>
                    <Form.Item>
                        <Select value={this.state.currency} onChange={value => this.setState({ currency: value })} style={{ width: 150 }} >
                            <Select.Option value="">全部币种</Select.Option>
                            {this.props.currencyList.map((ele, index) => {
                                return <Select.Option value={ele} key={ele}>{ele}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Select value={this.state.state} onChange={(state) => this.setState({ state })} style={{ width: 150 }}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="1">{this.state.orderStatus == "0" ? "待审核" : "待打款"}</Select.Option>
                            <Select.Option value="2">{this.state.orderStatus == "0" ? "审核通过" : "已打款"}</Select.Option>
                            <Select.Option value="3">{this.state.orderStatus == "0" ? "已驳回" : "打款成功"}</Select.Option>
                            {this.state.orderStatus == "1" ? <Select.Option value="4">打款失败</Select.Option> : null}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <RangePicker onChange={(rangeData) => { this.setState({ rangeData: rangeData }) }} value={this.state.rangeData} />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => this.getRechargeList()}>查询</Button>
                    </Form.Item>
                </Form>
                <div className={styleA.right_table + " AssetView"}>
                    <Table
                        columns={this.state.orderStatus == "0" ? columns1 : columns2}
                        dataSource={this.props.rechargeData.content}
                        rowKey="id"
                        pagination={pagination}
                        loading={this.props.loading}
                    />
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    return {
        rechargeData: state.record.rechargeData,
        currencyList: state.asset.currencyList,
        userInfo: state.user.userInfo,
        loading: state.loading.models.record,
        props
    }
})(Recharge);