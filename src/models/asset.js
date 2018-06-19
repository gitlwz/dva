import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';
export default {

    namespace: 'asset',

    state: {

        topError:false,
        currentSelect:"资产总览",

        //资产总览字段
        currency:null, //全部
        dataSource:[], //资产

        //安全中心
        userInfo:{},    //用户信息

        //提现管理
        QBotherAddress:{}, //其他充币地址
        TXotherAddress:[], //其他提现地址
        currentCollapse:null, //当前打开的折叠面板
    },

    effects: {
        *currencyChange({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.asset.queryOperTradingAccount, [payload.currency]);
            
            yield put({
                type: 'save',
                payload: {
                    dataSource: data
                }
            })
        },
        *findTraderFundAddress({ payload }, { call, put }){
            const [QBotherAddress, TXotherAddress] = yield [
                call(baseService, api.asset.findTraderFundAddress, ["1",null]),
                call(baseService, api.asset.findTraderFundAddress, ["2",null])
              ]
            yield put({
                type: 'save',
                payload: {
                    QBotherAddress:QBotherAddress.data || {},
                    TXotherAddress:TXotherAddress.data || {}
                }
            })
        },
        *queryClientApply({ payload }, { call, put }){
            const { data } = yield call(baseService, api.asset.queryClientApply, []);
            console.log("*%%%%%%%55",data)
            yield put({
                type: 'save',
                payload: {
                    userInfo:data||{}
                }
            })
        }
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