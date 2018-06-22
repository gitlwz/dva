import React from "react";
import { Radio, Carousel } from 'antd';
import { connect } from 'dva';
import dataJSON from '../../language/index'
import CalculateFunc from '../../tool/CalculateFunc';
import YHTable from '../../components/YHTable';
// import WebGeneralService from '../../../service/WebGeneralService'
// import WSClient from '../../../service/WSClient';
// import CalculateFunc from '../../../utils/CalculateFunc';
// import YHeService from '../../../service/YHeService';
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

            search: ''
        }
        this.dataArray = []
    }

    componentDidMount() {
        let instrumentIds = '';
        this.props.findAllSlideshow();
        this.props.findPushNotice();
        // YHeService.findAllExchangeRateUse().then(res => this.setState({ rateList: res })).catch(err => console.log(err));
        this.getAllInstrumentId()
    }

    componentWillUnmount() {
        // WSClient.delePublic_24h_volume(this.state.currencyList)
    }

    //获取货币对
    getAllInstrumentId() {
        // WebGeneralService.allInstrumentId().then(res => {
        //     for (let i = 0; i < res.length; i++) {
        //         let element = { "instrumentId": "A", "tradingDay": "20180529", "highestPrice": "---", "lowestPrice": "---", "openPrice": "---", "closePrice": "---", "volume": "---" };
        //         element.instrumentId = res[i];
        //         this.dataArray.push(element);
        //     }
        //     WSClient.addPublic_24h_volume(res);
        //     this.setState({ currencyList: res, dataArray: this.dataArray })
        // }).catch();
        // WSClient.getEmitter().on("public_24h_volume", data => this.forMateData(data));
    }

    //获取推送数据
    forMateData(data) {
        let checkedArray = JSON.parse(window.localStorage.getItem("instrumentIdCheck")) || [];
        for (let i = 0; i < this.dataArray.length; i++) {
            if (this.dataArray[i].instrumentId == data.instrumentId) {
                this.dataArray[i] = data;
            }
        }
        //读取缓存的数组 
        for (let i = 0; i < this.dataArray.length; i++) {
            for (let j = 0; j < checkedArray.length; j++) {
                if (this.dataArray[i].instrumentId == checkedArray[j]) {
                    this.dataArray[i]["checked"] = true
                }
            }
        }
        this.setState({ dataArray: this.dataArray })
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
        return this.state.dataArray;
    }

    //选中操作
    checked(instrumentId) {
        let checkedArray = JSON.parse(window.localStorage.getItem("instrumentIdCheck")) || [];
        if (checkedArray.length > 0) {
            if (checkedArray.indexOf(instrumentId) > -1) {
                //改掉原来数据的checked状态
                for (let i = 0; i < this.dataArray.length; i++) {
                    if (this.dataArray[i].instrumentId == instrumentId) {
                        this.dataArray[i]["checked"] = false
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
    }


    loadSearCurrency() {
        let currencys = ["BTC", "USDT", "ETH"];
        return currencys.map(item => {
            return <button className={styles.currency} key={item.currency} style={{ background: this.state.currency == item ? "gold" : '' }}
                onClick={() => this.setState({ currency: item })} key={item}>{item}</button>
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
        //const { dataJSON } = this.props;
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
                        return <div>{parseFloat(item.closePrice.toFixed(4))}</div>
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
                dataIndex: 'highestPrice',
            },
            {
                title: dataJSON.ZDJ,
                dataIndex: 'lowestPrice',
            },
            {
                title: dataJSON.LXSCJ,
                dataIndex: 'volume',
                render: (item) => {
                    if (item.volume != "---") {
                        return <div>{parseInt(item.volume)}</div>
                    } else {
                        return <div>---</div>
                    }
                }
            },
        ]

        const dataSource = [{ currency: 'BTC-AXD', newPrice: '6.44', newPrice: '56.11', isUp: true, trad: '0.12%', HPrice: '153.65', LPrice: '2.12', volume: '1555' }, { currency: 'BTC-AXD', newPrice: '6.44', newPrice: '56.11', trad: '0.12%', HPrice: '153.65', LPrice: '2.12', volume: '1555' }]
        return <div style={{ padding: '30px 0px', background: '#f7f7f7', display: 'flex', justifyContent: 'center' }}>
            <div>
                <a> 1111 1111 1111</a>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.getDataArray().map(item => {
                        if (item.instrumentId == "BTC-USDT" || item.instrumentId == "ETH-USDT" || item.instrumentId == "BTC-ETH" || item.instrumentId == "EHT-BTC")
                            return <div className={styles.card} key={item.instrumentId}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }} className={styles.text}>
                                    <span>{item.instrumentId}</span>
                                    {this.loadChangeVie(item)}
                                </div>
                                <div className={styles.text}>{item.closePrice != "---" ? parseFloat(item.closePrice.toFixed(4)) : ""}{this.convertCNY(item)}</div>
                                <div className={styles.text}>24H量 {item.volume != "---" ? parseInt(item.volume) : '---'}</div>
                            </div>
                    })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', margin: '30px 0', justifyContent: 'center', }}>
                    {this.loadSearCurrency()}
                    <div className={styles.currency} style={{ background: this.state.currency == "ZX" ? "gold" : '' }} onClick={() => this.setState({ currency: "ZX" })}>
                        <img src={require("../../assets/yinghe/自定义类目@2x.png")} />
                        <p style={{ marginLeft: '20px', fontSize: 20, color: 'rgba(86,86,86,1)' }}>{dataJSON.ZX}</p>
                    </div>
                    <div className={styles.currency + " " + styles.search}>
                        <img src={require("../../assets/yinghe/搜索@2x.png")} style={{ marginLeft: 15 }} />
                        <input value={this.state.search} onChange={e => this.setState({ search: e.target.value })} />
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
        noticeList: state.other.noticeList,
        props
    }
}, (dispatch, props) => {
    return {
        findAllSlideshow: () => {
            dispatch({
                type: 'app/findAllSlideshow',
                payload: []
            })
        },
        findPushNotice: () => {
            dispatch({
                type: 'other/findPushNotice'
            })
        }
    }

})(Home)