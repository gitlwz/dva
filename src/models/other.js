import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';

//此模糊和业务无任何关系
export default {

    namespace: 'other',

    state: {
        rateList: [],  //费率
        noticeList: [],  //主页公告列表
        messageList: []   //平台公告
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
            const { data } = yield call(baseService, api.baseConfig.findMessageList, [{ "msgType": "", "startDate": "", "endDate": "" }, { "pageNo": 1, "pageSize": 10 }]);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        messageList: data.content || []
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