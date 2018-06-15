import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';
export default {

    namespace: 'asset',

    state: {
        currentSelect:"资产总览",

        //资产总览字段
        currency:null, //全部
        dataSource:[], //资产
    },

    effects: {
        *currencyChange({ payload }, { call, put }) {
            console.log("!!!!!!!")
            const { data } = yield call(baseService, api.asset.queryOperTradingAccount, [payload.currency]);
            console.log("888",data)
            yield put({
                type: 'save',
                payload: {
                    dataSource: data
                }
            })
        },
    },

    reducers: {
        selectMenu(state, action) {
            return { ...state, ...action.payload };
        },
        save(state, action){
            return { ...state, ...action.payload };
        }
    },

    subscriptions: {
        
    },
};