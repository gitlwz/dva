import React from "react";
import { Radio } from 'antd';
import { connect } from 'dva';
import MyModal from '../../components/Modal'

/**
 * 模块设置页面主题
 */
class ThemeSet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: props.theme
        }
    }
    render() {
        const { radioChange } = this.props;
        return <MyModal visible={this.props.visible} title="设置" handleOk={() => this.props.handleOk(this.state.theme)} handleCancel={() => this.props.handleOk(this.state.theme)}>
            <p>主题</p>
            <Radio.Group onChange={e => this.setState({ theme: e.target.value })} value={this.state.theme}>
                <Radio value="dark">黑色</Radio>
                <Radio value="white">白色</Radio>
            </Radio.Group>
        </MyModal>
    }
}

export default connect((state, props) => {
    return {
        visible: state.app.visible,
        theme: state.app.theme,
        props
    }
}, (dispatch, props) => {
    return {
        handleOk: (theme) => {
            dispatch({
                type: 'app/save',
                payload: {
                    theme: theme,
                    visible: false
                }
            })
        },
    }

})(ThemeSet)