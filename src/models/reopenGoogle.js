import baseService from '../services/baseService';
import {message } from 'antd';
import api from '../utils/api';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'reopenGoogle',

    state: {
        loading:false,
        gooleCheck:{},
        error:{
            show:false,
            text:""
        }
    },

    subscriptions: {
    },

    effects: {
        
        *gooleCheckBegin({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true
                }
            })
            const { data } = yield call(baseService, api.reopenGoogle.gooleCheckBegin, [...payload.params]);
            if (data != undefined) {    //成功
                yield put({
                    type: 'save',
                    payload:{
                        gooleCheck:data||{},
                        loading:false
                    }
                })
            }else{  //不知名失败
                message.error("获取秘钥失败！")
                yield put({
                    type: 'save',
                    payload:{
                        gooleCheck:data||{},
                        loading:false
                    }
                })
            }
            
        },
        *gooleCheckOver({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload:{
                    loading:true
                }
            })
            const { data } = yield call(baseService, api.reopenGoogle.gooleCheckOver, [...payload.params]);
            if (data != undefined) {
                if(data.result === -1){//验证失败
                    message.error(data.message)
                    yield put({
                        type: 'save',
                        payload:{
                            loading:false,
                            error:{
                                show:true,
                                text:data.message
                            }
                        }
                    })
                }else if(data.result == 0){ //成功
                    yield put({
                        type: 'save',
                        payload:{
                            loading:false,
                        }
                    })
                    message.success("验证成功")
                    setTimeout(()=>{
                        console.log("&&&&&&&&&&&&")
                        routerRedux.push("/asset?type=2")
                    },1000)
                }
            }else{                      //不知名失败
                yield put({
                    type: 'save',
                    payload:{
                        loading:false,
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
