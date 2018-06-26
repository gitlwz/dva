import baseService from '../services/baseService';
import {message } from 'antd';
import api from '../utils/api';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'submitMessage',

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
            const { data } = yield call(baseService, api.submitMessage.authentication, [payload.params]);
            if (data !== undefined) {    //成功
                message.success("提交成功！")
                setTimeout(()=>{
                    routerRedux.push("/asset?type=2")
                },1000)
            }else{  //不知名失败
                message.error("提交失败！")
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
