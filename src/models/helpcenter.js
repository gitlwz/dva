import api from '../utils/api';
import baseService from '../services/baseService';
export default {

    namespace: 'helpcenter',

    state: {
        findAll:[],
        findAllSearch:[],
        detail:{}
    },

    subscriptions: {

    },

    effects: {
        *findAllPushHelpCenterByCondition({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.helpcenter.findAllPushHelpCenterByCondition, [payload.params]);
            if(!payload.params){
                if(!!data){
                    yield put({
                        type: 'save',
                        payload: {
                            findAll: data
                        }
                    })
                }
            }else{
                if(!!data){
                    yield put({
                        type: 'save',
                        payload: {
                            findAllSearch: data
                        }
                    })
                }
            }
            
        },
        *getHelpCenterById({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.helpcenter.getHelpCenterById, [payload.id]);
            console.log("*******",data)
            if(!!data){
                yield put({
                    type: 'save',
                    payload: {
                        detail: data
                    }
                })
            }
        }
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload};
        }
    },


};
