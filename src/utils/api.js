let baseURL = "http://47.75.170.16/sundax/";
let baseIP = "/sundax/"  //wxtoken
const apis = {
    "user": {
        "logon": { url: baseIP + 'logon', method: 'POST', description: '登陆' },
        "logout": { url: baseIP + 'logout', method: 'DELETE', description: '登出' },
        "regis": { url: baseIP + 'service/anonymousWebGeneralService/save', method: 'POST', description: '登陆' },
        "getUserId": { url: baseIP + 'service/logonInfoService/getUserID', method: 'POST', description: '获取当前等人信息' },
        "userInfo": { url: baseIP + '/service/webGeneralService/queryClientApply', method: 'POST', description: '查询用户注册信息' },
        "getCountry": { url: baseIP + '/service/webGeneralService/findAllCountrys', method: 'POST', description: '查询国家列表' },
      "findAllQuestions": {  url:baseIP + '/service/webGeneralService/findAllQuestions', method: 'POST', description: '查询所有问题信息' },
      "customerProblems": {  url:baseIP + '/service/webGeneralService/customerProblems', method: 'POST', description: '提交客户反馈' },

    },
    "trad": {
        rate: { url: baseIP + "service/webGeneralService/findAllFeeSet", method: 'POST', description: '查询费率' },
        getInstrumentIds:{ url: baseIP + "service/webGeneralService/allInstrumentId", method: 'POST', description: '查询货币对集合' }
    }
}

export default apis;
