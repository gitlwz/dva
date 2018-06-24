import React from "react";
import { Row, Col, Radio, Carousel } from 'antd';
import { connect } from 'dva';
import dataJSON from '../../language/index'
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
            return <div className={styles.upTrend}>+{this.Calculategains(item.closePrice, item.openPrice)}%</div>
        }
        else if (item.closePrice - item.openPrice < 0) {
            return <div className={styles.downTrend}>{this.Calculategains(item.closePrice, item.openPrice)}%</div>
        }
        else {
            return <div>---</div>
        }
    }

    //返回统一数据
    getDataArray() {
        let dataArray = this.props.list24HVolumeList["24hInstrument"] || [];
        let checkedArray = this.state.checkedArray;
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
        let currencys = ["BTC", "USDT", "ETH"];
        return currencys.map(item => {
            return <button className={styles.currency} key={item.currency} style={{ background: this.state.currency == item ? "gold" : '' }}
                onClick={() => this.setState({ currency: item })} key={item}>{item}</button>
        })
    }

    getHotInstrument() {
        let dataArray = this.props.list24HVolumeList["hotInstrument"] || [];
        console.log(dataArray)
        return dataArray.map(item => {
            return <div className={styles.card} key={item.instrumentId}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className={styles.text}>
                    <span>{item.instrumentId}</span>
                    {this.loadChangeVie(item)}
                </div>
                <div className={styles.text}>{item.closePrice != "---" ? parseFloat(item.closePrice.toFixed(4)) : ""}{this.convertCNY(item)}</div>
                <div className={styles.text}>24H量 {item.volume != "---" ? parseInt(item.volume) : '---'}</div>
            </div>
        })
    }


    //计算当前兑换人民币
    convertCNY(item) {
        const title = (index) => {
            return " ≈ " + "  " + CalculateFunc.multiply(item.closePrice, index, 2) + " CNY";
        }
        if (item.closePrice != "---") {
            if (this.state.rateList.length > 0) {
                switch (item.instrumentId) {
                    case "BTC-USDT":
                        return title(this.state.rateList.filter(item => item.currency == "USDT")[0]["exchangeRate"]);
                        break;
                    case "ETH-USDT":
                        return title(this.state.rateList.filter(item => item.currency == "USDT")[0]["exchangeRate"]);
                        break;
                    case "BTC-ETH":
                        return title(this.state.rateList.filter(item => item.currency == "ETH")[0]["exchangeRate"]);
                        break;
                    case "EHT-BTC":
                        return title(this.state.rateList.filter(item => item.currency == "BTC")[0]["exchangeRate"]);
                        break;
                    default:
                        break;
                }
            }
        }

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
                dataIndex: 'closePriceString',
                render: (item) => {
                    if (item.closePriceString != "---") {
                        return <div>{parseFloat(item.closePrice.toFixed(4))}</div>
                    } else {
                        return <div>---</div>
                    }
                }
            },
            {
                title: dataJSON.ZF,
                dataIndex: 'openPriceString',
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
                dataIndex: 'volumeString',
                render: (item) => {
                    if (item.volumeString != "---") {
                        return <div>{parseInt(item.volume)}</div>
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

                <div style={{ display: 'flex', flexDirection: 'row', margin: '30px 0', justifyContent: 'center', }}>
                    {this.loadSearCurrency()}
                    <div className={styles.currency} style={{ background: this.state.currency == "ZX" ? "gold" : '' }} onClick={() => this.setState({ currency: "ZX" })}>
                        <img src={require("../../assets/yinghe/自定义类目@2x.png")} />
                        <p style={{ marginLeft: '20px', fontSize: 20, color: 'rgba(86,86,86,1)' }}>{dataJSON.ZX}</p>
                    </div>
                    <div className={styles.currency + " " + styles.search}>
                        <img src={require("../../assets/yinghe/搜索@2x.png")} style={{ marginLeft: 15 }} />
                        <input value={this.state.search} onChange={e => this.setState({ search: e.target.value.toUpperCase() })} />
                        {/* <div className={styles.searchBtn} onClick={() => {
                            // if (this.state.search != "") {
                            //     let newArray = this.getDataArray().filter(item => {
                            //         console.log(item)
                            //         let itemData = item.instrumentId.split("-");
                            //         return (itemData[0].match(this.state.search))
                            //     })
                            //     console.log(newArray)
                            //     this.setState({ dataArray: newArray })
                            // } else {
                            //     this.setState({ dataArray: this.dataArray })
                            // }
                        }}>{dataJSON.SS}</div>*/}
                    </div>
                </div>

                <div style={{ background: '#FFFFFF', borderRadius: '10px', paddingBottom: 40 }}>
                    <YHTable columns={columns} dataSource={this.getDataArray().filter(item => {
                        if (this.state.currency == "ZX") {
                            return item.checked == true;
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
        props
    }
}, (dispatch) => {
    return {
        list24HVolume: () => {
            dispatch({
                type: 'kine/list24HVolume'
            })
        }
    }

})(Home)