import api from '../../utils/api';
import baseService from '../../services/baseService';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'tradingDetail',

    state: {
        loading:false,
        dataInfo:{}
    },

    subscriptions: {

    },

    effects: {
        *acknowledgeReceipt({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            let { data } = yield call(baseService, api.tradingDetail.acknowledgeReceipt, [payload]);
            if (data !== undefined) {
                console.log("dataInfo======",data)
                yield put({
                    type: 'save',
                    payload: {
                        loading: false,
                        dataInfo:data
                    }
                })
            }

        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },


};
