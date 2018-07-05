import api from '../../utils/api';
import baseService from '../../services/baseService';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
export default {
    namespace: 'orderManager',
    state: {
        loading:false,
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
