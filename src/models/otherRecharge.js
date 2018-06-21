import baseService from '../services/baseService';
import api from '../utils/api';
export default {

    namespace: 'otherRecharge',

    state: {
        AddressValue:""
    },

    subscriptions: {

    },

    effects: {
        *findFundAddress({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.otherRecharge.findFundAddress, [...payload.params]);
            if (data != undefined) {
                console.log("^^^^^^^^6",data)
            }
        },
    },

    reducers: {
        save(state, action) {
            return { ...state };
        }
    },


};
