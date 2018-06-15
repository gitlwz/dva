import { message } from 'antd';
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

        value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        //处理 .xxx情况
        if (value.indexOf(".") == 0) {
            value = "0" + value;
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
    }

}


export default format;