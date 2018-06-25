import baseService from '../services/baseService';
import {message } from 'antd';
import api from '../utils/api';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'otherPresent',

    state: {
        loading:false,
        currencyAndAddress:[]
    },

    subscriptions: {
    },

    effects: {
        *withdraw({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true
                }
            })
            const { data } = yield call(baseService, api.otherPresent.withdraw, [...payload.params]);
            if(data === null){
                message.success("提现成功！")
            }
            yield put({
                type: 'save',
                payload:{
                    loading:false
                }
            })
        },
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
        *findByCurrencyAndAddressType({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true
                }
            })
            const { data } = yield call(baseService, api.otherPresent.findByCurrencyAndAddressType, [...payload.params]);
            if(!!data){
                yield put({
                    type: 'save',
                    payload:{
                        loading:false,
                        currencyAndAddress: data
                    }
                })
            }else{
                yield put({
                    type: 'save',
                    payload:{
                        loading:false
                    }
                })
            }
            
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
};
