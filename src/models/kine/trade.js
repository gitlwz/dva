import { routerRedux } from 'dva/router';
import baseService from '../../services/baseService';
import language from '../../language/language'

//下单模块
export default {
    namespace: 'trade',
    state: {
        tradeType: '', //交易类型
        buyData: {
            price: 20,
            volume: 60
        },
        sellData: {
            price: 10,
            volume: 20
        }
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