let baseURL = "http://47.75.170.16/sundax/";
let baseIP = "/sundax/"  //wxtoken
const apis = {
    "user": {
        "logon": { url: baseIP + 'logon', method: 'POST', description: '登陆' },
        "logout": { url: baseIP + 'service/webGeneralService/logout', method: 'POST', description: '登出' },
        "regis": { url: baseIP + 'service/anonymousWebGeneralService/save', method: 'POST', description: '登陆' },
        "getUserId": { url: baseIP + 'service/logonInfoService/getUserID', method: 'POST', description: '获取当前等人信息' },
        "userInfo": { url: baseIP + 'service/webGeneralService/queryClientApply', method: 'POST', description: '查询用户信息' },
        "getCountry": { url: baseIP + 'service/webGeneralService/findAllCountrys', method: 'POST', description: '查询国家列表' },
        "getVerification": { url: baseIP + '/service/anonymousWebGeneralService/emailSendValidateCode', method: 'POST', description: '获取邮箱验证码' },
        "findAllQuestions": { url: baseIP + '/service/webGeneralService/findAllQuestions', method: 'POST', description: '查询所有问题信息' },
        "customerProblems": { url: baseIP + '/service/webGeneralService/customerProblems', method: 'POST', description: '提交客户反馈' },
        "resetPassword": { url: baseIP + 'service/anonymousWebGeneralService/resetPassword', method: 'POST', description: '修改密码' },
        "bindingToModify": { url: baseIP + 'service/webGeneralService/bindingToModify', method: 'POST', description: '修改账户信息' },
        updateShow: { url: baseIP + 'service/webGeneralService/updateShow', method: 'POST', description: '控制是否展示支付方式' },
        "saveNickname": { url: baseIP + 'service/webGeneralService/saveNickname', method: 'POST', description: '修改昵称' },
    },
    "trad": {
        rate: { url: baseIP + "service/webGeneralService/findAllFeeSet", method: 'POST', description: '查询费率' },
        getInstrumentIds: { url: baseIP + "service/webGeneralService/allInstrumentId", method: 'POST', description: '查询货币对集合' },
    },
    "asset": {
        stopCheck: { url: baseIP + "service/webGeneralService/stopCheck", method: 'POST', description: '查找用户信息：资金密码' },
        findByUserID: { url: baseIP + "service/webGeneralService/findByUserID", method: 'POST', description: '查找用户信息：资金密码' },
        queryClientApply: { url: baseIP + "service/webGeneralService/queryClientApply", method: 'POST', description: '查询用户信息' },
        queryOperTradingAccount: { url: baseIP + "service/pollingService/getTraderBalanceDetail", method: 'POST', description: '查询资金列表' },
        findTraderFundAddress: { url: baseIP + "service/webGeneralService/findTraderFundAddress", method: 'POST', description: '查询其他货币' },
        mailboxVerification: { url: baseIP + "service/webGeneralService/mailboxVerification", method: 'POST', description: '发送邮箱' },
        createAddress: { url: baseIP + "service/webGeneralService/createAddress", method: 'POST', description: '立即生效' },
        rechargeList: { url: baseIP + "service/webGeneralService/queryMoneyIO", method: 'POST', description: '充提币记录' },
        entrustList: { url: baseIP + "service/webGeneralService/queryOperTrade", method: 'POST', description: '成交查询' },
        findFabiAccountByClientId: { url: baseIP + "service/webGeneralService/findFabiAccountByClientId", method: 'POST', description: '查询法币资金' },
        findByOperTradingAccountAndFabiAccountCapital: { url: baseIP + "service/webGeneralService/findByOperTradingAccountAndFabiAccountCapital", method: 'POST', description: '查询资金' },
        accountExchabge: { url: baseIP + "service/webGeneralService/accountExchabge", method: 'POST', description: '资产互转' },
        getTraderAssetOverview: { url: baseIP + "service/pollingService/getTraderAssetOverview", method: 'POST', description: '我的资产界面资金查询' },
    },
    "helpcenter": {
        findAllPushHelpCenterByCondition: { url: baseIP + "service/anonymousWebGeneralService/findAllPushHelpCenterByCondition", method: 'POST', description: '帮助中心问题名称集合' },
        getHelpCenterById: { url: baseIP + "service/anonymousWebGeneralService/getHelpCenterById", method: 'POST', description: '帮助中心问题详情' }
    },
    "otherRecharge": {
        findFundAddress: { url: baseIP + "service/webGeneralService/findFundAddress", method: 'POST', description: '查询提币地址' },
    },
    "reopenGoogle": {
        gooleCheckBegin: { url: baseIP + "service/anonymousWebGeneralService/gooleCheckBegin", method: 'POST', description: '获取谷歌验证码' },
        gooleCheckOver: { url: baseIP + "service/anonymousWebGeneralService/gooleCheckOver", method: 'POST', description: '开启谷歌验证' },
    },
    "smSverification": {
        resetGooleOrMessageCheck: { url: baseIP + "service/webGeneralService/resetGooleOrMessageCheck", method: 'POST', description: 'tGoole验证' },
        bankBindingMessageSent: { url: baseIP + "service/anonymousWebGeneralService/bankBindingMessageSent", method: 'POST', description: '银行绑定发送' },
        registrerMessageSent: { url: baseIP + "service/anonymousWebGeneralService/registrerMessageSent", method: 'POST', description: '发送短信验证' },
        messageCheck: { url: baseIP + "service/anonymousWebGeneralService/messageCheck", method: 'POST', description: '提交' },
    },
    "setMoneyPassword": {
        bankBindingMessageSent: { url: baseIP + "service/anonymousWebGeneralService/bankBindingMessageSent", method: 'POST', description: '银行绑定发送' },
        setAccountPassword: { url: baseIP + "service/webGeneralService/setAccountPassword", method: 'POST', description: '修改资金密码' },
    },
    "submitMessage": {
        authentication: { url: baseIP + "service/clientApplyService/authentication", method: 'POST', description: '上传信息提交' },
    },
    "otherPresent": {
        findByCurrencyAndAddressType: { url: baseIP + "service/webGeneralService/findByCurrencyAndAddressType", method: 'POST', description: '获取火币地址' },
        withdraw: { url: baseIP + "service/webGeneralService/withdraw", method: 'POST', description: '提现提交' },
    },
    "bindingAddress": {
        bankBindingMessageSent: { url: baseIP + "service/anonymousWebGeneralService/bankBindingMessageSent", method: 'POST', description: '银行绑定发送' },
        addTraderFundAddress: { url: baseIP + "service/webGeneralService/addTraderFundAddress", method: 'POST', description: '绑定提现提交' },
    },
    //法币  --- 交易中心
    "tradingCenter": {
        findAllCurrencys: { url: baseIP + "service/webGeneralService/findAllCurrencys", method: 'POST', description: '查询所有交易信息' },
        findBiddingPosters: { url: baseIP + "service/webGeneralService/findBiddingPosters", method: 'POST', description: '查询交易信息列表' },
        findByBiddingPosters: { url: baseIP + "service/webGeneralService/findByBiddingPosters", method: 'POST', description: '查询交易用户' },
        fiatDetails: { url: baseIP + "service/webGeneralService/fiatDetails", method: 'POST', description: '交易中心直接摘单' },
    },
    //法币-我要发布
    "release": {
        serviceCharge: { url: baseIP + "service/webGeneralService/findCurrency", method: 'POST', description: '查询手续费' },
        findBiddingPostersByPostersID: { url: baseIP + "service/webGeneralService/findBiddingPostersByPostersID", method: 'POST', description: '查询发布挂单详情' },
        saveBiddingPosters: { url: baseIP + "service/webGeneralService/saveBiddingPosters", method: 'POST', description: '发布挂单' },
        findByBiddingPosters: { url: baseIP + "service/webGeneralService/findByBiddingPosters", method: 'POST', description: '查询用户详细信息' },
        findBySubBankAccount: { url: baseIP + "service/webGeneralService/findBySubBankAccount", method: 'POST', description: '查询绑定银行卡信息' },
    },
    //法币----订单详情
    "tradingDetail": {
        acknowledgeReceipt: { url: baseIP + "service/webGeneralService/acknowledgeReceipt", method: 'POST', description: '订单详情根据ID查询详情' },
        buyerPayment: { url: baseIP + "service/webGeneralService/buyerPayment", method: 'POST', description: '取消订单/确认订单接口' },
        collection: { url: baseIP + "service/webGeneralService/collection", method: 'POST', description: ' 卖方收款' },
    },
    //法币----账户管理
    "orderManager": {
        findAllCurrencys: { url: baseIP + "service/webGeneralService/findAllCurrencys", method: 'POST', description: '查询所有货币' },
        findMyBiddingPosters: { url: baseIP + "service/webGeneralService/findMyBiddingPosters", method: 'POST', description: '查询挂单' },
        cancelBiddingPosters: { url: baseIP + "service/webGeneralService/cancelBiddingPosters", method: 'POST', description: '取消挂单' },
        findOrderFormForWeb: { url: baseIP + "service/webGeneralService/findOrderFormForWeb", method: 'POST', description: '查询交易订单' },
    },
    "promotion": {
        findByPromotionCode: { url: baseIP + "service/webGeneralService/findByPromotionCode", method: 'POST', description: '查询返佣记录排行榜以及个人推广码' },
        findByInvitationToReturnMoneyResponse: { url: baseIP + "service/webGeneralService/findByInvitationToReturnMoneyResponse", method: 'POST', description: '查询邀请情况' },
        findByCommissionexDividend: { url: baseIP + "service/webGeneralService/findByCommissionexDividend", method: 'POST', description: '查询邀请情况' },
    },
    baseConfig: {
        findAllSlideshow: { url: baseIP + "service/webGeneralService/findAllSlideshow", method: 'POST', description: '查询主页轮播图片列表' },
        findPushNotice: { url: baseIP + "service/anonymousWebGeneralService/findPushNotice", method: 'POST', description: '查询轮播公告' },
        findMessageList: { url: baseIP + "service/webGeneralService/findMessageAsPage", method: 'POST', description: '查询平台公告' },
        findAllExchangeRateUse: { url: baseIP + "service/webGeneralService/findAllExchangeRateUse", method: 'POST', description: '查询兑换人民币换算汇率' },
        getAllInstrument: { url: baseIP + "service/instrumentTradParamService/getAllInstrument", method: 'POST', description: '查询所有货币小数保存位数' },
        getPhoto: { url: baseIP + "download/memberFileUploadService/downloadFile", method: 'GET', description: '去FTP下载图片' },
        findAllCurrencys: { url: baseIP + "service/webGeneralService/findAllCurrencys", method: 'POST', description: '查询所有币种集合' },
        findAll: { url: baseIP + "service/withdrawFeeSetService/findAll", method: 'POST', description: '查询基础货币小数位数' },
    }
}
export default apis;
