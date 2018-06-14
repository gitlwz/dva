
/**
 * 格式化数字
 */
var format = {
    formatNum(value) {
        //清楚数字和 .  以外的东西
        value = value.replace(/[^\d.]/g, "");
        //只保留一个.
        value = value.replace(/\.{2,}/g, ".");
        //此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        if (value.indexOf(".") < 0 && value != "") {
            return value
        }

    }
}

export default format;