import { message } from 'antd';
var bigRat = require("big-rational");
/**
 * 格式化数字
 */
var format = {
    /**
     * 
     * @param {*} pointNum 保留小数位数
     * @param {*} leftPoint 保留左边位数
     * @param {*} max 最大
     * @param {*} min 最小
     */
    NumberCheck({ value: value, pointNum: pointNum, leftPoint: leftPoint, max: max, min: min }) {
        //console.log(value, max)
        value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d\d\d).*$/, '$1$2.$3');
        //处理 .xxx情况
        if (value.indexOf(".") == 0) {
            value = "0" + value;
        }
        //处理 000
        if (value.indexOf("0") == 0 && value[1] != ".") {
            value = value.substr(1, 1)
        }
        if (value == "") {
            return 0
        }
        if (pointNum) {
            if (value.indexOf(".") > 0) {
                let num = value.split(".");
                if (num[1].length > pointNum) {
                    value = num[0] + "." + num[1].substr(0, pointNum);
                }
            }
        }


        if (max) {
            if (parseFloat(value) > parseFloat(max)) {
                value = max;
                message.error("超过最大值" + max + "请重新输入");
            }
            return;
        }
        if (min) {
            if (parseFloat(value) < parseFloat(min)) {
                //value = min;
                message.error("最小值不能小于" + min)
                // return
            }
        }

        if (leftPoint) {
            if (value.indexOf(".") > 0) {
                let num = value.split(".");
                if (num[0].length > leftPoint) {
                    value = num[0].substr(0, leftPoint) + "." + num[1];
                }
            } else {
                if (value.length > leftPoint) {
                    value = value.substr(0, leftPoint)
                }
            }
        }

        return value;
    },

    /**
     * 创建人:席坤
     * 日期:2018-3-30
     * @param {*} num1  参数1
     * @param {*} num2  参数2
     * @param {*} points  保留小数位数
     */
    multiply(num1, num2, points) {
        //处理无价格情况
        if (num1 == "---" || num2 == "---") {
            return "---";
        }
        let Num = bigRat(num1).multiply(num2).toDecimal(points);

        if (Num.indexOf(".") > -1) {
            let s1 = Num.split(".")[1];
            for (var i = s1.length; i < points; i++) {
                Num += "0"
            }
        } else {
            if (points > 0) {
                Num += ".";
                for (var i = 0; i < points; i++) {
                    Num += "0"
                }
            }
        }
        return Num
    },


    /**
     * 计算涨跌幅
     * @param {*} 当前价格
     * @param {*} 开盘价
     */
    changePrice(closePrice, openPrice) {
        if (!!closePrice && !!openPrice) {
            if (closePrice - openPrice > 0) {
                let num = (closePrice - openPrice) / openPrice;
                return <span style={{ color: '#349B00' }}>+{(num * 100).toFixed(2)}%</span>
            }
            else if (closePrice - openPrice < 0) {
                let num = (closePrice - openPrice) / openPrice;
                return <span style={{ color: '#FF4200' }}>{(num * 100).toFixed(2)}%</span>
            }
            else {
                return <span>---</span>
            }
        }
    },

    /**
     * 计算最大购买量
     * @param {*} total 
     * @param {*} price 
     */
    buyMax(total, price) {
        if (price != 0) {
            if (!!total && total > 0) {
                return Number(this.multiply(total / price, 1, 4));
            }
        }
        return 0
    },

    //计算货币转算成人民币
    convertCNY(rateUseList, closePrice, instrumentId) {
        if (rateUseList.length > 0) {
            switch (!!instrumentId && instrumentId.split("-")[1]) {
                case "USDT":
                    let exchangeRate1 = rateUseList.filter(item => item.currency == "USDT")[0]["exchangeRate"];
                    return this.multiply(exchangeRate1, closePrice, 2) + " CNY";
                    break;
                case "ETH":
                    let exchangeRate2 = rateUseList.filter(item => item.currency == "ETH")[0]["exchangeRate"];
                    return this.multiply(exchangeRate2, closePrice, 2) + " CNY";
                    break;
                case "BTC":
                    let exchangeRate3 = rateUseList.filter(item => item.currency == "BTC")[0]["exchangeRate"];
                    return this.multiply(exchangeRate3, closePrice, 2) + " CNY";
                    break;
                default:
                    break;
            }
        }
    },

    //排序
    sort(array, sort) {
        switch (sort) {
            case 0:
                return array.sort((a, b) => { return a.price > b.price });
                break;
            case 1:
                return array.sort((a, b) => { return a.price < b.price });
                break;
            default:
                break;
        }
    }
}


export default format;