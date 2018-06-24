import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';
import kineApi from '../utils/kineApi';
import PubSub from "pubsub-js";
//币币全局相关
export default {

    namespace: 'kine',

    state: {
        instrumentIds: [], //全部合约
        currentInstrument: '',  //当前合约
        loading: true,
        instrumentIdData: {}, //合约详情
        sellList: [],
        buyList: [],
        markLoading: true,
        search: '',
        dataByInstrumentId: {}, //合约深度行情
        list24HVolumeList: {}  //24小时市场行情
    },

    effects: {
        //查询到全部合约
        *getInstrumentIds({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.trad.getInstrumentIds, []);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        instrumentIds: data,
                        currentInstrument: data[1],
                        loading: false
                    }
                })

                yield put({
                    type: 'findByInstrumentID',
                    payload: data[1]
                })
            }
        },

        *currencyChange({ payload }, { call, put }) {
            // yield put({
            //     type: 'save',
            //     payload: {
            //         loading: true
            //     }
            // })
            const { data } = yield call(baseService, api.asset.queryOperTradingAccount, payload);
            if (data != undefined) { //成功
                yield put({
                    type: 'save',
                    payload: {
                        dataSource: data,
                        loading: false
                    }
                })
            } else { // 不知名错误
                yield put({
                    type: 'save',
                    payload: {
                        loading: false
                    }
                })
            }

        },
        //根据合约id查询详情
        *findByInstrumentID({ payload }, { call, put }) {
            const { data } = yield call(baseService, kineApi.trade.findByInstrumentID, [payload]);
            if (data != undefined)
                yield put({
                    type: 'save',
                    payload: {
                        instrumentIdData: data[0]
                    }
                })
        },

        //获取买档行情
        *findBuyMarket({ payload }, { call, put }) {
            console.log("发送")
            const { data } = yield call(baseService, kineApi.trade.findBuyMarket, payload);
            if (data != undefined)
                yield put({
                    type: 'save',
                    payload: {
                        buyList: data.length > 0 ? data : [],
                        markLoading: false
                    }
                })
        },

        //获取卖档行情
        *findSellMarket({ payload }, { call, put }) {
            const { data } = yield call(baseService, kineApi.trade.findSellMarket, payload);
            if (data != undefined)
                yield put({
                    type: 'save',
                    payload: {
                        sellList: data.length > 0 ? data : []
                    }
                })
        },

        //查询单个合约深度行情
        *getLastDayKline({ payload }, { call, put }) {
            const { data } = yield call(baseService, kineApi.instrument.getLastDayKline, payload);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        dataByInstrumentId: data
                    }
                })
            }
        },

        //查询24小时市场成交
        *list24HVolume({ payload }, { call, put }) {
            const { data } = yield call(baseService, kineApi.instrument.list24HVolume, []);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        list24HVolumeList: data
                    }
                })
            }
        }

    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {

        },
        findBuyMarket({ dispatch, history }) {
            return PubSub.subscribe("findBuyMarket", (name, payload) => {
                dispatch({
                    type: "findBuyMarket",
                    payload: [payload]
                })
            })
        },
        findSellMarket({ dispatch, history }) {
            return PubSub.subscribe("findSellMarket", (name, payload) => {
                dispatch({
                    type: "findSellMarket",
                    payload: [payload]
                })
            })
        },
        getLastDayKline({ dispatch, history }) {
            return PubSub.subscribe("findSellMarket", (name, payload) => {
                dispatch({
                    type: 'getLastDayKline',
                    payload: [payload]
                })
            })
        },
        list24HVolume({ dispatch, history }) {
            return PubSub.subscribe("list24HVolume", (name, payload) => {
                dispatch({
                    type: 'list24HVolume'
                })
            })
        },
        getAcountAsset({ dispatch, history }) {
            return PubSub.subscribe("getAcountAsset", (name, payload) => {
                dispatch({
                    type: "currencyChange",
                    payload: [payload]
                })
            })
        },
    },
};
