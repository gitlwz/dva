//状态格式化
var dataFormat = {

    /**
     * 充提币记录状态转换
     * @param {*} enumName 
     */
    reCharge(enumName) {
        let value = '';
        if (enumName == 'init') {
            value = '充值成功'
        } else if (enumName == 'pending') {
            value = '正在确认'
        } else if (enumName == 'done') {
            value = '充值成功'
        } else if (enumName == 'failed') {
            value = '充值失败'
        }
        return value
    },

    /**
     * 委托查询订单状态
     * @param {*} orderStatus 
     */
    orderStatus(orderStatus) {
        switch (orderStatus) {
            case "0":
                return "全部成交"
                break;
            case "1":
                return "部分成交"
                break;
            case "3":
                return "未成交"
                break;
            case "5":
                return "已撤单"
                break;
            case "6":
                return "部分撤单"
                break;
            default:
                break;
        }
    },

    /**
     * 提现审核状态
     * @param {*} status 
     */
    approveRemitStatus(status) {
        switch (status) {
            case "1":
                return "提现审核中"
            case "2":
                return "提现审核成功";
            case "3":
                return "提现审核失败"
            default:
                break;
        }
    },
    dividendType(status) {
        switch (status) {
            case "0":
                return "持币分红"
            case "1":
                return "交易挖矿"
            case "2":
                return "注册送币记录"
            case "3":
                return "返佣记录"
            case "4":
                return "邀请返币"
            default:
                break;
        }
    }

}

export default dataFormat