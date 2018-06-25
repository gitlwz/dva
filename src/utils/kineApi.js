let baseIP = "/sundax/"  //wxtoken 
const Api = {
    instrument: {
        listInstrument: { url: 'service/tradeService/listInstrument', method: 'POST', description: '查询合约列表' },
        getLastDayKline: { url: baseIP + 'service/pollingService/getLastDayKline', method: 'POST', description: '查询单个合约深度详情' },
        getListDayKline: { url: baseIP + 'service/pollingService/getListDayKline', method: 'POST', description: '查询全部合约深度详情' },
        list24HVolume: { url: baseIP + 'service/pollingService/list24HVolume', method: 'POST', description: '查询24小时成交量' }
    },
    trade: {
        findBuyMarket: { url: baseIP + 'service/tradeService/listBidMBLMarketData', method: "POST", description: '查询买百档行情' },
        findSellMarket: { url: baseIP + 'service/tradeService/listAskMBLMarketData', method: "POST", description: '查询卖百档行情' },
        findMemberMessage: { url: baseIP + 'service/tradeService/listPartAccount', method: "POST", description: '查询会员资金信息' },
        getTradeDetail: { url: baseIP + 'service/pollingService/getTradeDetail', method: "POST", description: '成交合约明细查询' },
        getListTradeDetail: { url: baseIP + 'service/pollingService/getListTradeDetail', method: "POST", description: '成交合约列表明细查询' },
        queryOperTrade: { url: baseIP + 'service/webGeneralService/queryOperTrade', method: "POST", description: '查询用户个人成交' },
        queryOrderForClient: { url: baseIP + 'service/orderQueryService/queryOrderForClient', method: "POST", description: '查询个人未成交委托列表' },
        orderInsert: { url: baseIP + 'service/tradeService/orderInsert', method: "POST", description: '报单录入' },
        orderAction: { url: baseIP + 'service/tradeService/orderAction', method: "POST", description: '撤单' },
        batchOrderAction: { url: baseIP + 'service/tradeService/batchOrderAction', method: "POST", description: '批量撤单' },
        getServerTime: { url: 'service/tradeService/getServerTime', method: "POST", description: '查询服务器当前时间' },
        findByInstrumentID: { url: baseIP + 'service/instrumentService/findByInstrumentID', method: "POST", description: '根据合约id 查询合约详情' },
        getUnfinishedOrder: { url: baseIP + 'service/pollingService/getUnfinishedOrder', method: "POST", description: '轮询未完成委托' },
        getClientTradeDetail: { url: baseIP + 'service/pollingService/getClientTradeDetail', method: "POST", description: '轮询我的成交' },
    }
}

export default Api;