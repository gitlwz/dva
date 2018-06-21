let baseURL = "http://47.75.170.16/sundax/";
let baseIP = "/sundax/"  //wxtoken
const apis = {
    "user": {
        "logon": { url: baseIP + 'logon', method: 'POST', description: '登陆' },
        "logout": { url: baseIP + 'logout', method: 'DELETE', description: '登出' },
        "regis": { url: baseIP + 'service/anonymousWebGeneralService/save', method: 'POST', description: '登陆' },
        "getUserId": { url: baseIP + 'service/logonInfoService/getUserID', method: 'POST', description: '获取当前等人信息' },
        "userInfo": { url: baseIP + '/service/webGeneralService/queryClientApply', method: 'POST', description: '查询用户信息' },
        "getCountry": { url: baseIP + '/service/webGeneralService/findAllCountrys', method: 'POST', description: '查询国家列表' },
        "getVerification": { url: baseIP + '/service/anonymousWebGeneralService/emailSendValidateCode', method: 'POST', description: '获取邮箱验证码' },
        "findAllQuestions": { url: baseIP + '/service/webGeneralService/findAllQuestions', method: 'POST', description: '查询所有问题信息' },
        "customerProblems": { url: baseIP + '/service/webGeneralService/customerProblems', method: 'POST', description: '提交客户反馈' },
        "resetPassword": { url: baseIP + '/service/anonymousWebGeneralService/resetPassword', method: 'POST', description: '修改密码' },
    },
    "trad": {
        rate: { url: baseIP + "service/webGeneralService/findAllFeeSet", method: 'POST', description: '查询费率' },
        getInstrumentIds: { url: baseIP + "service/webGeneralService/allInstrumentId", method: 'POST', description: '查询货币对集合' },
    },
    "asset": {
        queryClientApply: { url: baseIP + "service/webGeneralService/queryClientApply", method: 'POST', description: '查询用户信息' },
        queryOperTradingAccount: { url: baseIP + "service/webGeneralService/queryOperTradingAccount", method: 'POST', description: '通过币种查询金额' },
        findTraderFundAddress: { url: baseIP + "service/webGeneralService/findTraderFundAddress", method: 'POST', description: '查询其他货币' },
        mailboxVerification: { url: baseIP + "service/webGeneralService/mailboxVerification", method: 'POST', description: '发送邮箱' },
    },
    "helpcenter":{
        findAllPushHelpCenterByCondition:{url: baseIP + "service/anonymousWebGeneralService/findAllPushHelpCenterByCondition", method: 'POST', description: '帮助中心问题名称集合'},
        getHelpCenterById:{url: baseIP + "service/anonymousWebGeneralService/getHelpCenterById", method: 'POST', description: '帮助中心问题详情'}
    },
    baseConfig: {
        findAllSlideshow: { url: baseIP + "service/webGeneralService/findAllSlideshow", method: 'POST', description: '查询主页轮播图片列表' },
    }
}

export default apis;
