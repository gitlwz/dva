import React from "react";
import { Row, Col, DatePicker, Card, Button, Popover, Table, Form, Select, message } from 'antd';
import { connect } from 'dva';
import copy from 'copy-to-clipboard';
import styles from "./rebate.less";
import moment from 'moment';
import dataFormat from "../../tool/dataFormat"
const QRCode = require('qrcode.react');
const { RangePicker } = DatePicker
const { Option } = Select
class Rebase extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rangeData: [moment().subtract(1, 'week'), moment()],
            page1: 1,
            pageSize1: 10,

            pageNo: 1,
            currency: "",
            dividendType: "",
            pageSize: 10,
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'rebate/findByPromotionCode'
        });
        this.getYQRecord();
        this.getDataliat();
        this.props.dispatch({
            type: "rebate/findAllCurrencys"
        })
    }

    getYQRecord() {
        this.props.dispatch({
            type: "rebate/findByInvitationToReturnMoneyResponse",
            payload: [{ pageNo: this.state.page1, pageSize: this.state.pageSize1 }]
        })
    }

    getDataliat() {
        this.props.dispatch({
            type: "rebate/findByCommissionexDividend",
            payload: [{ pageNo: this.state.pageNo, pageSize: this.state.pageSize },
            {
                transactionStartDate: this.state.rangeData[0].format("YYYYMMDD"), transactionEndDate: this.state.rangeData[1].format("YYYYMMDD"),
                currency: this.state.currency,
                dividendType: this.state.dividendType
            }]
        })
    }


    loadRank() {
        const { ranking } = this.props.PromotionData;
        const images = [require("../../assets/first@3x.png"), require("../../assets/second@3x.png"), require("../../assets/three@3x.png")]

        if (ranking && ranking.length > 0) {
            return ranking.map((item, index) => {
                return <Row type="flex" key={index}>
                    <Col span={12}><img src={images[index]} /> <span className={styles.num + " " + styles.height60}>第{index + 1}名</span>{item.registeredName}</Col> <Col span={12} style={{ textAlign: "right" }}>反佣折合:{item.value} {item.currency}</Col>
                </Row>
            })

        }
    }

    render() {
        const content = (
            <div>
                <QRCode size={170} value={this.props.PromotionData.sponsoredLinks || ""} />
            </div>
        )

        const columns1 = [{
            title: '被邀请人账号',
            dataIndex: 'beinvitedRegisteredName',
            key: 'beinvitedRegisteredName',
            width: "25%"
        }, {
            title: '邀请人账号',
            dataIndex: 'registeredName',
            key: 'registeredName',
            width: "25%"
        }, {
            title: '邀请返币',
            dataIndex: 'volume',
            key: 'volume',
            width: "25%",
            render: (text, item) => {
                return <span>{item.volume} {item.currency}</span>
            }
        }, {
            title: '时间',
            dataIndex: 'createDate',
            key: 'createDate',
            width: "25%",
            render: (text, item) => {
                return <span>{item.createDate} {item.endTime}</span>
            }

        }];

        const columns = [{
            title: '时间',
            dataIndex: 'transactionDate',
            key: 'transactionDate',
            width: "25%"
        }, {
            title: '类型',
            dataIndex: 'dividendType',
            key: 'dividendType',
            width: "25%",
            render: (text, item) => {
                return dataFormat.dividendType(text)
            }
        }, {
            title: '币种',
            dataIndex: 'currency',
            key: 'currency',
            width: "25%"
        }, {
            title: '数量',
            dataIndex: 'dividendAmount',
            key: 'dividendAmount',
            width: "25%",

        }];

        const pagination1 = {
            total: this.props.InvitedList.totalRecord,
            current: this.state.pageNo1,
            showSizeChanger: true,
            showQuickJumper: true,
            onShowSizeChange: (page, pageSize) => {
                this.setState({ pageNo1: page, pageSize1: pageSize }, () => this.getYQRecord())
            },
            onChange: (page, pageSize) => {
                this.setState({ pageNo1: page, pageSize1: pageSize }, () => this.getYQRecord())
            }
        }

        const pagination = {
            total: this.props.dataList.totalRecord,
            current: this.state.pageNo,
            showSizeChanger: true,
            showQuickJumper: true,
            onShowSizeChange: (page, pageSize) => {
                this.setState({ pageNo: page, pageSize: pageSize }, () => this.getDataliat())
            },
            onChange: (page, pageSize) => {
                this.setState({ pageNo: page, pageSize: pageSize }, () => this.getDataliat())
            }
        }

        return (
            <div style={{ background: "#F4F4F4" }}>
                <div className={styles.root}>
                    <Row type="flex" align="middle" style={{ marginTop: 50 }}>
                        <img src={require("../../assets/ic_ranking@2x.png")} />   <span style={{ fontSize: 20 }}>  2018年{(new Date).getMonth() + 1}月 邀请榜单</span>
                    </Row>
                    <Card className={styles.card}>
                        {this.loadRank()}
                    </Card>

                    <Row type="flex" align="middle" style={{ marginTop: 20 }}>
                        <img src={require("../../assets/ic_share@2x.png")} />   <span style={{ fontSize: 20 }}>我的推广</span>
                    </Row>
                    <Card className={styles.card}>
                        <Row className={styles.num + " " + styles.height60}>
                            推广邀请码：{this.props.PromotionData.inviteCode}
                            <Button onClick={() => {
                                copy(this.props.PromotionData.inviteCode);
                                message.success("复制成功!")
                            }}>复制</Button>
                        </Row>
                        <Row className={styles.num + " " + styles.height60}>
                            推广链接:{this.props.PromotionData.sponsoredLinks}
                            <Button onClick={() => {
                                copy(this.props.PromotionData.sponsoredLinks);
                                message.success("复制成功!")
                            }}>复制</Button>
                        </Row>
                        <Row className={styles.num + " " + styles.height60}>
                            推广邀请码： <Popover content={content} title="推广二维码" placement="right">
                                <QRCode size={24} value={this.props.PromotionData.sponsoredLinks || ""} />
                            </Popover>
                        </Row>

                        <Row style={{ margin: '20px 0' }}>
                            <div className={styles.tab}>
                                <div className={styles.bg}></div>
                                <div className={styles.title}>邀请情况</div>
                            </div>
                        </Row>
                        <Table columns={columns1} dataSource={this.props.InvitedList.content}
                            pagination={pagination1} rowKey="detailId" />

                        <Row style={{ margin: '20px 0' }}>
                            <div className={styles.tab}>
                                <div className={styles.bg}></div>
                                <div className={styles.title}>财务情况</div>
                            </div>
                        </Row>
                        <Row>
                            <Form layout="inline">
                                <Form.Item label="时间">
                                    <RangePicker onChange={(rangeData) => { this.setState({ rangeData: rangeData }) }} value={this.state.rangeData} />
                                </Form.Item>
                                <Form.Item label="类型">
                                    <Select value={this.state.dividendType} onChange={(dividendType) => this.setState({ dividendType })} style={{ width: 150 }}>
                                        <Option value="">全部</Option>
                                        <Option value="3">返佣记录</Option>
                                        <Option value="2">注册送币记录</Option>
                                        <Option value="1">交易挖矿</Option>
                                        <Option value="0">持币分红</Option>
                                        <Option value="4">邀请返币</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="币种">
                                    <Select value={this.state.currency} onChange={(currency) => this.setState({ currency })} style={{ width: 150 }}>
                                        <Option value="">全部</Option>
                                        {this.props.currencysList.map(item => {
                                            return <Option value={item} key={item}>{item}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={() => this.getDataliat()}>查询</Button>
                                </Form.Item>
                            </Form>
                        </Row>
                        <Table columns={columns} dataSource={this.props.dataList.content}
                            pagination={pagination} rowKey="id" loading={this.props.loading} />
                    </Card>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        PromotionData: state.rebate.PromotionData,
        dataList: state.rebate.dataList,
        InvitedList: state.rebate.InvitedList,
        loading: state.loading.models.rebate,
        currencysList: state.rebate.currencysList,
        props
    }
})(Rebase)