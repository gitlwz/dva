import request from '../utils/request';
import requestConfig from '../utils/requestConfig';
import urlUtil from '../utils/url';

//对象转成字符串
function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}


export default function baseService(appConfig, payload) {
    if (appConfig.method && appConfig.method == "GET") {
        return request(appConfig.url + "?" + urlUtil.urlEncode(payload),
            {
                method: "GET",
                headers: requestConfig.headers,
                credentials: 'include'
            });
    } else {
        //此处处理JAVA要求传递字符串,正常情况直接传递body 对象即可
        var data = { 'params': JSON.stringify(payload) };
        return request(appConfig.url,
            {
                method: appConfig.method,
                headers: requestConfig.headers,
                body: toQueryString(data),
                credentials: 'include'
            });
    }

}