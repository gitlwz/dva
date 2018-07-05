import api from '../../utils/api';
import baseService from '../../services/baseService';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
export default {
    namespace: 'orderManager',
    state: {
        loading:false,
        currency:[],

        current:0,
        total:0,
        pageSize:10,
        dataSource:[],
    },

    subscriptions: {

    },

    effects: {
        *findAllCurrencys({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            let { data } = yield call(baseService, api.orderManager.findAllCurrencys, []);
            if (data !== undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        currency:data,
                        loading: false,
                    }
                })
            }
        },
        *findMyBiddingPosters({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true,
                    pageSize:payload[5].pageSize,
                    current:payload[5].pageNo,
                }
            })
            let {errorCode, data } = yield call(baseService, api.orderManager.findMyBiddingPosters, [...payload]);
            if (data !== undefined) {
                if(errorCode == 0){
                    yield put({
                        type: 'save',
                        payload: {
                            total:data.totalRecord,
                            dataSource:data.content
                        }
                    })
                }
                yield put({
                    type: 'save',
                    payload: {
                        loading: false,
                    }
                })
            }
        },
        *cancelBiddingPosters({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            let {errorCode, data } = yield call(baseService, api.orderManager.cancelBiddingPosters, [...payload.params]);
            if (data !== undefined) {
                if(errorCode == 0){
                    message.success("取消挂单成功！");
                    payload.callBack();
                }
                yield put({
                    type: 'save',
                    payload: {
                        loading: false,
                    }
                })
            }
        },
        *findOrderFormForWeb({ payload }, { call, put }) {
            console.log("^^^^^^^^^^^^^^^^^^^^",payload)
            yield put({
                type: 'save',
                payload: {
                    loading: true,
                    pageSize:payload[6].pageSize,
                    current:payload[6].pageNo,
                }
            })
            let {errorCode, data } = yield call(baseService, api.orderManager.findOrderFormForWeb, [...payload]);
            if (data !== undefined) {
                if(errorCode == 0){
                    yield put({
                        type: 'save',
                        payload: {
                            total:data.totalRecord,
                            dataSource:data.content
                        }
                    })
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
