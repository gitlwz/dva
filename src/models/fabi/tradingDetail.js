import api from '../../utils/api';
import baseService from '../../services/baseService';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'tradingDetail',

    state: {
        loading:false,
        dataInfo:{}
    },

    subscriptions: {

    },

    effects: {
        *acknowledgeReceipt({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            let { data } = yield call(baseService, api.tradingDetail.acknowledgeReceipt, [payload.params]);
            if (data !== undefined) {
                payload.callback(data);
                yield put({
                    type: 'save',
                    payload: {
                        loading: false,
                        dataInfo:data
                    }
                })
            }
        },
        *buyerPayment({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            let {errorCode, data } = yield call(baseService, api.tradingDetail.buyerPayment, [...payload.params]);
            if (data !== undefined) {
                if(errorCode == 0){
                    payload.callback();
                    if(payload.params[1] == '1'){
                        message.success("取消订单成功!")
                    }else if(payload.params[1] == '0'){
                        message.success("付款成功!")
                    }
                }
                yield put({
                    type: 'save',
                    payload: {
                        loading: false,
                    }
                })
            }
        },
        *collection({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            let {errorCode, data } = yield call(baseService, api.tradingDetail.collection, [...payload.params]);
            if (data !== undefined) {
                if(errorCode == 0){
                    message.success("收款成功!");
                    payload.callback();
                }
                yield put({
                    type: 'save',
                    payload: {
                        loading: false,
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
