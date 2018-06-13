const Api = {
    listInstrument: { url: 'wxtoken/service/tradeService/listInstrument', method: 'POST', description: '查询合约列表' },
    trade: {
        findBuyMarket: { url: 'wxtoken/service/tradeService/listBidMBLMarketData', method: "POST", description: '查询买百档行情' },
        findSellMarket: { url: 'wxtoken/service/tradeService/listAskMBLMarketData', method: "POST", description: '查询卖百档行情' },
        findMemberMessage: { url: 'wxtoken/service/tradeService/listPartAccount', method: "POST", description: '查询会员资金信息' },
        orderInsert: { url: 'wxtoken/service/tradeService/orderInsert', method: "POST", description: '报单录入' },
        orderAction: { url: 'wxtoken/service/tradeService/orderAction', method: "POST", description: '撤单' },
        batchOrderAction: { url: 'wxtoken/service/tradeService/batchOrderAction', method: "POST", description: '批量撤单' },
        getServerTime: { url: 'wxtoken/service/tradeService/getServerTime', method: "POST", description: '查询服务器当前时间' }
    }
}

export default Api;