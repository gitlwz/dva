import baseService from '../services/baseService';
import {message } from 'antd';
import api from '../utils/api';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'submitMessageCompany',

    state: {
        loading:false
    },

    subscriptions: {
    
    },

    effects: {
        *authentication({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true
                }
            })
            const { data } = yield call(baseService, api.submitMessageCompany.authentication, [payload.params]);
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
        
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
};
