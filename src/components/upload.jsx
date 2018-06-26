import React from 'react';
import { Upload, message, Icon } from 'antd';

//统一上传组件
class UploadComponent extends React.Component {


    //把base64转成数据流供前段显示
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl => {
                //不管成功失败该数据流前段都可以显示,此处就上传成功显示
                if (info.file.response.errorCode == "0") {
                    this.props.callback(JSON.parse(info.file.response.data), imageUrl)
                } else {
                    message.error("上传失败")
                }
            });
        }
    }
    render() {
        return <Upload
            showUploadList={false}
            action="/sundax/upload/memberFileUploadService/uploadFileAllowAnonymous"
            onChange={this.handleChange}
            accept="image/*"
        >
            {this.props.children}
        </Upload>
    }
}

export default UploadComponent;