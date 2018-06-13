import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';
import { message } from 'antd';
export default {

    namespace: 'user',

    state: {
        userInfo: {},
        isLogin: false,
        userName: ''
    },

    effects: {
        *login({ payload }, { call, put }) {
            const data = yield call(baseService, api.user.logon, payload);
            if (data != undefined) {
                if (data.errorCode == 0) {
                    yield put(routerRedux.push("./"))
                } else {
                    message.error(data.errorMsg)
                }
            }
        },

        *getUserId({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.user.getUserId, [])
        },

        *findUserInfo({ payload }, { call, put }) {
            // try {
            //     const data = yield call(baseService, api.user.userInfo, payload);
            //     console.log(data);
            // } catch (error) {
            //     console.log(error)
            // }
            const data = yield call(baseService, api.user.userInfo, payload);
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
    },
};
