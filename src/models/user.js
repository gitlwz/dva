import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';
import { message } from 'antd';
export default {

    namespace: 'user',

    state: {
        userInfo: {},
        countryList: [],
        isLogin: false,
        userId: ''
    },

    effects: {
        //登录
        *login({ payload }, { call, put }) {
            const data = yield call(baseService, api.user.logon, payload.body);
            if (data != undefined)
                payload.callback(data)
        },

        //注册
        *regis({ payload }, { call, put }) {
            const data = yield call(baseService, api.user.regis, payload.body);
            if (data != undefined)
                payload.callback(data)
        },
        //登出
        *logout({ payload }, { call, put }) {
            const data = yield call(baseService, api.user.logout, []);
            console.log(data)
            if (data != undefined) {
                if (data.errorCode == "0") {
                    yield put({
                        type: 'getUserId'
                    })
                    routerRedux.push("/")
                } else {
                    console.log("network err!")
                }
            }

        },
        //获取当前登录人
        *getUserId({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.user.getUserId, []);
            console.log(data)
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        userId: data
                    }
                })
            }
        },
        //获取当前登陆人信息
        *findUserInfo({ payload }, { call, put }) {
            const data = yield call(baseService, api.user.userInfo, payload);
        },
        //获取国家列表
        *queryCountryList({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.user.getCountry, []);
            if (data != undefined)
                yield put({
                    type: 'save',
                    payload: {
                        countryList: data
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
