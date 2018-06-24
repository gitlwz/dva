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
    }
}

export default dataFormat