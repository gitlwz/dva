import React, { Component, PropTypes } from 'react';
import style from '../asset/asset.less'
import styleA from './Recharge.less';
import { connect } from 'dva';
import moment from 'moment';
import DataFormatter from '../../tool/dataFormat';
import { Table, Spin, Form, Select, Button, DatePicker } from 'antd';
import Tabs from '../../components/tabs';
const { RangePicker } = DatePicker

//委托查询
class Entrust extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: 10,
            tab: '委托查询',
            state: "",
            rangeData: [moment().subtract(1, 'week'), moment()],
            currency: "",
            direction: "",

            tradeTimeFlag: '3',
            orderStatus: "0"
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: "asset/findAllCurrencys",
        });
        this.getEntrustList(this.props.userInfo);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userInfo != nextProps.userInfo && !!nextProps.userInfo.clientID) {
            this.getEntrustList(nextProps.userInfo);
        }
    }

    //查询委托列表
    getEntrustList(userInfo) {
        const { registeredName, clientID, clientName } = userInfo;
        // tradeTimeFlag 1:全部  2.当天   3:历史
        // type 
        if (!!clientID) {
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
                        "clientId": clientID,
                        "clientName": clientName,
                        "direction": this.state.direction,
                        "instrumentId": this.state.currency,
                        "orderStatus": this.state.state,
                        "tradingdayStart": this.state.rangeData[0].format("YYYYMMDD"),
                        "tradingdayEnd": this.state.rangeData[1].format("YYYYMMDD"),
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
                this.setState({ pageNo: page, pageSize: pageSize }, () => this.getEntrustList(this.props.userInfo))
            },
            onChange: (page, pageSize) => {
                this.setState({ pageNo: page, pageSize: pageSize }, () => this.getEntrustList(this.props.userInfo))
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
            <Spin spinning={this.props.loading}>
                <div className={style.gutte_right}>
                    <div className={style.right_title}>  </div>
                    <div className={style.right_bz}>
                        <Tabs tabList={[{ title: "委托查询", tradeTimeFlag: '3' }, { title: "当日成交", tradeTimeFlag: '1' }, { title: "历史成交", tradeTimeFlag: '2' }, { title: "未成交委托查询", tradeTimeFlag: '4' }]}
                            tab={this.state.tab} tabChange={item => this.setState({ tab: item.title, tradeTimeFlag: item.tradeTimeFlag, pageNo: 1 }, () => {
                                this.setState({
                                    state: "",
                                    rangeData: [moment().subtract(1, 'week'), moment()],
                                    currency: "",
                                    direction: "",
                                })
                                this.getEntrustList(this.props.userInfo)
                            })} />
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
                            <Select value={this.state.direction} onChange={(direction) => this.setState({ direction })} style={{ width: 150 }}>
                                <Select.Option value="">全部买/卖</Select.Option>
                                <Select.Option value="0">买</Select.Option>
                                <Select.Option value="1">卖</Select.Option>
                            </Select>
                        </Form.Item>
                        {this.state.tradeTimeFlag == "3" ?
                            <Form.Item>
                                <Select value={this.state.state} onChange={(state) => this.setState({ state })} style={{ width: 150 }}>
                                    <Select.Option value="">全部</Select.Option>
                                    <Select.Option value="1">部分成交</Select.Option>
                                    <Select.Option value="0">全部成交</Select.Option>
                                    <Select.Option value="3">未成交</Select.Option>
                                    <Select.Option value="5">已撤单</Select.Option>
                                </Select>
                            </Form.Item> : null
                        }
                        {this.state.tradeTimeFlag != "1" ?
                            <Form.Item>
                                <RangePicker onChange={(rangeData) => { this.setState({ rangeData: rangeData }) }} value={this.state.rangeData} />
                            </Form.Item> : null
                        }
                        <Form.Item>
                            <Button onClick={() => this.getEntrustList(this.props.userInfo)}>查询</Button>
                        </Form.Item>
                    </Form>
                    <div className={styleA.right_table + " AssetView"}>
                        {(this.state.tradeTimeFlag == "3" || this.state.tradeTimeFlag == "4") ?
                            <Table
                                rowKey="id"
                                columns={columns1}
                                dataSource={this.props.entrustData.content}
                                pagination={pagination}
                            /> :
                            <Table
                                rowKey="id"
                                columns={columns2}
                                dataSource={this.props.entrustData.content}
                                pagination={pagination}
                            />
                        }
                    </div>
                </div>
            </Spin>
        )
    }
}
export default connect((state, props) => {
    return {
        entrustData: state.record.entrustData,
        loading: state.record.loading,
        userInfo: state.user.userInfo,
        currencyList: state.asset.currencyList,
        props
    }
})(Entrust);