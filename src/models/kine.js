import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';
import kineApi from '../utils/kineApi';

//币币全局相关
export default {

    namespace: 'kine',

    state: {
        instrumentIds: [], //全部合约
        currentInstrument: '',  //当前合约
        Currency: "USDT", //货币对
        loading: true,
        instrumentIdData: {}, //合约详情
        sellList: [],
        buyList: [],
        markLoading: true,
        search: ''
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
            const { data } = yield call(baseService, kineApi.trade.findBuyMarket, payload);
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
            yield put({
                type: 'save',
                payload: {
                    sellList: data.length > 0 ? data : []
                }
            })
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            if (history.location.pathname == "/kine") {
               
            }
        },
    },
};
