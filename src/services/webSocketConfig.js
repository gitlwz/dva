'use strict';
import subscribeSet from './subscribeSet';
var events = require('events');
let wsUrl = "ws://192.168.100.179:8080/sundax/wsPublicMessage";
let webSocket = new WebSocket(wsUrl);

var webSocketConfig = {
    webSocket: null,
    touchTime: 30 * 10000,
    connected: false,
    onconnected: null,
    //setOnConnect: null,
    emitter: new events.EventEmitter(),
    connect() {
        // try {
        //     if ('WebSocket' in window) {
        //         this.websocket = new WebSocket(wsUrl);
        //     } else {
        //         console.error("您的浏览器不支持WebSocket,请更换最新版本浏览器");
        //         return false;
        //     }

        // } catch (error) {

        // }
        //this.webSocket = new WebSocket(wsUrl)
        webSocket.onopen = (event) => {
            this.connected = true;
            if (this.onconnected != null) {
                this.onconnected(event);
            }
            //this.setOnConnect(event);
        }

        webSocket.onerror = (event) => {
            this.connected = false;
        }

        webSocket.onclose = (event) => {
            this.connected = false;
        }

        webSocket.onmessage = (event) => {
            try {
                if (typeof event.data != "string") {
                    return;
                }
                var response = JSON.parse(event.data);
                if (response.oper == "subscribe" && response.errorCode == 0) {
                    if (response != '' && response.data != '')
                        response.data = JSON.parse(response.data)
                    this.ws_msgReceive(response.topic, response.data)
                } else if (response.oper == "callservice") {

                }
            } catch (error) {
                console.error(error);
            }
            this.touch()
            return true;
        }
    },

    //发送消息
    send(data) {
        console.log(data)
        webSocket.send(JSON.stringify(data));
    },

    //订阅
    subscribe(topic, params) {
        var data = { oper: 'subscribe', topic: topic };
        if (params != null && params !== undefined) {
            data.params = params;
        }
        this.send(data);
    },

    //取消订阅
    unsubscribe(topic, params) {
        var data = { oper: 'unsubscribe', topic: topic };
        if (params != null && params !== undefined) {
            data.params = params;
        }
        this.send(data);
    },

    //保持连接
    touch() {
        if (this.connected == true) {
            var data = { oper: 'touch' };
            webSocket.send(JSON.stringify(data));
            setTimeout(() => {
                this._WebsocketClientTouch()
            }, this.touchTime);
        }
    },

    //连接成功后的回调
    setOnConnect(fnc) {
        this.onconnected = fnc;
    },


    _WebsocketClientTouch() {
        this.touch();
    },

    /**
     * 推送收到消息
     * @param {*} topic 
     * @param {*} receiveData 
     */
    ws_msgReceive(topic, receiveData) {
        //console.log(receiveData)
        if (receiveData && topic) {
            //行情订阅
            if (topic.match(subscribeSet.Topic_instrument)) {
                this.emitter.emit(subscribeSet.Topic_instrument, receiveData);
            }
            //百档行情
            if (topic.match(subscribeSet.Topic_change_mblmarketdata)) {
                this.emitter.emit(subscribeSet.Topic_change_mblmarketdata, receiveData);
            }
            //全部市场
            else if (topic.match(subscribeSet.Topic_instrument)) {
                this.emitter.emit(subscribeSet.Topic_instrument, receiveData);
            }
            //全部成交明细
            else if (topic.match(subscribeSet.Topic_tradeDetail)) {
                this.emitter.emit(subscribeSet.Topic_tradeDetail, receiveData);
            }

        }
    },
}

export default webSocketConfig;