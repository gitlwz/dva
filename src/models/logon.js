import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';

export default {

    namespace: 'logon',

    state: {
        dataList: [],
        pageNum:1
    },

    effects: {
        *queryLogonList({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.system.logon, payload);
            yield put({
                type: 'save',
                payload: {
                    dataList: data
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
        },
    },
};