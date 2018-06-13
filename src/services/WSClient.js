"use strict";

import webSocketConfig from './webSocketConfig';

var WSClient = {
    ws: null,
    is_connected() {
        if (this.ws != null && this.ws.connected == true) {
            return true;
        }
        return false;
    },

    //添加百档行情订阅
    addEventListenerMarket(topic) {
        this.Market = topic;
        if (this.ws && this.is_connected() == true) {
            this.ws.subscribe(topic);
        } else {
            this.ws_onMsgConnect();
        }
    },


    //行情订阅
    addEventListenerInstrument(topic) {
        this.Instument = topic;
        if (this.ws && this.is_connected() == true) {
            this.ws.subscribe(topic);
        } else {
            this.ws_onMsgConnect();
        }
    },

    //成交明细订阅
    addEventListenerTradeDetail(topic) {
        this.tradDetail = topic;
        if (this.ws && this.is_connected() == true) {
            this.ws.subscribe(topic);
        } else {
            this.ws_onMsgConnect();
        }
    },

    //连接成功后的订阅事件
    ws_Connect() {
        //添加多个订阅
        if (this.Market) {
            this.ws.subscribe(this.Market);
        }
        if (this.Instument) {
            this.ws.subscribe(this.Instument)
        }
        if (this.tradDetail) {
            this.ws.subscribe(this.tradDetail);
        }

    },

    ws_onMsgConnect() {
        if (this.ws != null) {
            this.ws_msgReconnect()
        } else {
            this.ws = webSocketConfig;
            this.ws.connect();
            this.ws.setOnConnect(this.ws_Connect.bind(this))
        }
    },

    //重连
    ws_msgReconnect() {
        if (this.ws) {

        } else {
            console.log("正在重连!");
            setTimeout(() => {
                this.ws_onMsgConnect();
            }, 5000);
        }
    }

}

export default WSClient;