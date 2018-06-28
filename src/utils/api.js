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
    baseConfig: {
        findAllSlideshow: { url: baseIP + "service/webGeneralService/findAllSlideshow", method: 'POST', description: '查询主页轮播图片列表' },
        findPushNotice: { url: baseIP + "service/anonymousWebGeneralService/findPushNotice", method: 'POST', description: '查询轮播公告' },
        findMessageList: { url: baseIP + "service/webGeneralService/findMessageAsPage", method: 'POST', description: '查询平台公告' },
        findAllExchangeRateUse: { url: baseIP + "service/webGeneralService/findAllExchangeRateUse", method: 'POST', description: '查询兑换人民币换算汇率' },
    }
}
export default apis;
