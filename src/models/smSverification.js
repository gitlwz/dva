import baseService from '../services/baseService';
import {message } from 'antd';
import api from '../utils/api';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'smSverification',

    state: {
        loading:false,
        phoneError:{
            show:false,
            text:""
        },
        noteError:{
            show:false,
            text:""
        }
    },

    subscriptions: {
    },

    effects: {
        *registrerMessageSent({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true
                }
            })
            const { data } = yield call(baseService, api.smSverification.registrerMessageSent, [payload.params]);
            if (data !== undefined) {    //成功
                message.success("发送成功！")
            }else{  //不知名失败
                message.error("发送失败！")
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
            const { data } = yield call(baseService, api.smSverification.bankBindingMessageSent, [payload.params]);
            if (data !== undefined) {    //成功
                message.success("发送成功！")
            }else{  //不知名失败
                message.error("发送失败！")
            }
            yield put({
                type: 'save',
                payload:{
                    loading:false
                }
            })
        },
        *messageCheck({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true,
                    noteError: {
                        show: false,
                    },
                    phoneError: {
                        show: false,
                    }
                }
            })
            const { data } = yield call(baseService, api.smSverification.messageCheck, [...payload]);
            if (data !== undefined) {    //成功
                message.success("开启成功")
                setTimeout(()=>{
                    routerRedux.push("/asset")
                },1000)
            }else{  //不知名失败
                message.error("开启失败")
            }
            yield put({
                type: 'save',
                payload:{
                    loading:false
                }
            })
        },
        *resetGooleOrMessageCheck({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true,
                    noteError: {
                        show: false,
                    },
                    phoneError: {
                        show: false,
                    }
                }
            })
            const { data } = yield call(baseService, api.smSverification.resetGooleOrMessageCheck, [...payload]);
            if (data !== undefined) {    //成功
                message.success("开启成功")
                setTimeout(()=>{
                    routerRedux.push("/asset")
                },1000)
            }else{  //不知名失败
                message.error("开启失败")
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
