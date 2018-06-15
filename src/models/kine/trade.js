import baseService from '../../services/baseService';
import { message } from 'antd';
import kineApi from '../../utils/kineApi';

//下单模块
export default {
    namespace: 'trade',
    state: {
        tradeType: '', //交易类型
        buyPrice: 20,
        buyVolume: 60.65,
        sellPrice: 10,
        sellVolume: 20.3,
        instrumentIdData: {} //合约详情
    },

    effects: {
        //下单
        *orderInsert({ payload }, { call, put }) {
            const data = yield call(baseService, kineApi.trade.orderInsert, [payload.orderData]);
            payload.callback(data)
        },

    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },


    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/kine') {

                }
            });
        },
    },
};