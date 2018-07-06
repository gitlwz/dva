import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, Icon, message, Button, Spin, Divider, Radio } from 'antd';
import style from './setMoneyPassword.less'
import md5 from 'md5';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Search = Input.Search;

/**
 * 资产管理
 */
class setMoneyPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            radio1:false,
            radio2:false,

            radio1_i:false,
            radio2_i:false
        }
    }
    setTime = () => {
        setTimeout(() => {
            if (this.state.time <= 0) {
                return;
            }
            this.setState({
                time: this.state.time - 1
            })
            this.setTime()
        }, 1000)
    }
    componentWillMount = () => {
        this.dealRadio(this.props.userInfo.applyStatus)
    }
    dealRadio = (applyStatus) =>{
        if(!!applyStatus){
            const { setFieldsValue } = this.props.form;
            let _obj = {}
            if(applyStatus == 4){
                _obj.radio2 = true
                _obj.radio2_i = true
                setFieldsValue({
                    radio:"2"
                })
            }else if(applyStatus == 5){
                _obj.radio1 = true
                _obj.radio1_i = true
                setFieldsValue({
                    radio:"1"
                })
            }else if(applyStatus == 6){
                _obj.radio2 = true
                _obj.radio2_i = false
                _obj.radio1 = true
                _obj.radio1_i = true
                setFieldsValue({
                    radio:"1"
                })
            }
            this.setState({
                ..._obj
            })
        }
    }
    //6位数字校验
    handleConfirmPassword = (rule, value, callback) =>{
        if (!/^[0-9]{6}$/.test(value)) {
            callback('请输入6位数字密码')
            return
        }
        callback()
    }
    handleConfirmPassword2 = (rule, value, callback)=>{
        const { getFieldValue } = this.props.form
        if (value && value !== getFieldValue('password1')) {
            callback('两次输入不一致！')
            return
        }
        callback()
    }
    radioChange = ({target}) =>{
        if(target.value == 2){
            this.setState({
                radio2_i:true,
                radio1_i:false,
            })
        }else{
            this.setState({
                radio2_i:false,
                radio1_i:true,
            })
        }
    }
    code1 = (rule, value, callback) =>{
        if (!/^[0-9]{6}$/.test(value)) {
            callback('请输入6位数字验证码')
            return
        }
        callback()
    }
    //发送短信验证码
    getNoteCode = () =>{
        if(!!this.props.userInfo.mobilePhone){
            this.props.dispatch({
                type: 'setMoneyPassword/bankBindingMessageSent',
                payload: {
                    params: this.props.userInfo.mobilePhone
                }
            })
            this.setState({
                time: 120
            }, this.setTime())
        }
    }
    //提交
    submit = () => {
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err,values)=>{
            if(!!err){
                return
            }
            let params = []
            if(values.radio == 1){
                params.push(this.props.userInfo.email)
                params.push(values.code1)
                params.push(values.radio)
                params.push(md5(values.password1))
            }else{
                params.push(this.props.userInfo.email)
                params.push(values.code2)
                params.push(values.radio)
                params.push(md5(values.password1))
            }
            this.props.dispatch({
                type: 'setMoneyPassword/setAccountPassword',
                payload: {
                    params: params
                }
            })

        })
    }
    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.userInfo.applyStatus !== this.props.userInfo.applyStatus){
            this.dealRadio(nextProps.userInfo.applyStatus)
        }
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 24 },
                lg: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 24 },
                lg: { span: 20 },
            },
        };
        return (
            <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <Spin spinning={this.props.loading} size="large" >
                    <div className={style.content + " " + "setMoneyPassword"}>
                        <div className={style.title}>
                            设置资金密码
                        </div>
                        <div>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="资金密码"
                                >
                                    {getFieldDecorator('password1', {
                                        rules: [{
                                            required:true,validator: this.handleConfirmPassword
                                        }],
                                    })(
                                        <Input placeholder="请设置资金密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="确认密码"
                                >
                                    {getFieldDecorator('password2', {
                                        rules: [{
                                            required:true,validator: this.handleConfirmPassword2
                                        }],
                                    })(
                                        <Input placeholder="设置新的用户验证码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', marginLeft: '15px' }} />} type="password" />
                                    )}
                                </FormItem>
                                <div className={style.text}>
                                    <Divider className={style.line}>授权验证</Divider>
                                </div>
                                <FormItem
                                >
                                    {getFieldDecorator('radio',{
                                        onChange:this.radioChange
                                    })(
                                        <RadioGroup style={{textAlign:"center"}}>
                                            {this.state.radio1&&<Radio value="1">手机短信验证</Radio>}
                                            {this.state.radio2&&<Radio value="2">谷歌两步验证</Radio>}
                                        </RadioGroup>
                                    )}
                                </FormItem>

                                {this.state.radio1_i&&<FormItem>
                                    {getFieldDecorator('code1', {
                                        rules: [{ required: true, validator: this.code1 }],
                                    })(
                                        <Input placeholder="短信验证码" className={style.input} type="text" />

                                    )}
                                    <Button onClick={this.getNoteCode} disabled={this.state.time > 0 ? true : false} className="hqbtn">{this.state.time > 0 ? this.state.time + "后重新发送" : "获取验证码"}</Button>
                                </FormItem>}
                                {this.state.radio2_i&&<FormItem
                                >
                                    {getFieldDecorator('code2', {
                                        rules: [{ required: true,message:"请输入谷歌两步验证码！"}],
                                    })(
                                        <Input placeholder="谷歌两步验证码" type="text" />
                                    )}
                                </FormItem>}
                                <div style={{ marginTop: "24px" }}>
                                    <Button onClick={this.submit} style={{ height: '40px', width: '100%', color: "#565656" }} type="primary">提交</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { loading } = state.setMoneyPassword
    let { userInfo = {} } = state.user
    return {
        userInfo,
        loading,
        ...props,
    }
})(Form.create()(setMoneyPassword));
