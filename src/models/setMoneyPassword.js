import baseService from '../services/baseService';
import {message } from 'antd';
import api from '../utils/api';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'setMoneyPassword',

    state: {
        loading:false,
    },

    subscriptions: {
    },

    effects: {
        *bankBindingMessageSent({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true
                }
            })
            const { data } = yield call(baseService, api.setMoneyPassword.bankBindingMessageSent, [payload.params]);
            if(data === null){
                message.success("发送成功！")
            }
            yield put({
                type: 'save',
                payload:{
                    loading:false
                }
            })
        },
        *setAccountPassword({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true
                }
            })
            const { data } = yield call(baseService, api.setMoneyPassword.setAccountPassword, [...payload.params]);
            if(!!data && data.result == 1){  //改过
                message.success(data.message)
                yield  put(routerRedux.push("/userCenter"))
            }
            yield put({
                type: 'save',
                payload:{
                    loading:false
                }
            })
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
};
