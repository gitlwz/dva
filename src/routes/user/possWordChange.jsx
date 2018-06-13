import React from 'react';
import { Button, Modal, Form, Input, message } from "antd";
import { connect } from 'dva';

class PossWordChange extends React.Component {


    handleOk(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <Modal
                title="修改密码"
                visible={this.props.visible}
                onOk={(e) => this.handleOk(e)}
                okText="确定"
                cancelText="取消"
                onCancel={() => this.props.handleCancel()}
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="原密码"
                    >
                        {getFieldDecorator('oldPossword', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: '请输入原密码!',
                            }],
                        })(
                            <Input />
                            )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="新密码"
                    >
                        {getFieldDecorator('newPossword', {
                            rules: [{ required: true, message: '请输入新密码!' }],
                        })(
                            <Input />
                            )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="确定密码"
                    >
                        {getFieldDecorator('isPossword', {
                            rules: [{
                                required: true, message: '请确定密码并和新密码一致!',
                            }],
                        })(
                            <Input />
                            )}
                    </Form.Item>
                </Form>
            </Modal>

        )
    }

}



function mapStateToProps(state, props) {

    return { props };
}
export default connect(mapStateToProps)(Form.create()(PossWordChange));