import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';
import { message } from 'antd';
export default {

    namespace: 'asset',

    state: {

        topError: {
            show: false,
            content: ""
        },
        currentSelect: "资产总览",

        //资产总览字段
        currency: null, //全部
        dataSource: [], //资产

        //安全中心
        userInfo: {},    //用户信息

        //提现管理
        QBotherAddress: {}, //其他充币地址
        TXotherAddress: [], //其他提现地址
        currentCollapse: null, //当前打开的折叠面板
    },

    effects: {
        *currencyChange({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.asset.queryOperTradingAccount, [payload.currency]);
            if (data != undefined) {
                yield put({
                    type: 'save',
                    payload: {
                        dataSource: data
                    }
                })
            }

        },
        *findTraderFundAddress({ payload }, { call, put }) {
            const [QBotherAddress, TXotherAddress] = yield [
                call(baseService, api.asset.findTraderFundAddress, ["1", null]),
                call(baseService, api.asset.findTraderFundAddress, ["2", null])
            ]
            yield put({
                type: 'save',
                payload: {
                    QBotherAddress: QBotherAddress.data || {},
                    TXotherAddress: TXotherAddress.data || {}
                }
            })
        },
        *queryClientApply({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.asset.queryClientApply, []);
            let _data = data || {};
            let topError = { show: false };
            if (_data.applyStatus <= 1) {
                topError = {
                    show: true,
                    content: "请先完成邮箱验证"
                }
            }
            console.log("*******", _data.applyStatus)
            if (_data.applyStatus == 2) {
                topError = {
                    show: true,
                    content: "请先完成身份验证"
                }
            }
            yield put({
                type: 'save',
                payload: {
                    userInfo: _data,
                    topError
                }
            })
        },
        *mailboxVerification({ payload }, { call, put }) {
            const { data } = yield call(baseService, api.asset.mailboxVerification, []);
            if (!!data && data == true) {
                message.success('邮件已发送！请及时去邮箱处理！');
            }
        }
    },

    reducers: {
        selectMenu(state, action) {
            return { ...state, ...action.payload };
        },
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },

    subscriptions: {

    },
};