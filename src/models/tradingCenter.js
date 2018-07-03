import api from '../utils/api';
import baseService from '../services/baseService';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'tradingCenter',

    state: {
        loading: false,
        AllCurrencys: [],
        current: 1,
        total: 0,
        pageSize: 10,
        dataSource: [],
        Bidding: {}
    },

    subscriptions: {

    },

    effects: {
        *fiatDetails({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            let { data } = yield call(baseService, api.tradingCenter.fiatDetails, [...payload]);
            if (data !== undefined) {
                if(!!data){
                    message.success("交易成功!");
                    // yield  put(routerRedux.push("/asset?type=2"))

                }
                yield put({
                    type: 'save',
                    payload: {
                        loading: false
                    }
                })
            }

        },
        *findByBiddingPosters({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            let { data } = yield call(baseService, api.tradingCenter.findByBiddingPosters, []);
            data = {
                "orderID": null,
                "postersID": null,
                "postersType": null,
                "currency": null,
                "currencyList": ["USDT", "BTC", "AIX", "ISQ", "KOG", "CNHE", "FFF", "LTC", "EOS", "BCH", "XRP", "QTUM", "NEO"],
                "volume": null,
                "limitVolume": null,
                "frozenVolume": null,
                "surplusVolume": null,
                "posterFee": null,
                "tradingID": null,
                "createDate": null,
                "createTime": null,
                "postersStatus": null,
                "businessType": null,
                "number": null,
                "clientID": null,
                "price": null,
                "amount": null,
                "payment": null,
                "realName": null,
                "bankName": null,
                "accountOpeningBranch": null,
                "bankAccountID": null,
                "alipayAccount": null,
                "wechatAccount": null,
                "cancelTime": null,
                "collectionTime": null,
                "cancelDebt": null,
                "state": null,
                "timeRemaining": null,
                "accountPassword": "96e79218965eb72c92a549dd5a330112",
                "sellerTimeRemaining": null,
                "nickname": "果果",
                "wechatAccountPhoto": null,
                "alipayAccountPhoto": null
            }

            if (!!data) {
                yield put({
                    type: 'save',
                    payload: {
                        loading: false,
                        Bidding: data
                    }
                })
            }
        },
        *findAllCurrencys({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            let { data } = yield call(baseService, api.tradingCenter.findAllCurrencys, []);
            data = ["USDT", "BTC", "ETH", "AIX", "ISQ", "KOG", "CNHE", "GDP", "FFF", "QQQ", "LTC", "EOS", "BCH", "XRP", "QTUM", "NEO"]
            if (!!data && data.length > 0) {
                yield put({
                    type: 'save',
                    payload: {
                        loading: false,
                        AllCurrencys: data
                    }
                })
            }
        },
        *findBiddingPosters({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true,
                    current: payload[2].pageNo,
                    pageSize: payload[2].pageSize,
                }
            })
            let { data } = yield call(baseService, api.tradingCenter.findBiddingPosters, [...payload]);
            data = {
                "pageNo": 1,
                "pageSize": 10,
                "totalRecord": 16,
                "totalPage": 2,
                "content": [{
                    "id": 148,
                    "postersID": "GS20180605025009",
                    "postersType": "1",
                    "currency": "BTC",
                    "volume": 10.565656565898980000,
                    "volumeStr": null,
                    "limitVolume": 1.000000000000000000,
                    "limitVolumeStr": null,
                    "frozenVolume": 10.000000000000000000,
                    "frozenVolumeStr": null,
                    "surplusVolume": 0.565656565898980000,
                    "surplusVolumeStr": null,
                    "price": "100",
                    "posterFee": 0.105656565658989800,
                    "posterFeeStr": null,
                    "deductPosterFee": null,
                    "deductPosterFeeStr": null,
                    "createDate": "20180605",
                    "operateEndDate": null,
                    "bankAccountID": null,
                    "nickName": "48的昵称",
                    "alipayAccount": null,
                    "wechatAccount": "12312123@qq.com",
                    "createTime": "18:52:53",
                    "postersStatus": "1",
                    "clientID": "0000000048",
                    "posterUseMargin": null,
                    "posterUseMarginStr": null
                }, {
                    "id": 142,
                    "postersID": "GS20180522022004",
                    "postersType": "1",
                    "currency": "BTC",
                    "volume": 10.565656565600000000,
                    "volumeStr": null,
                    "limitVolume": 5.000000000000000000,
                    "limitVolumeStr": null,
                    "frozenVolume": 0E-18,
                    "frozenVolumeStr": null,
                    "surplusVolume": 10.565656565600000000,
                    "surplusVolumeStr": null,
                    "price": "10",
                    "posterFee": 0.105656565656000000,
                    "posterFeeStr": null,
                    "deductPosterFee": null,
                    "deductPosterFeeStr": null,
                    "createDate": "20180522",
                    "operateEndDate": null,
                    "bankAccountID": null,
                    "nickName": "48的昵称",
                    "alipayAccount": null,
                    "wechatAccount": "12312123@qq.com",
                    "createTime": "15:28:33",
                    "postersStatus": "1",
                    "clientID": "0000000048",
                    "posterUseMargin": null,
                    "posterUseMarginStr": null
                }, {
                    "id": 130,
                    "postersID": "GS20180517019005",
                    "postersType": "1",
                    "currency": "FFF",
                    "volume": 100.000000000000000000,
                    "volumeStr": null,
                    "limitVolume": 1.000000000000000000,
                    "limitVolumeStr": null,
                    "frozenVolume": 0E-18,
                    "frozenVolumeStr": null,
                    "surplusVolume": 100.000000000000000000,
                    "surplusVolumeStr": null,
                    "price": "1.5",
                    "posterFee": 120.000000000000000000,
                    "posterFeeStr": null,
                    "deductPosterFee": null,
                    "deductPosterFeeStr": null,
                    "createDate": "20180517",
                    "operateEndDate": null,
                    "bankAccountID": null,
                    "nickName": "jeq",
                    "alipayAccount": "harstanber@163.com",
                    "wechatAccount": null,
                    "createTime": "15:57:10",
                    "postersStatus": "1",
                    "clientID": "0000000002",
                    "posterUseMargin": null,
                    "posterUseMarginStr": null
                }, {
                    "id": 120,
                    "postersID": "GS20180517017017",
                    "postersType": "1",
                    "currency": "BTC",
                    "volume": 0.212222222200000000,
                    "volumeStr": null,
                    "limitVolume": 0.230000000000000000,
                    "limitVolumeStr": null,
                    "frozenVolume": 0E-18,
                    "frozenVolumeStr": null,
                    "surplusVolume": 0.212222222200000000,
                    "surplusVolumeStr": null,
                    "price": "111",
                    "posterFee": 0.002122222222000000,
                    "posterFeeStr": null,
                    "deductPosterFee": null,
                    "deductPosterFeeStr": null,
                    "createDate": "20180517",
                    "operateEndDate": null,
                    "bankAccountID": "555555555555555555",
                    "nickName": "果果",
                    "alipayAccount": "123@qq.com",
                    "wechatAccount": null,
                    "createTime": "11:21:32",
                    "postersStatus": "1",
                    "clientID": "0000000007",
                    "posterUseMargin": null,
                    "posterUseMarginStr": null
                }, {
                    "id": 117,
                    "postersID": "GS20180516017001",
                    "postersType": "1",
                    "currency": "AIX",
                    "volume": 10.000000000000000000,
                    "volumeStr": null,
                    "limitVolume": 1.000000000000000000,
                    "limitVolumeStr": null,
                    "frozenVolume": -8.000000000000000000,
                    "frozenVolumeStr": null,
                    "surplusVolume": 18.000000000000000000,
                    "surplusVolumeStr": null,
                    "price": "1",
                    "posterFee": 0.100000000000000000,
                    "posterFeeStr": null,
                    "deductPosterFee": null,
                    "deductPosterFeeStr": null,
                    "createDate": "20180516",
                    "operateEndDate": null,
                    "bankAccountID": null,
                    "nickName": "ffffff",
                    "alipayAccount": "12345612",
                    "wechatAccount": null,
                    "createTime": "17:52:42",
                    "postersStatus": "1",
                    "clientID": "0000000044",
                    "posterUseMargin": null,
                    "posterUseMarginStr": null
                }, {
                    "id": 113,
                    "postersID": "GS20180516015008",
                    "postersType": "1",
                    "currency": "BTC",
                    "volume": 100.000000000000000000,
                    "volumeStr": null,
                    "limitVolume": 10.000000000000000000,
                    "limitVolumeStr": null,
                    "frozenVolume": 0E-18,
                    "frozenVolumeStr": null,
                    "surplusVolume": 90.000000000000000000,
                    "surplusVolumeStr": null,
                    "price": "1",
                    "posterFee": 1.000000000000000000,
                    "posterFeeStr": null,
                    "deductPosterFee": 0.100000000000000000,
                    "deductPosterFeeStr": null,
                    "createDate": "20180516",
                    "operateEndDate": null,
                    "bankAccountID": "555555555555555555",
                    "nickName": "果果",
                    "alipayAccount": "123@qq.com",
                    "wechatAccount": null,
                    "createTime": "11:29:11",
                    "postersStatus": "1",
                    "clientID": "0000000007",
                    "posterUseMargin": null,
                    "posterUseMarginStr": null
                }, {
                    "id": 114,
                    "postersID": "GS20180516015009",
                    "postersType": "1",
                    "currency": "BTC",
                    "volume": 100.000000000000000000,
                    "volumeStr": null,
                    "limitVolume": 10.000000000000000000,
                    "limitVolumeStr": null,
                    "frozenVolume": 0E-18,
                    "frozenVolumeStr": null,
                    "surplusVolume": 80.000000000000000000,
                    "surplusVolumeStr": null,
                    "price": "1",
                    "posterFee": 1.000000000000000000,
                    "posterFeeStr": null,
                    "deductPosterFee": 0.200000000000000000,
                    "deductPosterFeeStr": null,
                    "createDate": "20180516",
                    "operateEndDate": null,
                    "bankAccountID": "555555555555555555",
                    "nickName": "果果",
                    "alipayAccount": "123@qq.com",
                    "wechatAccount": null,
                    "createTime": "11:29:11",
                    "postersStatus": "1",
                    "clientID": "0000000007",
                    "posterUseMargin": null,
                    "posterUseMarginStr": null
                }, {
                    "id": 97,
                    "postersID": "GS20180511012013",
                    "postersType": "1",
                    "currency": "BTC",
                    "volume": 10.000000000000000000,
                    "volumeStr": null,
                    "limitVolume": 5.000000000000000000,
                    "limitVolumeStr": null,
                    "frozenVolume": 0E-18,
                    "frozenVolumeStr": null,
                    "surplusVolume": 10.000000000000000000,
                    "surplusVolumeStr": null,
                    "price": "1",
                    "posterFee": 0.100000000000000000,
                    "posterFeeStr": null,
                    "deductPosterFee": null,
                    "deductPosterFeeStr": null,
                    "createDate": "20180511",
                    "operateEndDate": null,
                    "bankAccountID": null,
                    "nickName": "48的昵称",
                    "alipayAccount": null,
                    "wechatAccount": "12312123@qq.com",
                    "createTime": "15:43:39",
                    "postersStatus": "1",
                    "clientID": "0000000048",
                    "posterUseMargin": null,
                    "posterUseMarginStr": null
                }, {
                    "id": 79,
                    "postersID": "GS20180509006021",
                    "postersType": "1",
                    "currency": "FFF",
                    "volume": 1.000000000000000000,
                    "volumeStr": null,
                    "limitVolume": 1.000000000000000000,
                    "limitVolumeStr": null,
                    "frozenVolume": 0E-18,
                    "frozenVolumeStr": null,
                    "surplusVolume": 1.000000000000000000,
                    "surplusVolumeStr": null,
                    "price": "1",
                    "posterFee": 1.200000000000000000,
                    "posterFeeStr": null,
                    "deductPosterFee": null,
                    "deductPosterFeeStr": null,
                    "createDate": "20180509",
                    "operateEndDate": null,
                    "bankAccountID": null,
                    "nickName": "jeq",
                    "alipayAccount": "harstanber@163.com",
                    "wechatAccount": null,
                    "createTime": "17:16:17",
                    "postersStatus": "1",
                    "clientID": "0000000002",
                    "posterUseMargin": null,
                    "posterUseMarginStr": null
                }, {
                    "id": 76,
                    "postersID": "GS20180509006017",
                    "postersType": "1",
                    "currency": "BTC",
                    "volume": 24.000000000000000000,
                    "volumeStr": null,
                    "limitVolume": 6.000000000000000000,
                    "limitVolumeStr": null,
                    "frozenVolume": 0E-18,
                    "frozenVolumeStr": null,
                    "surplusVolume": 24.000000000000000000,
                    "surplusVolumeStr": null,
                    "price": "23",
                    "posterFee": 24.000000000000000000,
                    "posterFeeStr": null,
                    "deductPosterFee": null,
                    "deductPosterFeeStr": null,
                    "createDate": "20180509",
                    "operateEndDate": null,
                    "bankAccountID": null,
                    "nickName": "20",
                    "alipayAccount": "123@qq.com",
                    "wechatAccount": null,
                    "createTime": "16:15:27",
                    "postersStatus": "1",
                    "clientID": "0000000020",
                    "posterUseMargin": null,
                    "posterUseMarginStr": null
                }]
            }
            if (!!data && !!data.totalRecord) {
                console.log("**22222222222222222**", data.totalRecord)
                yield put({
                    type: 'save',
                    payload: {
                        loading: false,
                        total: data.totalRecord,
                        dataSource: data.content
                    }
                })
            }
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },


};
