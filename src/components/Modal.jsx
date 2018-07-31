import React from 'react';
import { Modal, Button } from 'antd';

class MyModal extends React.Component {

    loadMyModal() {
        const { visible, handleOk, handleCancel, title, type } = this.props;
        const modalContent = {
            title: title,
            content: (
                <div>
                    {this.props.children}
                </div>
            ),
            onOk: () => {
                handleOk();
            },
        }
        switch (type) {
            //提示
            case "info":
                return Modal.info({ ...modalContent });
                break;
            //成功
            case "success":
                return Modal.success({ ...modalContent });
                break;
            //错误
            case "error":
                return Modal.error({ ...modalContent });
                break;
            //警告
            case "warning":
                return Modal.warning({ ...modalContent });
                break;
            //弹出Modal
            default:
                return <Modal
                    closable={false}
                    title={title}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    {this.props.children}
                </Modal>
                break;
        }
    }

    render() {
        return (
            <div>
                {this.loadMyModal()}
            </div>
        );
    }
}

export default MyModal
