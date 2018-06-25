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
            if(!data){
                yield put({
                    type: 'save',
                    payload:{
                        loading:false,
                        currencyAndAddress: [{
                            "id": 357,
                            "traderAccount": null,
                            "traderId": null,
                            "subAccountId": "0000000055",
                            "traderName": null,
                            "currency": "BTC",
                            "addressType": "2",
                            "address": "19ZZrhZvSMMDDK7yuxo5gzkmvU645TMSTU",
                            "addressRemark": "火币钱包",
                            "createTime": null,
                            "updateTime": null,
                            "createTimeStr": null,
                            "updateTimeStr": null,
                            "available": 0.00746932139445375,
                            "extractable": 0.007450000000000000,
                            "withdrawFeeRate": 0.002000000000000000,
                            "withdrawalUnit": "0.00001",
                            "withdrawalAmount": "0.001",
                            "withdrawFeeAlgor": "1"
                        }] //data
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
