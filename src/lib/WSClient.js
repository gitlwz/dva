"use strict";

import WebsocketClient from './WebsocketClient';

import Config from '../config';
import subscribeSet from '../services/subscribeSet';
// import subscribeSet from '../subscribeSet';
// import AESFunc from '../utils/AESFunc';
import md5 from 'md5';

var events = require('events');

const Topic_instrument = "public_instrument_"; //行情
const Topic_tradeReturn = "public_tradereturn_"; //成交回报
const Topic_orderReturn = "public_orderreturn_"; //委托回报
const Topic_tradeDetail = "public_tradedetail_"; //合约成交（合约的全部成交）
const Topic_change_mblmarketdata = "public_change_mblmarketdata_"; //百档行情
const Topic_part_account = "public_part_account_"; //资金订阅

const Topic_day_kline = "public_day_kline_"; //最高最低交易量的订阅


var WSClient = {
    ws: null,
    emitter: new events.EventEmitter(),
    isReconnect: false,
    userInfo: null,
    totalTopics: [],
    tradeInstrumentTopic: null,
    listDayKLineTopic: [],
    mblMarketTopic: null,
    reconnectCount: 0,
    //是否订阅成交回报
    hasSubscribeTradeReturn: false,
    //是否订阅委托回报
    hasSubscribeOrderReturn: false,
    //是否订阅资金回报
    hasSubscribeCapitalReturn: false,

    getEmitter() {
        return this.emitter;
    },

    /**
     * ws收到推送消息
     * @param topic
     * @param receiveData
     */
    ws_msgReceive(topic, receiveData) {
        if (receiveData && topic) {
            if (topic.match(Topic_instrument)) {
                //行情推送
                this.emitter.emit(subscribeSet.OPTIONAL_RECEIVE, receiveData);
            } else if (topic.match(Topic_tradeReturn)) {
                //成交回报
                this.emitter.emit(subscribeSet.TRADE_RETURN_RECEIVE, receiveData);
                // console.log("成交回报："+JSON.stringify(receiveData));
            } else if (topic.match(Topic_orderReturn)) {
                //委托回报
                this.emitter.emit(subscribeSet.ORDER_RETURN_RECEIVE, receiveData);
                // console.log("委托回报："+JSON.stringify(receiveData));
            } else if (topic.match(Topic_tradeDetail)) {
                this.emitter.emit(subscribeSet.INSTRUMENT_TRADE_RETURN_RECEIVE, receiveData);
            } else if (topic.match(Topic_change_mblmarketdata)) {
                this.emitter.emit(subscribeSet.INSTRUMENT_MBL_MARKET, receiveData);
            } else if (topic.match(Topic_part_account)) {
                this.emitter.emit(subscribeSet.CAPITAL_RETURN_RECEIVER, receiveData);
            } else if (topic.match(Topic_day_kline)) {
                this.emitter.emit(subscribeSet.DAY_KLINE_DATA_RETURN, receiveData);
                // console.log(JSON.stringify(receiveData));
            } else if (topic.match(subscribeSet.WX_MESSAGE)) {
                //消息
                let userInfo = window.localStorage.getItem(subscribeSet.WX_USER_INFO);
                if (userInfo) {
                    // userInfo = JSON.parse(AESFunc.decrypt(userInfo));
                    if (userInfo.messageSwitch == "1") {
                     //   showMessagePopUps(receiveData, null);
                    }
                }
            }
        }
    },

    /**
     * ws是否连接
     * @returns {boolean}
     */
    ws_stateOnConnect() {
        let isConnect = false;
        if (this.ws !== null && this.ws.isConnected()) {
            isConnect = true;
        }
        return isConnect;
    },

    ws_Connect() {
        //注册消息接收方法
        this.ws.register(this.ws_msgReceive.bind(this));
        this.reconnectCount = 0;
        if (this.totalTopics.length > 0) {
            let instrumentIds = '';
            for (let i = 0; i < this.totalTopics.length; i++) {
                instrumentIds = instrumentIds + Topic_instrument + this.totalTopics[i].instrumentId + ","
            }
            this.ws.subscribe(instrumentIds);
        }

        if (this.tradeInstrumentTopic) {
            this.ws.subscribe(Topic_tradeDetail + this.tradeInstrumentTopic);
        }

        if (this.mblMarketTopic) {
            this.ws.subscribe(Topic_change_mblmarketdata + this.mblMarketTopic);
        }

        if (this.listDayKLineTopic && this.listDayKLineTopic.length > 0) {
            let instruentIds = '';
            for (let i = 0; i < this.listDayKLineTopic.length; i++) {
                instruentIds = instruentIds + Topic_day_kline + this.listDayKLineTopic[i] + ',';
            }
            this.ws.subscribe(instruentIds);
        }

        if (this.userInfo) {
            this.ws.subscribe(Topic_orderReturn + this.userInfo.userId);
            this.hasSubscribeOrderReturn = true;

            this.ws.subscribe(Topic_tradeReturn + this.userInfo.userId);
            this.hasSubscribeTradeReturn = true;

            this.ws.subscribe(Topic_part_account + this.userInfo.userId);
            this.hasSubscribeCapitalReturn = true;

            this.addMessageSubscribe();
        }

        if (this.isReconnect) {
            //重连
        }
    },

    /**
     * ws开始建立连接
     */
    ws_onMsgConnect() {
        console.log("ws开始建立连接s")
        if (this.ws !== null) {
            this.ws_msgReconnect();
        } else {
            this.ws = new WebsocketClient();
            this.ws.setOnclose(this.ws_msgReconnect.bind(this));
            this.ws.setOnError(this.ws_msgReconnect.bind(this));
            this.ws.setOnConnect(this.ws_Connect.bind(this));
            this.ws.connect('public');
        }
    },


    /**
     * 添加消息的订阅
     * @param registerName
     */
    addMessageSubscribe(userInfo) {
        if (userInfo) {
            this.userInfo = userInfo;
        }
        if (this.userInfo) {
            if (this.ws && this.ws.isConnected()) {
                this.ws.subscribe(subscribeSet.WX_MESSAGE);
                if (this.userInfo) {
                    let registeredName = this.userInfo.registeredName;
                    let nameHashCode = md5(registeredName);
                    let topic = subscribeSet.WX_MESSAGE + '_' + nameHashCode;
                    this.ws.subscribe(topic);
                }
            } else {
                this.ws_onMsgConnect();
            }
        }
    },

    /**
     * 添加行情订阅
     */
    addOptionalsSubscribe(topics) {
        if (this.ws && this.ws.isConnected()) {
            if (topics.length > 0) {
                let instrumentIds = '';
                for (let i = 0; i < topics.length; i++) {
                    let position = -1;
                    for (let j = 0; j < this.totalTopics.length; j++) {
                        if (topics[i].instrumentId === this.totalTopics[j].instrumentId) {
                            position = j;
                            break;
                        }
                    }
                    if (position == -1) {
                        topics[i].subscribeNumber = !topics[i].subscribeNumber ? 1 : topics[i].subscribeNumber + 1;
                        this.totalTopics.push(topics[i]);
                        instrumentIds = instrumentIds + Topic_instrument + topics[i].instrumentId + ","
                    } else {
                        if (this.totalTopics[position].subscribeNumber == 0) {
                            instrumentIds = instrumentIds + Topic_instrument + this.totalTopics[position].instrumentId + ","
                        }
                        this.totalTopics[position].subscribeNumber = this.totalTopics[position].subscribeNumber === undefined ? 1 : this.totalTopics[position].subscribeNumber + 1;
                    }
                }
                if (instrumentIds !== '') {
                    this.ws.subscribe(instrumentIds);
                }
            }
        } else {
            for (let i = 0; i < topics.length; i++) {
                let position = -1;
                for (let j = 0; j < this.totalTopics.length; j++) {
                    if (topics[i].instrumentId === this.totalTopics[j].instrumentId) {
                        position = j;
                        break;
                    }
                }
                if (position == -1) {
                    topics[i].subscribeNumber = topics[i].subscribeNumber === undefined ? 1 : topics[i].subscribeNumber + 1;
                    this.totalTopics.push(topics[i]);
                } else {
                    this.totalTopics[position].subscribeNumber = this.totalTopics[position].subscribeNumber === undefined ? 1 : this.totalTopics[position].subscribeNumber + 1;
                }
            }
            this.ws_onMsgConnect();
        }
    },

    /**
     * 删除行情订阅
     */
    deleteOptionalsSubscribe(topics) {
        if (this.ws && this.ws.isConnected()) {
            if (topics.length > 0) {
                let instrumentIds = '';
                let newTotalTopics = [];

                for (let j = 0; j < this.totalTopics.length; j++) {
                    for (let i = 0; i < topics.length; i++) {
                        if (topics[i].instrumentId == this.totalTopics[j].instrumentId) {
                            if (this.totalTopics[j].subscribeNumber == 1) {
                                instrumentIds = instrumentIds + Topic_instrument + topics[i].instrumentId + ",";
                            }
                            this.totalTopics[j].subscribeNumber = this.totalTopics[j].subscribeNumber === 0 ? 0 : this.totalTopics[j].subscribeNumber - 1;
                            break;
                        }
                    }
                    if (this.totalTopics[j].subscribeNumber > 0) {
                        newTotalTopics.push(this.totalTopics[j]);
                    }
                }
                this.totalTopics = newTotalTopics;
                if (instrumentIds !== '') {
                    this.ws.unsubscribe(instrumentIds);
                }
            }
        }
    },

    /**
     * 添加合约成交订阅
     * @param instrumentId
     */
    addInstrumentTradeSubscribe(instrumentId) {
        if (instrumentId) {
            this.tradeInstrumentTopic = instrumentId;
            if (this.ws && this.ws.isConnected()) {
                this.ws.subscribe(Topic_tradeDetail + instrumentId);
            } else {
                this.ws_onMsgConnect();
            }
        }
    },

    /**
     * 取消合约成交订阅
     * @param instrumentId
     */
    deleteInstrumentTradeSubscribe(instrumentId) {
        if (instrumentId) {
            if (this.ws && this.ws.isConnected()) {
                this.ws.unsubscribe(Topic_tradeDetail + instrumentId);
            }
        }
    },


    /**
     * 添加合约全天行情订阅
     * @param instrumentId
     */
    addListDayKLineSubscribe(instrumentIDs) {
        if (!this.listDayKLineTopic) {
            this.listDayKLineTopic = [];
        }
        if (instrumentIDs && instrumentIDs.length > 0) {
            let newTopicString = "";
            for (let i = 0; i < instrumentIDs.length; i++) {
                let instrumentId = instrumentIDs[i].instrumentId;

                if (this.listDayKLineTopic.indexOf(instrumentId) > -1) {
                    //已存在不作处理
                } else {
                    this.listDayKLineTopic.push(instrumentId);
                    newTopicString = newTopicString + Topic_day_kline + instrumentId + ",";
                }
                if (this.ws && this.ws.isConnected()) {
                    this.ws.subscribe(Topic_day_kline + instrumentId);
                }
            }
        }
        if (this.ws && this.ws.isConnected()) {

        }
        else {
            this.ws_onMsgConnect();
        }
    },

    /**
     * 取消全天行情订阅
     * @param instrumentId
     */
    deleteListDayKLineSubscribe(instrumentIDs) {
        if (instrumentIDs && instrumentIDs.length > 0) {
            if (this.ws && this.ws.isConnected()) {
                let unsubscribeString = "";
                for (let i = 0; i < instrumentIDs.length; i++) {
                    let instrumentId = instrumentIDs[i].instrumentId;
                    let index = this.listDayKLineTopic.indexOf(instrumentId);
                    if (index > -1) {
                        //存在，删除
                        this.listDayKLineTopic.splice(index, 1);
                    }
                    unsubscribeString = unsubscribeString + Topic_day_kline + instrumentId + ",";
                    this.ws.unsubscribe(Topic_day_kline + instrumentId);
                }
                if (unsubscribeString.length > 0) {
                    // this.ws.unsubscribe(unsubscribeString);
                }
            }
        }
    },

    /**
     * 100档行情订阅
     * @param instrumentId
     */
    addInstrumentMblMarket(instrumentId) {
        if (instrumentId) {
            this.mblMarketTopic = instrumentId;
            if (this.ws && this.ws.isConnected()) {
                this.ws.subscribe(Topic_change_mblmarketdata + instrumentId);
            } else {
                this.ws_onMsgConnect();
            }
        }
    },

    /**
     * 取消100档行情订阅
     * @param instrumentId
     */
    deleteInstrumentMblMarket(instrumentId) {
        if (instrumentId) {
            if (this.ws && this.ws.isConnected()) {
                this.ws.unsubscribe(Topic_change_mblmarketdata + instrumentId);
            }
        }
    },

    /**
     * 添加成交回报订阅
     * @param userInfo
     */
    addTradeReturnSubscribe(userInfo) {
        if (userInfo !== undefined && userInfo !== null) {
            this.userInfo = userInfo;
            if (this.hasSubscribeTradeReturn) {
                console.log('trade return has been subscribe!');
                return;
            }
            if (this.ws && this.ws.isConnected()) {
                this.ws.subscribe(Topic_tradeReturn + userInfo.userId);
                this.hasSubscribeTradeReturn = true;
            } else {
                this.ws_onMsgConnect();
            }
        }

    },

    /**
     * 添加委托回报订阅
     * @param userInfo
     * @private
     */
    addOrderReturnSubscribe(userInfo) {
        if (userInfo !== undefined && userInfo !== null) {
            this.userInfo = userInfo;
            if (this.hasSubscribeOrderReturn) {
                console.log('order return has been subscribe!');
                return;
            }
            if (this.ws && this.ws.isConnected()) {
                if (userInfo != null) {
                    this.ws.subscribe(Topic_orderReturn + userInfo.userId);
                }
                this.hasSubscribeOrderReturn = true;
            } else {
                this.ws_onMsgConnect();
            }
        }
    },

    /**
     * 添加资金订阅
     * @param userInfo
     */
    addCapitalSubscribe(userInfo) {
        if (userInfo !== undefined && userInfo !== null) {
            this.userInfo = userInfo;
            if (this.hasSubscribeCapitalReturn) {
                console.log('capital return has been subscribe!');
                return;
            }
            if (this.ws && this.ws.isConnected()) {
                if (userInfo != null) {
                    this.ws.subscribe(Topic_part_account + userInfo.userId);
                }
                this.hasSubscribeCapitalReturn = true;
            } else {
                this.ws_onMsgConnect();
            }
        }
    },

    /**
     * ws关闭
     */
    ws_onMsgClose() {
        if (this.ws && this.ws.isConnected()) {
            if (this.totalTopics.length > 0) {
                let instrumentIds = '';
                for (let i = 0; i < this.totalTopics.length; i++) {
                    instrumentIds = instrumentIds + Topic_instrument + this.totalTopics[i].instrumentId + ",";
                }
                this.ws.unsubscribe(instrumentIds);
            }

            if (this.tradeInstrumentTopic) {
                this.ws.unsubscribe(Topic_tradeDetail + this.tradeInstrumentTopic);
            }

            if (this.mblMarketTopic) {
                this.ws.unsubscribe(Topic_change_mblmarketdata + this.mblMarketTopic);
            }
            if (this.userInfo != null) {
                this.ws.unsubscribe(Topic_orderReturn + this.userInfo.userId);
                this.hasSubscribeOrderReturn = false;

                this.ws.unsubscribe(Topic_tradeReturn + this.userInfo.userId);
                this.hasSubscribeTradeReturn = false;

                this.ws.unsubscribe(Topic_part_account + this.userInfo.userId);
                this.hasSubscribeCapitalReturn = false;
            }

            this.ws.disconnect();
            this.ws = null;
        }
    },

    /**
     * ws重连
     */
    ws_msgReconnect() {
        if (this.ws) {
            this.ws_onMsgClose();
            this.ws = null;
        }
        //断开后隔5s进行重连
        if (this.reconnectCount < Config.wsMaxReconnectCount || Config.wsMaxReconnectCount === -1) {
            console.log("正在重连!!!!")
            setTimeout(() => {
                this.isReconnect = true;
                this.reconnectCount = this.reconnectCount + 1;
                this.ws_onMsgConnect();
            }, 5000);
        } else {

        }
    },
};

export default WSClient;