import React from "react";
import { Row, Col, Radio, Carousel } from 'antd';
import { connect } from 'dva';
import dataJSON from '../../language/index'
import format from '../../tool/formatNmber';
import CalculateFunc from '../../tool/CalculateFunc';
import YHTable from '../../components/YHTable';
import PubSub from "pubsub-js";
import styles from './home.less'
/**
 * 模块设置页面主题
 */
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currency: "BTC",
            dataArray: [],
            instrumentIds: '',
            currencyList: [],
            rateList: [],
            checkedArray: JSON.parse(window.localStorage.getItem("instrumentIdCheck")) || [],
            search: ''
        }
        this.dataArray = [];
    }

    componentDidMount() {
        this.props.getInstrumentIds();
        this.props.findAllExchangeRateUse();
        PubSub.publish('Polling.addsubscribe',
            [
                { name: "list24HVolume" },
            ]
        )
    }

    componentWillUnmount() {
        PubSub.publish('Polling.delsubscribe', ["list24HVolume"])
    }

    //计算涨跌幅
    Calculategains(closePrice, openPrice) {
        let num = (closePrice - openPrice) / openPrice;
        return (num * 100).toFixed(2)
    }


    //返回涨跌幅组件
    loadChangeVie(item) {
        if (item.closePrice - item.openPrice > 0) {
            return <div className={styles.downTrend}>+{this.Calculategains(item.closePrice, item.openPrice)}%</div>
        }
        else if (item.closePrice - item.openPrice < 0) {
            return <div className={styles.upTrend}>{this.Calculategains(item.closePrice, item.openPrice)}%</div>
        }
        else {
            return <div>---</div>
        }
    }

    //返回统一数据
    getDataArray() {
        let dataSource = this.props.list24HVolumeList["24hInstrument"] || [];
        let instrumentIds = this.props.instrumentIds;
        let checkedArray = this.state.checkedArray;
        let dataArray = [];

        for (let i = 0; i < instrumentIds.length; i++) {
            let element = { "instrumentId": instrumentIds[i], "tradingDay": "20180529", "highestPrice": "---", "lowestPrice": "---", "openPrice": "---", "closePrice": "---", "volume": "---" };
            for (let j = 0; j < dataSource.length; j++) {
                if (instrumentIds[i] == dataSource[j].instrumentId) {
                    element = dataSource[j];
                }
            }
            dataArray.push(element);
        }

        //读取缓存的数组
        for (let i = 0; i < dataArray.length; i++) {
            for (let j = 0; j < checkedArray.length; j++) {
                if (dataArray[i].instrumentId == checkedArray[j]) {
                    dataArray[i]["checked"] = true
                }
            }
        }

        if (dataArray.length > 0) {
            return dataArray
        }
        return []
    }

    //选中操作
    checked(instrumentId) {
        let checkedArray = this.state.checkedArray;
        if (checkedArray.length > 0) {
            if (checkedArray.indexOf(instrumentId) > -1) {
                //改掉原来数据的checked状态
                for (let i = 0; i < this.getDataArray().length; i++) {
                    if (this.getDataArray()[i].instrumentId == instrumentId) {
                        this.getDataArray()[i]["checked"] = false
                    }
                }
                checkedArray.splice(checkedArray.indexOf(instrumentId), 1);
            } else {
                checkedArray.push(instrumentId);
            }
        } else {
            checkedArray.push(instrumentId)
        }
        window.localStorage.setItem("instrumentIdCheck", JSON.stringify(checkedArray));
        this.setState({ checkedArray })
    }


    loadSearCurrency() {
        let currencys = ["BTC", "USDT", "ETH","SDAX"];
        return currencys.map(item => {
            return <button className={styles.currency} key={item.currency} style={{ background: this.state.currency == item ? "gold" : '' }}
                onClick={() => this.setState({ currency: item })} key={item}>{item}</button>
        })
    }

    //获取热点货币
    getHotInstrument() {
        let dataArray = this.props.list24HVolumeList["hotInstrument"] || [];
        return dataArray.map(item => {
            return <div className={styles.card} key={item.instrumentId}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className={styles.text}>
                    <span>{item.instrumentId}</span>
                    {this.loadChangeVie(item)}
                </div>
                <div className={styles.text}>{item.closePriceString != "---" ? item.closePriceString : ""}≈{item.convertCnyString} CNY</div>
                <div className={styles.text}>24H量 {item.volumeString != "---" ? item.volumeString : '---'}</div>
            </div>
        })
    }

    render() {

        const columns = [
            {
                title: dataJSON.JYD,
                dataIndex: 'instrumentId',
                render: (item) => {
                    return <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', width: 150, alignItems: 'center' }}>
                            <img src={item.checked == true ? require("../../assets/yinghe/形状 2@2x.png") : require("../../assets/yinghe/形状 2 副本@2x.png")} style={{ marginRight: 20, width: 18, height: 18 }} onClick={() => this.checked(item.instrumentId)} />
                            <span>{item.instrumentId}</span>
                        </div>

                    </div>
                }
            },
            {
                title: dataJSON.ZXJ,
                dataIndex: 'closePrice',
                render: (item) => {
                    if (item.closePrice != "---") {
                        return <div>{item.closePriceString}</div>
                    } else {
                        return <div>---</div>
                    }
                }
            },
            {
                title: dataJSON.ZF,
                dataIndex: 'openPrice',
                render: (item) => {
                    return <div style={{ display: "flex", justifyContent: "center" }}>
                        {this.loadChangeVie(item)}
                    </div>
                }
            },
            {
                title: dataJSON.ZGJ,
                dataIndex: 'highestPriceString',
            },
            {
                title: dataJSON.ZDJ,
                dataIndex: 'lowestPriceString',
            },
            {
                title: dataJSON.LXSCJ,
                dataIndex: 'volume',
                render: (item) => {
                    if (item.volume != "---") {
                        return <div>{item.volumeString}</div>
                    } else {
                        return <div>---</div>
                    }
                }
            },
        ]
        return <div style={{ padding: '30px 0px', background: '#f7f7f7', display: 'flex', justifyContent: 'center' }}>
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.getHotInstrument()}
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', margin: '30px 0', justifyContent: 'center', cursor: "pointer" }}>
                    {this.loadSearCurrency()}
                    <div className={styles.currency} style={{ background: this.state.currency == "ZX" ? "gold" : '' }} onClick={() => this.setState({ currency: "ZX" })}>
                        <img src={require("../../assets/yinghe/自定义类目@2x.png")} />
                        <p style={{ marginLeft: '20px', fontSize: 20, color: 'rgba(86,86,86,1)' }}>{dataJSON.ZX}</p>
                    </div>
                    <div className={styles.currency + " " + styles.search}>
                        <img src={require("../../assets/yinghe/搜索@2x.png")} style={{ marginLeft: 15 }} />
                        <input value={this.state.search} onChange={e => this.setState({ search: e.target.value.toUpperCase() })} />
                    </div>
                </div>

                <div style={{ background: '#FFFFFF', borderRadius: '10px', paddingBottom: 40 }}>
                    <YHTable columns={columns} dataSource={this.getDataArray().filter(item => {
                        if (this.state.currency == "ZX") {
                            if (this.state.search !== "") {
                                return (item.checked == true && item.instrumentId.split("-")[0].match(this.state.search))
                            } else {
                                return item.checked == true;
                            }

                        } else {
                            if (this.state.search != "") {
                                return (this.state.currency == item.instrumentId.split("-")[1] && item.instrumentId.split("-")[0].match(this.state.search))
                            } else {
                                return this.state.currency == item.instrumentId.split("-")[1]
                            }
                        }
                    })} />
                </div>
            </div>
        </div>
    }
}

export default connect((state, props) => {
    return {
        instrumentIds: state.kine.instrumentIds,
        list24HVolumeList: state.kine.list24HVolumeList,
        instrumentIds: state.kine.instrumentIds,
        RateUseList: state.other.RateUseList,
        props
    }
}, (dispatch) => {
    return {
        findAllExchangeRateUse: () => {
            dispatch({
                type: 'other/findAllExchangeRateUse'
            })
        },
        getInstrumentIds: () => {
            dispatch({
                type: 'kine/getInstrumentIds'
            })
        },
        dispatch
    }

})(Home)
