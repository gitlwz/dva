import baseService from '../services/baseService';
import {message } from 'antd';
import api from '../utils/api';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'smSverification',

    state: {
        loading:false
    },

    subscriptions: {
    },

    effects: {
        
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
};
