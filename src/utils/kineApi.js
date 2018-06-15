let baseIP = "/sundax/"  //wxtoken 
const Api = {
    listInstrument: { url: 'service/tradeService/listInstrument', method: 'POST', description: '查询合约列表' },
    trade: {
        findBuyMarket: { url: baseIP + 'service/tradeService/listBidMBLMarketData', method: "POST", description: '查询买百档行情' },
        findSellMarket: { url: baseIP + 'service/tradeService/listAskMBLMarketData', method: "POST", description: '查询卖百档行情' },
        findMemberMessage: { url: baseIP + 'service/tradeService/listPartAccount', method: "POST", description: '查询会员资金信息' },
        orderInsert: { url: baseIP + 'service/tradeService/orderInsert', method: "POST", description: '报单录入' },
        orderAction: { url: baseIP + 'service/tradeService/orderAction', method: "POST", description: '撤单' },
        batchOrderAction: { url: baseIP + 'service/tradeService/batchOrderAction', method: "POST", description: '批量撤单' },
        getServerTime: { url: 'service/tradeService/getServerTime', method: "POST", description: '查询服务器当前时间' },
        findByInstrumentID: { url: baseIP + 'service/instrumentService/findByInstrumentID', method: "POST", description: '根据合约id 查询合约详情' },
    }
}

export default Api;