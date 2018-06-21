import React from "react";
import { Button } from 'antd';
import UploadComponent from '../components/upload';

import { connect } from 'dva';
/**
 * 模块设置页面主题
 */
class Text extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            img: ''
        }
    }

    componentDidMount() {

    }

    render() {
        const { radioChange, handleOk } = this.props;
        return <UploadComponent callback={(data, img) => this.setState({ img })}>
            <Button>上传</Button>
            <img src={this.state.img} />
        </UploadComponent>
    }
}

export default connect((state, props) => {
    return {

        props
    }
}, (dispatch, props) => {
    return {

    }

})(Text)