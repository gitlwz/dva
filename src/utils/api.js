let baseURL = "http://47.75.170.16/sundax/";
let baseIP = "/wxtoken/"  //sundax  wxtoken
const apis = {
    "user": {
        "logon": { url: 'wxtoken/logon', method: 'POST', description: '登陆' },
        "userInfo": { url: baseIP + '/service/webGeneralService/queryClientApply', method: 'POST', description: '查询用户注册信息' }
    },
    "trad": {
        rate: { url: baseIP + "service/webGeneralService/findAllFeeSet", method: 'POST', description: '查询费率' }
    }
}

export default apis;