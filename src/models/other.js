import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';

//此模块和业务无任何关系
export default {

    namespace: 'other',

    state: {
        rateList: [],  //费率
        noticeList: [],  //主页公告列表
        messageList: [],   //平台公告
        RateUseList: []  //汇率
    },

    effects: {
        //获取费率
        *queryRateList({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.trad.rate, payload);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        rateList: data
                    }
                })
            }
        },

        //主页公告列表
        *findPushNotice({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.baseConfig.findPushNotice, []);
            console.log(data)
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        noticeList: data
                    }
                })
            }
        },
        //获取平台公告
        *findMessageList({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.baseConfig.findMessageList, [{ "msgType": "", "startDate": "", "endDate": "" }, payload]);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        messageList: data.content || []
                    }
                })
            }
        },

        //查询汇率换算
        *findAllExchangeRateUse({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.baseConfig.findAllExchangeRateUse, []);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        RateUseList: data
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
    },
};