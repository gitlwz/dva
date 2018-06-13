import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';

export default {

    namespace: 'news',

    state: {
        pageSize: 10,
        pageNum: 1,
        dataList: [],
        newDetail: {}
    },

    effects: {
        *queryNewsList({ payload }, { call, put }) {
            try {

            } catch (error) {

            }
            const { data } = yield call(baseService, api.operationsManagement.news, payload);
            yield put({
                type: 'save',
                payload: {
                    dataList: data
                }
            })
        },

        *findNewDetail({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.operationsManagement.newsDetail, payload);
            yield put({
                type: 'save',
                payload: {
                    newDetail: data
                }
            })
        }
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
