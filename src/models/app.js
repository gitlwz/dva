import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import language from '../language/language'

//全局模块信息
export default {
    namespace: 'app',
    state: {
        theme: 'dark', //当前主题颜色
        visible: false,
        currtLanguage: 'China',
        language: language,
        userInfo: {}
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