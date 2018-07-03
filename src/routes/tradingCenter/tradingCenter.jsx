import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Spin, Button , message, Col } from 'antd';
import IMG from "../../assets/tradingCenter.png"
import IMG2 from "../../assets/买入@3x.png";
import IMG3 from "../../assets/卖出2@3x.png";
import IMGWX from "../../assets/微信@3x.png";
import IMGZFB from "../../assets/支付宝@3x.png";
import IMGCAED from "../../assets/card.png"
import "./tradingCenter.less"
import QDModal from "../../components/QDModal"
/**
 * 法币交易中心
 */
class tradingCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "1",
            currencys: "",

            visible:false

        }
        this.columns = [
                {
                    title: '商家',
                    dataIndex: 'nickName'
                }, {
                    title: '币种',
                    dataIndex: 'currency',
                }, {
                    title: '数量',
                    dataIndex: 'surplusVolume',
                },
                {
                    title: '单价',
                    dataIndex: 'price',
                    render: (item) => {
                        return <span>{item}CNY</span>
                    }
                },
                {
                    title: '最小交易量',
                    dataIndex: 'limitVolume',
                },
                {
                    title: '单笔交易区间',
                    dataIndex: 'num',
                    render: (item, record,index) => {
                        return <div>
                            {record.limitVolume * parseFloat(record.price)} ~ {record.surplusVolume * parseFloat(record.price)}CNY
                         </div>
                    }
                },
                {
                    title: '支付方式',
                    dataIndex: 'shouxufei',
                    render: (item,record, index) => {
                        return <div className="payment">
                            {record.bankAccountID != null ?
                                <img src={IMGCAED}/> : null}
                            {record.wechatAccount != null ?
                                <img src={IMGWX}/> : null}
                            {record.alipayAccount != null ?
                                <img src={IMGZFB}/> : null}
                        </div>
                    }
                },

                {
                    title: '操作',
                    dataIndex: 'action',
                    render: (item,record, index) => {
                        return <div className="payment">
                            {record.postersType == "1" ? 
                                <Button type="primary" onClick={(ev) => this.buyBtc(ev, record)}>我要买</Button> :
                                <Button type="primary" onClick={(ev) => this.buyBtc(ev, record)}>我要卖</Button>}
                        </div>
                    },
                }
        ]
    }
    componentWillMount = () => {
        this.props.dispatch({
            type: "tradingCenter/findAllCurrencys",
        })
        this.props.dispatch({
            type: "tradingCenter/findByBiddingPosters",
        })
        this.PaginationChange(1, 10);
    }
    //
    buyBtc = (ev,item) =>{
        if (item.surplusVolume < item.limitVolume) {
            message.error("当前可交易数量不足!");
            return
        }

        const {Bidding} = this.props;
        if (!Bidding.nickname || !Bidding.accountPassword) {
            message.error("请先设置昵称和资金密码!")
            // setTimeout(() => {
            //     FakeRouter.push("userCenter/userCenter.html");
            // }, 2000)
            return;
        }
        let title = null;
        if(item.postersType == "1" ){
            title = "买入"+item.currency
        }else{
            title = "卖出"+item.currency
        }
        this.setState({
            visible:true,
            title
        })
    }
    modalOk = () =>{

    }
    modalCancel = () =>{
        console.log("******8")
        this.setState({
            visible:false
        })
    }
    //买卖点击
    selectClick = (key) => {
        this.setState({
            key
        }, () => {
            this.PaginationChange(1, 10);
        })
    }
    //交易类型点击
    currencysClick = (currencys) => {
        this.setState({
            currencys
        }, () => {
            this.PaginationChange(1, 10);
        })
    }
    //页码变化
    PaginationChange = (current, pageSize) => {
        this.props.dispatch({
            type: "tradingCenter/findBiddingPosters",
            payload: [this.state.currencys, this.state.key, {
                pageSize,
                pageNo: current
            }]
        })
    }
    render() {
        return (
            <div className="tradingCenter" style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <Spin spinning={this.props.loading} size="large" >
                    <div className="tr_gg">
                        <img style={{ marginTop: '-1px' }} src={IMG} alt="" />
                        <span>
                            公告：「重要通知」关于大宗交易区用户审核优化的通知
                        </span>
                    </div>
                    <div className="tr_content">
                        <div className="tr_select">
                            <div onClick={() => this.selectClick('1')} className={this.state.key == 1 ? "active" : ""}><img src={IMG2} />我要买</div>
                            <div onClick={() => this.selectClick('0')} className={this.state.key == 0 ? "active" : ""}><img src={IMG3} />我要卖</div>
                        </div>
                        <div className="tr_neck">
                            <div className={this.state.currencys === "" ? "active" : ""} onClick={() => this.currencysClick("")}>
                                全部
                            </div>
                            {this.props.AllCurrencys.map(ele => {
                                return (
                                    <div className={this.state.currencys === ele ? "active" : ""} onClick={() => this.currencysClick(ele)}>{ele}</div>
                                )
                            })}
                        </div>
                        <div style={{ backgroundColor: "#ffffff" }}>
                            <Table
                                dataSource={this.props.dataSource}
                                rowKey="id"
                                columns={this.columns}
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
                           title={this.state.title}
                           onOk={this.modalOk}
                           onCancel={this.modalCancel}
                        >

                        </QDModal>
                    </div>
                </Spin>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { loading, AllCurrencys, Bidding,current, total, pageSize, dataSource } = state.tradingCenter
    console.log("state===", state.tradingCenter)
    return {
        loading,
        AllCurrencys,
        current,
        total,
        pageSize,
        dataSource,
        Bidding
    }
})(tradingCenter);