import baseService from '../services/baseService';
import api from '../utils/api';
import kineApi from '../utils/kineApi';
export default {

    namespace: 'rebate',

    state: {
        PromotionData: {},
        loading: false,
        recordList: [],
        dataList: [],
        InvitedList: {},
        currencysList: []
    },

    subscriptions: {

    },

    effects: {
        *findByPromotionCode({ payload }, { call, put }) {
            yield put({
                type: "save",
                payload: {
                    loading: true
                }
            })
            const { data } = yield call(baseService, api.promotion.findByPromotionCode, []);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        PromotionData: data
                    }
                })
            }
        },

        *findByInvitationToReturnMoneyResponse({ payload }, { call, put }) {
            yield put({
                type: "save",
                payload: {
                    loading: true
                }
            })
            const { data } = yield call(baseService, api.promotion.findByInvitationToReturnMoneyResponse, payload);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        InvitedList: data
                    }
                })
            }
        },

        *findByCommissionexDividend({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.promotion.findByCommissionexDividend, payload);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        dataList: data
                    }
                })
            }
        },

        *findAllCurrencys({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.baseConfig.findAllCurrencys, []);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        currencysList: data
                    }
                })
            }
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },


};
