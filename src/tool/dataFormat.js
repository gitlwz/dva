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
    }
}

export default dataFormat