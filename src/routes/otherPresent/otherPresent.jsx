import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input,InputNumber, Icon, message, Button, Spin, Divider, Radio,Select } from 'antd';
import style from './otherPresent.less'
import md5 from 'md5';
const { Option, OptGroup } = Select;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Search = Input.Search;

/**
 * 资产管理
 */
class otherPresent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            radio1:false,
            radio2:false,

            radio1_i:false,
            radio2_i:false,

            select:{},

            fee:"--"
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
        this.props.dispatch({
            type: 'otherPresent/findByCurrencyAndAddressType',
            payload: {
                params: [this.props.match.params.type,"2"]
            }
        })
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
    //提现地址
    txdzChange = (value) =>{
        let {getFieldValue,setFieldsValue} = this.props.form;
        if(!!value){
            let currentAdderss = this.props.currencyAndAddress.find((ele)=>ele.id === value);
            setFieldsValue({
                address:currentAdderss.address
            })
            this.setState({
                select:currentAdderss
            })
        }
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
                type: 'otherPresent/bankBindingMessageSent',
                payload: {
                    params: this.props.userInfo.mobilePhone
                }
            })
            this.setState({
                time: 120
            }, this.setTime())
        }
    }
    //提现金额
    numberChange = (value) =>{
        let num = 0
        if(this.state.select.withdrawFeeAlgor == 1){
            num = (value||0)*this.state.select.withdrawalAmount
        }else{
            num = this.state.select.withdrawalAmount
        }
        this.setState({
            fee:num
        })
    }
    //提交
    submit = () => {
        const { validateFieldsAndScroll } = this.props.form;
        
        validateFieldsAndScroll((error , values)=>{
            if(error){
                return
            }
            let code = values.code1;
            let mobilePhone =  this.props.userInfo.mobilePhone;
            if(values.radio == 2){
                code = values.code2;
                mobilePhone = ""
            }
            let params = [{
                currency:this.props.match.params.type,
                address:values.address,
                capitalPwd:md5(values.capitalPwd),
                amount:values.amount,
                fee:0.001,
                withdrawalUnit:this.state.select.withdrawalUnit
            },
            mobilePhone
            ,
            code
            ,
            values.radio
        ]
            this.props.dispatch({
                type: 'otherPresent/withdraw',
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
        let precision = 0
        let _precision = this.state.select.withdrawalUnit
        if(!!_precision){
            precision = _precision.split(".")[1].length
        }
        return (
            <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <Spin spinning={this.props.loading} size="large" >
                    <div className={style.content + " " + "otherPresent"}>
                        <div className={style.title}>
                            其他货币提现
                        </div>
                        <div>
                            <Form>
                                <FormItem
                                >
                                    {getFieldDecorator('txdz', {
                                        rules: [{
                                            required:true,
                                            message:"请选择提现地址",
                                            
                                        }],
                                    })(
                                        <Select onChange={this.txdzChange} placeholder="请选择提现地址">
                                            {this.props.currencyAndAddress.map((ele,index)=>{
                                                return <Option value={ele.id} key={ele.id}>{ele.addressRemark}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem>
                                    {getFieldDecorator('address', {
                                    })(
                                        <Input disabled  type="text"/>
                                    )}
                                </FormItem>

                                <FormItem
                                >
                                    {getFieldDecorator('amount', {
                                        rules: [{
                                            required:true,
                                            message:"请输入提现金额"
                                        }],
                                    })(
                                        <InputNumber onChange={this.numberChange}  precision={precision} max={this.state.select.extractable*1||0} min={this.state.select.withdrawalAmount*1||0} placeholder="提现金额" className={style.inputerNumber}  />
                                    )}
                                    <a href="#/minerFee" className={style.inputerNumber_text}>矿工说明</a>
                                </FormItem>
                                <div>
                                    <div className={style.txwz}>
                                        <span>最小提现单位：</span>
                                        <span>{this.state.select.withdrawalUnit*1||0}</span>
                                    </div>
                                    <div className={style.txwz}>
                                        <span>最小可提现金额：</span>
                                        <span>{this.state.select.withdrawalAmount*1||0}</span>
                                    </div>
                                    <div className={style.txwz}>
                                        <span>可提现金额：</span>
                                        <span>{this.state.select.extractable*1||0}</span>
                                    </div>
                                    <div className={style.txwz}>
                                        <span>提现手续费：</span>
                                        <span>{this.state.fee}</span>
                                    </div>
                                </div>
                                <FormItem
                                style={{marginTop:"20px"}}
                                >
                                    {getFieldDecorator('capitalPwd', {
                                        rules: [{
                                            required:true,
                                            message:"请输入资金密码"
                                        }],
                                    })(
                                        <Input placeholder="请输入资金密码"  />
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
    let { loading,currencyAndAddress } = state.otherPresent
    let { userInfo = {} } = state.user
    return {
        currencyAndAddress,
        userInfo,
        loading,
        ...props,
    }
})(Form.create()(otherPresent));