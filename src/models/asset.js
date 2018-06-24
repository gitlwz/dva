import { routerRedux } from 'dva/router';
import baseService from '../services/baseService';
import api from '../utils/api';
import { message } from 'antd';
import PubSub from "pubsub-js";
export default {

    namespace: 'asset',

    state: {
        loading: false,

        currentSelect: "资产总览",

        //资产总览字段
        currency: null, //全部
        dataSource: [], //资产

        //安全中心
        userInfo: {},    //用户信息
        findByUserID:{}, //用户资金密码

        //提现管理
        QBotherAddress: {}, //其他充币地址
        TXotherAddress: {}, //其他提现地址
        currentCollapse: null, //当前打开的折叠面板
    },

    effects: {
        *stopCheck({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            const { data } = yield call(baseService, api.asset.stopCheck, [...payload.params]);
            if(!!data && data.result == 1){
                if(payload.params[1] == 5){
                    message.success("短信验证关闭成功")
                }
                if(payload.params[1] == 4){
                    message.success("谷歌验证关闭成功")
                }
                yield put({
                    type: 'save',
                    payload: {
                        loading: false
                    }
                })
                setTimeout(()=>{
                    window.location.reload();
                },1000)
            }else{
                yield put({
                    type: 'save',
                    payload: {
                        loading: false
                    }
                })
            }
        },
        *findByUserID({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            const { data } = yield call(baseService, api.asset.findByUserID, []);
            if(!!data){
                yield put({
                    type: 'save',
                    payload: {
                        findByUserID:data,
                        loading: false
                    }
                })
            }else{
                yield put({
                    type: 'save',
                    payload: {
                        loading: false
                    }
                })
            }
        },
        *currencyChange({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            const { data } = yield call(baseService, api.asset.queryOperTradingAccount, [payload.currency]);
            if (data != undefined) { //成功
                yield put({
                    type: 'save',
                    payload: {
                        dataSource: data,
                        loading: false
                    }
                })
            } else { // 不知名错误
                yield put({
                    type: 'save',
                    payload: {
                        loading: false
                    }
                })
            }

        },
        *findTraderFundAddress({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            const [QBotherAddress, TXotherAddress] = yield [
                call(baseService, api.asset.findTraderFundAddress, ["1", null]),
                call(baseService, api.asset.findTraderFundAddress, ["2", null])
            ]
            yield put({
                type: 'save',
                payload: {
                    QBotherAddress: QBotherAddress.data || {},
                    TXotherAddress: TXotherAddress.data || {},
                    loading: false
                }
            })
        },
        *mailboxVerification({ payload }, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    loading: true
                }
            })
            const { data } = yield call(baseService, api.asset.mailboxVerification, []);
            if (!!data && data == true) { //成功
                message.success('邮件已发送！请及时去邮箱处理！');
                yield put({
                    type: 'save',
                    payload: {
                        loading: false
                    }
                })
            } else { //失败
                message.success('邮件发送失败！');
                yield put({
                    type: 'save',
                    payload: {
                        loading: false
                    }
                })
            }
        },
        *createAddress({ payload }, { call, put }) {
            try {
                const { data } = yield call(baseService, api.asset.createAddress, payload.params);
                yield put({
                    type: 'findTraderFundAddress'
                })
            } catch (err) {
                console.log(err)
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