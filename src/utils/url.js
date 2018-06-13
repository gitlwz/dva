var urlUtil = {
    //对象转字符串
    urlEncode: function (param, key, encode) {
        if (param == null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += urlUtil.urlEncode(param[i], k, encode);
            }
        }
        return paramStr;
    },

    //字符串转对象
    strToObg: function (str) {
        if (typeof str === "string") {
            if (str.indexOf('?') > -1) {
                str = str.replace('?', '');
            }
            var obj = {};
            var t = str.split("&");
            for (var i = 0; i < t.length; i++) {
                obj[t[i].split("=")[0]] = t[i].split("=")[1];
            };
            return obj;
        } else {
            return {};
        }

    }
}
module.exports = urlUtil