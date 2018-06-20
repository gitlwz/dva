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
    }
}

export default Validator;