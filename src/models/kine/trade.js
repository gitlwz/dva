import { routerRedux } from 'dva/router';
import baseService from '../../services/baseService';
import language from '../../language/language'

//下单模块
export default {
    namespace: 'trade',
    state: {
        tradeType: '', //交易类型
        buyPrice: 20,
        buyVolume: 60.65,
        sellPrice: 10,
        sellVolume: 20.3
    },

    effects: {
        // *queryLogonList({ payload }, { call, put }) {
        //     const { data } = yield call(baseService, api.system.logon, payload);
        //     yield put({
        //         type: 'save',
        //         payload: {
        //             dataList: data
        //         }
        //     })
        // },

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