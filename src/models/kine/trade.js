import baseService from '../../services/baseService';
import PubSub from "pubsub-js";
import kineApi from '../../utils/kineApi';

//下单模块
export default {
    namespace: 'trade',
    state: {
        tradeType: '', //交易类型
        buyPrice: 0,
        buyVolume: 0,
        sellPrice: 0,
        sellVolume: 0,
        instrumentIdData: {},//合约详情
        operTradeList: [], //个人成交明细
        orderForClientList: [], //个人委托列表
        operTradeByInstrumentIDList: [], //行情全部成交明细

        tradeDetailLoding: true,
        orderForClientLoading: true
    },

    effects: {
        //下单
        *orderInsert({ payload }, { call, put }) {
            const data = yield call(baseService, kineApi.trade.orderInsert, [payload.orderData]);
            payload.callback(data)
        },

        //撤单
        *orderAction({ payload }, { call, put }) {
            const data = yield call(baseService, kineApi.trade.orderAction, [payload.orderData]);
            payload.callback(data)
        },

        //批量撤单
        *batchOrderAction({ payload }, { call, put }) {
            const data = yield call(baseService, kineApi.trade.batchOrderAction, payload.orderData);
            payload.callback(data)
        },

        //查询用户成交列表
        *queryOperTrade({ payload }, { call, put }) {
            const { data } = yield call(baseService, kineApi.trade.queryOperTrade, payload);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        operTradeList: data.content
                    }
                })
            }
        },

        //查询用户未成交委托列表
        *queryOrderForClient({ payload }, { call, put }) {
            const { data } = yield call(baseService, kineApi.trade.queryOrderForClient, payload);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        orderForClientList: data.content,
                        orderForClientLoading: false
                    }
                })
            }
        },

        //查询行情成交明细
        *queryOperTradeByInstrumentID({ payload }, { call, put }) {
            const { data } = yield call(baseService, kineApi.trade.queryOperTradeByInstrumentID, payload);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        operTradeByInstrumentIDList: data.content,
                        tradeDetailLoding: false
                    }
                })
            }
        },

    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },


    },

    subscriptions: {
        setup({ dispatch, history }) {

        },
        queryOperTradeByInstrumentID({ dispatch, history }) {
            return PubSub.subscribe("queryOperTradeByInstrumentID", (name, payload) => {
                // dispatch({
                //     type: "queryOperTradeByInstrumentID",
                //     payload: payload
                // })
            })
        },
    },
};