import fetch from 'dva/fetch';
import { message } from "antd";
import { routerRedux } from 'dva/router';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    //console.log(response.headers.get('error_code'));
    let code = response.headers.get('error_code')
    console.log(code)
    if (code >= 200 && code < 300) {
        return response;
    } else {
        message.error(code)
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            if (data.errorCode == 0) {
                let resData = data;
                if (resData != '' && resData.data != '')
                    resData.data = JSON.parse(resData.data)
                return resData;
            } else {
                message.error(data.errorMsg)
                return data
            }
        }).catch(err => {
            console.log("network error")
            if (err != null) {
                return "network error"
            }
        });
}