var Validator = {
    email(value) {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (!reg.test(value)) {
            return false
        } else {
            return true
        }
    },
    equals(a, b) {
        if (a != b) {
            return false;
        } else {
            return true;
        }
    },

    password(value) {
        var reg1 = /(?=^.{6,20}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?!.*[!@#$%^&*? ])(?!.*\n).*$/;
        if (reg1.test(value)) {
            return true
        } else {
            false;
        }
    }
}

export default Validator;