import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';
import { message } from 'antd';
export default {

    namespace: 'user',

    state: {
        userInfo: {
            clientID: null
        },//用户信息
        countryList: [],
        isLogin: false,
        userId: null
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
            if (data != undefined) {
                if (data.errorCode == 0) {
                    yield put({
                        type: 'getUserId'
                    });
                    yield put({
                        type: "save",
                        payload: {
                            userInfo: {}
                        }
                    })
                    yield put(routerRedux.push("/home"))
                } else {
                    console.log("network err!")
                }
            }
        },
        //获取当前登录人
        *getUserId({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.user.getUserId, []);
            yield put({
                type: 'save',
                payload: {
                    userId: data
                }
            })
            if (data != null) {
                yield put({
                    type: 'findUserInfo'
                })
            }


        },
        //获取当前登陆人信息
        *findUserInfo({ payload }, { call, put }) {
            const data = yield call(baseService, api.user.userInfo, []);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        userInfo: data.data
                    }
                })
            }
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
        //获取邮箱验证码
        *getVerification({ payload }, { call, put }) {
            const data = yield call(baseService, api.user.getVerification, payload.email);
            payload.callback(data)
        },
        //修改密码
        *resetPassword({ payload }, { call, put }) {
            const data = yield call(baseService, api.user.resetPassword, payload.body);
            payload.callback(data)
        },
        // 修改账户信息
        *bindingToModify({ payload }, { call, put }) {
            const data = yield call(baseService, api.user.bindingToModify, payload.body);
            payload.callback(data)
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
