import baseService from '../services/baseService';
import {message } from 'antd';
import api from '../utils/api';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'bindingAddress',

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
            const { data } = yield call(baseService, api.bindingAddress.bankBindingMessageSent, [payload.params]);
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
        *addTraderFundAddress({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true
                }
            })
            const { data } = yield call(baseService, api.bindingAddress.addTraderFundAddress, [...payload.params]);
            if(!!data && !!data.id){
                message.success("绑定成功！")
                yield  put(routerRedux.push("/asset"))
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
