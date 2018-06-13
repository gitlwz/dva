import React from 'react';
import { Button, Modal, Form, Input, message, Row, Col, Checkbox, Icon } from "antd";
import { connect } from 'dva';
import styles from './login.less'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            captcha: `http://192.168.100.180:8080/wxtoken/captcha?d=` + new Date().getTime(),
            userName: 'user',
            password: '12345678',
            verification_code: ''
        }
    }


    componentDidMount() {
        this.props.dispatch({
            type: 'user/getCaptcha'
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'user/login',
                    payload: values
                })
            } else {
                message.error("请正确输入!")
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className={styles.main} >
                    <Row>
                        <Col>
                            <h2 style={{ fontSize: '28px', marginTop: "100px" }}>数交在线业务管理系统</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item >
                                    {getFieldDecorator('userName', {
                                        initialValue: this.state.userName,
                                        rules: [{ required: true, message: '请输入您的用户名!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                        )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        initialValue: this.state.password,
                                        rules: [{ required: true, message: '请输入您的密码!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                        )}
                                </Form.Item>
                                <Form.Item>
                                    <Row>
                                        <Col span={12}>
                                            {getFieldDecorator('verification_code', {
                                                rules: [{ required: true, message: '请输入验证码!' }],
                                            })(
                                                <Input />
                                                )}
                                        </Col>
                                        <Col span={12}>
                                            <img src={this.state.captcha} style={{ width: 80, height: '30px' }} onClick={() => this.setState({ captcha: `http://192.168.100.180:8080/wxtoken/captcha?d=` + new Date().getTime() })} />
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                        登陆
                                  </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
    return { props }
})(Form.create()(Login));