import React, { Component, PropTypes } from 'react';
import style from '../asset/asset.less'
import styleA from './Recharge.less';
import { connect } from 'dva';
import dataFormat from '../../tool/dataFormat';
import Tabs from './tabs';
import { Row, Col, Select, Button, Table, Divider } from 'antd';
const columns = [
    {
        title: '充值流水号',
        dataIndex: 'bankStatement',
    }, {
        title: '时间',
        dataIndex: 'operateDate',
        render: (text, item) => {
            if (item.operateDate != null) {
                return <span>{item.operateDate}  {item.operateTime}</span>
            }
        }
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
class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: 10,
            tab: '充币记录',
            orderStatus: "0"
        }
    }

    componentDidMount() {
        this.getRechargeList();
    }

    getRechargeList() {
        this.props.dispatch({
            type: 'record/rechargeList',
            payload: [this.state.orderStatus, "", "", "", "", "", { "pageNo": this.state.pageNo, "pageSize": this.state.pageSize }]
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
                this.getEntrustList({ pageSize: pageSize, pageNo: page }, () => this.getRechargeList())
            },
            onChange: (page, pageSize) => {
                this.getEntrustList({ pageSize: pageSize, pageNo: page }, () => this.getRechargeList())
            }
        }
        return (
            <div className={style.gutte_right} style={{ overflowX: 'scroll' }}>
                <div className={style.right_title}> 充提币记录 </div>
                <div className={style.right_bz}>
                    <Tabs tabList={[{ title: "充币记录", orderStatus: '0' }, { title: "提币记录", orderStatus: '1' }]} tab={this.state.tab} tabChange={item =>
                        this.setState({ tab: item.title, orderStatus: item.orderStatus, pageNo: 1 }, () => this.getRechargeList())} />
                </div>
                <div className={styleA.right_table + " AssetView"}>
                    <Table
                        columns={columns}
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
        userInfo: state.user.userInfo,
        loading: state.loading.models.record,
        props
    }
})(Recharge);