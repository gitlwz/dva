'use strict';
var bigRat = require("big-rational");

var CalculateFunc = {
    /**
     * 两个浮点数相减
     */
    subNum(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.mulNum(a, e) - this.mulNum(b, e)) / e;
    },

    //多个浮点数相减
    subNums() {
        if (arguments.length < 2) {
            throw 'params wrong';
        }
        let res = this.subNum(arguments[0], arguments[1]);
        for (let i = 2; i < arguments.length; i++) { //arguments.length表示传入参数的个数
            res = this.subNum(res, arguments[i]);
        }
        return res;
    },

    /**
     * 浮点数相加
     * @param arg1
     * @param arg2
     * @returns {number}
     */
    addNum(a, b) {
        var c, d, e;
        try {
            c = a.toString().split(".")[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split(".")[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.mulNum(a, e) + this.mulNum(b, e)) / e;
    },

    //多个浮点数相加
    addNums() {
        if (arguments.length < 2) {
            throw 'params wrong';
        }
        let res = this.addNum(arguments[0], arguments[1]);
        for (let i = 2; i < arguments.length; i++) { //arguments.length表示传入参数的个数
            res = this.addNum(res, arguments[i]);
        }
        return res;
    },


    /**
     * 浮点数相乘
     * @param a
     * @param b
     * @returns {number}
     */
    mulNum(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    },

    //多个浮点数相乘
    mulNums() {
        if (arguments.length < 2) {
            throw 'params wrong';
        }
        let res = this.mulNum(arguments[0], arguments[1]);
        for (let i = 2; i < arguments.length; i++) { //arguments.length表示传入参数的个数
            res = this.mulNum(res, arguments[i]);
        }
        return res;
    },

    /**
     * 浮点数相除
     * @param a
     * @param b
     */
    divNum(a, b) {
        var c, d, e = 0,
            f = 0;
        try {
            e = a.toString().split(".")[1].length;
        } catch (g) {}
        try {
            f = b.toString().split(".")[1].length;
        } catch (g) {}
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mulNum(c / d, Math.pow(10, f - e));
    },

    //多个浮点数相除
    divNums() {
        if (arguments.length < 2) {
            throw 'params wrong';
        }
        let res = this.divNum(arguments[0], arguments[1]);
        for (let i = 2; i < arguments.length; i++) { //arguments.length表示传入参数的个数
            res = this.divNum(res, arguments[i]);
        }
        return res;
    },


    changeDecimalZero(number, bitNum) {
        let f_x = parseFloat(number);
        if (isNaN(f_x)) {
            return 0;
        }
        let s_x = number.toString();
        let pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        } else {
            let numArr = s_x.split('.');
            if (numArr[1] && numArr[1].length >= bitNum) {
                return number.toFixed(bitNum);
            }
        }
        while (s_x.length <= pos_decimal + bitNum) {
            s_x += '0';
        }
        return s_x;
    },

    /**
     * 创建人:席坤
     * 日期:2018-3-30
     * @param {*} num1  参数1
     * @param {*} num2  参数2
     * @param {*} points  保留小数位数
     */
    multiply(num1, num2, points) {
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
    }
};


export default CalculateFunc;