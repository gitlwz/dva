//全局验证
var Validator = {
    email(value) {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (!reg.test(value)) {
            return false
        }
        return true
    },
    equals(a, b) {
        if (a != b) {
            return false;
        }
        return true
    },
    phone(value) {
        var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        if (!phoneReg.test(value)) {
            return false;
        }
        return true
    },
    password(value) {
        var reg1 = /(?=^.{6,20}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?!.*[!@#$%^&*? ])(?!.*\n).*$/;
        if (reg1.test(value)) {
            return true
        }
        return false
    },
    idCard(value) {
        if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
            return false
        }
        return true
    }

}

export default Validator;