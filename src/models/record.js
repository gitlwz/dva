import baseService from '../services/baseService';
import api from '../utils/api';
export default {
    //记录查询
    namespace: 'record',

    state: {
        currentSelect: '充提币记录',
        rechargeData: {
            content: []
        },
        entrustData: {
            content: []
        }
    },

    subscriptions: {

    },

    effects: {
        *rechargeList({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.asset.rechargeList, payload);
            console.log(data)
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        rechargeData: data
                    }
                })
            }
        },
        *entrustList({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.asset.entrustList, payload);
            console.log(data)
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        entrustData: data
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
