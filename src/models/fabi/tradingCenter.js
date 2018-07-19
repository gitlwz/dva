import api from '../../utils/api';
import baseService from '../../services/baseService';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'tradingCenter',

    state: {
        loading: false,
        AllCurrencys: ["BTC", "USDT", "ETH"],
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
            let data = yield call(baseService, api.tradingCenter.fiatDetails, [...payload]);
            if (data !== undefined) {
                if (data.errorCode == 0) {
                    message.success("下单成功!");
                    yield put(routerRedux.push("/tradingDetail/" + data.data))
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
        // *findAllCurrencys({ payload }, { call, put }) {
        //     yield put({
        //         type: 'save',
        //         payload: {
        //             loading: true
        //         }
        //     })
        //     let { data } = yield call(baseService, api.tradingCenter.findAllCurrencys, []);
        //     if (!!data && data.length > 0) {
        //         yield put({
        //             type: 'save',
        //             payload: {
        //                 loading: false,
        //                 AllCurrencys: data
        //             }
        //         })
        //     }
        // },
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

            if (!!data) {
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
