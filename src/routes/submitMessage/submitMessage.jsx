import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, message, Select, Button, Spin, Radio, Row, Col } from 'antd';
import style from './submitMessage.less'
import UploadComponent from '../../components/upload';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option, OptGroup } = Select;
const InputGroup = Input.Group;
const Search = Input.Search;

/**
 * 资产管理
 */
class submitMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img1: null,
            data1: null,

            img2: null,
            data2: null,

            img3: null,
            data3: null,

            up: null
        }
    }
    upLoadCallBack = (data, img, index) => {
        switch (index) {
            case 1:
                this.setState({
                    img1: img,
                    data1:data.path
                })
                break;
            case 2:
                this.setState({
                    img2: img,
                    data2:data.path
                })
                break;
            case 3:
                this.setState({
                    img3: img,
                    data3:data.path
                })
                break;
            default:
                break;
        }

    }
    imgHover = (index) => {
        this.setState({
            up: index
        })
    }
    readLoad = (img, index) => {
        let _falg = false;
        if (this.state.up === index) {
            _falg = true;
        }
        return (
            <div onMouseOut={() => this.imgHover(null)} onMouseOver={() => this.imgHover(index)} className={_falg ? style.hoveImg : style.hoveImgFalse}>
                <img src={img} alt="" />
                <div className={_falg ? style.hoveImgtext : style.hoveImgtextFalse}>
                    重新上传
                </div>
            </div>)
    }
    handleConfirm = (rule, value, callback) =>{
        if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
            callback('请输入正确的身份证号！')
            return
        }
        callback()
    }
    //提交
    onSubmit = () =>{
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err,values)=>{
            if(!!err) return;
            if(!this.state.data1){
                message.error("请上传身份证正面！")
                return;
            }
            if(!this.state.data2){
                message.error("请上传身份证反面！")
                return;
            }
            if(!this.state.data3){
                message.error("请上传手持身份证照片！")
                return;
            }
            this.props.dispatch({
                type: 'submitMessage/authentication',
                payload: {
                    params: {
                        idFrontPhoto:this.state.data1,
                        idBackPhoto:this.state.data2,
                        selfCardPhoto:this.state.data3,
                        clientName:values.name,
                        gender:values.gender,
                        identificationID:values.idnumber,
                        identificationType:'1',
                        clientType:'1'
                    }
                }
            })
        })
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 24 },
                lg: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 24 },
                lg: { span: 18 },
            },
        };
        return (
            <div className="submitMessage" style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <Spin spinning={this.props.loading} size="large" >
                    <div className={style.content}>
                        <div className={style.title}>身份证验证</div>
                        <div className={style.detail}>
                            <div className={style.info}>提示：请准确填写以下信息，提交后无法更改</div>
                            <div className={style.form}>
                                <Form>
                                    <FormItem
                                        {...formItemLayout}
                                        label="姓名"
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                required: true,
                                                message:"请输入姓名"
                                            }],
                                        })(
                                            <Input placeholder="输入姓名" type="text" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="性别"
                                    >
                                        {getFieldDecorator('gender', {
                                            rules: [{
                                                required: true,
                                                message:"请选择性别"
                                            }],
                                        })(
                                            <RadioGroup style={{ textAlign: "center" }}>
                                                <Radio value="男">男</Radio>
                                                <Radio value="女">女</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="身份证号"
                                    >
                                        {getFieldDecorator('idnumber', {
                                            rules: [{
                                                required: true,
                                                validator: this.handleConfirm
                                            }],
                                        })(
                                            <Input placeholder="输入身份证号" type="text" />
                                        )}
                                    </FormItem>
                                </Form>
                                <Row>
                                    <Col {...{ xl: 24, xxl: 8 }} >
                                        <div className={style.update}>
                                            <UploadComponent callback={(data, img) => this.upLoadCallBack(data, img, 1)}>
                                                {!this.state.img1 ? <div className={style.icon}>
                                                    上传身份证正面
                                                 </div> : this.readLoad(this.state.img1, 1)}
                                            </UploadComponent>
                                        </div>
                                    </Col>
                                    <Col {...{ xl: 24, xxl: 8 }} >
                                        <div className={style.update}>
                                            <UploadComponent callback={(data, img) => this.upLoadCallBack(data, img, 2)}>
                                                {!this.state.img2 ? <div className={style.icon}>
                                                    上传身份证反面
                                                 </div> : this.readLoad(this.state.img2, 2)}
                                            </UploadComponent>
                                        </div>
                                    </Col>
                                    <Col {...{ xl: 24, xxl: 8 }} >
                                        <div className={style.update}>
                                            <UploadComponent callback={(data, img) => this.upLoadCallBack(data, img, 3)}>
                                                {!this.state.img3 ? <div className={style.icon}>
                                                    上传手持身份证照片
                                                 </div> : this.readLoad(this.state.img3, 3)}
                                            </UploadComponent>
                                        </div>
                                    </Col>
                                </Row>
                                <div style={{textAlign:"center",marginTop:"20px"}}>
                                    <Button onClick={this.onSubmit} className="hqbtn" style={{ height: '40px', width: '100%', color: "#565656" }} type="primary">提交</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { loading } = state.submitMessage
    let { userInfo = {} } = state.user
    return {
        userInfo,
        loading,
        ...props,
    }
})(Form.create()(submitMessage));