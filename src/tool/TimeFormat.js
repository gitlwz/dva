function TimeFormat(value) {
    let second = parseInt(value);// 秒
    let minute = 0;// 分
    let hour = 0;// 小时
    let day = 0;//天

    if(second >= 60) {
        minute = parseInt(second/60);
        second = parseInt(second%60);

        if(minute >= 60) {
            hour = parseInt(minute/60);
            minute = parseInt(minute%60);
            if(hour >= 24) {
                day = parseInt(hour/24);
                hour = parseInt(hour%24);
            }
        }
    }

    let result = parseInt(second);

    result = result.toString().length == 1 ? '0' + result : result;

    if(minute >= 0) {
        result = parseInt(minute)+":"+result;
        result = minute.toString().length == 1 ? '0' + result : result;
    }
    if(hour >= 0) {
        result = parseInt(hour)+":"+result;
        result = hour.toString().length == 1 ? '0' + result : result;
    }
    if(day >= 0) {
        result = parseInt(day)+"天 "+result;
        result = day.toString().length == 1 ? '0' + result : result;
    }


    return result;
}

export default TimeFormat;