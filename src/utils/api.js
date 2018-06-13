let baseURL = "http://192.168.100.180:8080/";
let baseIP = "wxtoken"  //sundax  wxtoken
const apis = {
    "user": {
        "logon": { url: 'wxtoken/logon', method: 'POST', description: '登陆' },
        "userInfo": { url: baseIP + '/service/webGeneralService/queryClientApply', method: 'POST', description: '查询用户注册信息' }
    }
}

export default apis;