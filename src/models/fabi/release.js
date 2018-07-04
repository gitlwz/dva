import { routerRedux } from 'dva/router';
import baseService from '../../services/baseService';
import api from '../../utils/api';

//全局模块信息
export default {

    namespace: 'release',
    state: {
        subBankAccountInfo: {},
        dataDetail: {}, //用户昵称和资金密码集合
        currencyList: [], //所有币种
        releaseData: {}
    },

    effects: {
        //发布挂单
        *saveBiddingPosters({ payload }, { call, put }) {
            const data = yield call(baseService, api.release.saveBiddingPosters, payload.body);
            if (data != undefined) {
                payload.callback(data)
            }
        },

        //查询有没有绑定银行卡
        *findBySubBankAccount({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.release.findBySubBankAccount, []);
            console.log(data)
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        subBankAccountInfo: data
                    }
                })
            }
        },

        //查询可以挂单的币种
        *findByBiddingPosters({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.release.findByBiddingPosters, []);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        dataDetail: data,
                        currencyList: data.currencyList
                    }
                })
            }
        },

        //查询挂单详情
        *findBiddingPostersByPostersID({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.release.findBiddingPostersByPostersID, payload.postersID);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        releaseData: data
                    }
                })
            }
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {

        },
    },
};
