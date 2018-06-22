import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';

//此模糊和业务无任何关系
export default {

    namespace: 'other',

    state: {
        rateList: [],  //费率
        noticeList: [],  //平台公告列表
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

        //平台公告列表
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