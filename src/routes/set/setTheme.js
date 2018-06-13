import React from "react";
import { Radio } from 'antd';
import { connect } from 'dva';
import MyModal from '../../components/Modal'

/**
 * 模块设置页面主题
 */
class ThemeSet extends React.Component {
    render() {
        const { radioChange, handleOk } = this.props;
        return <MyModal visible={this.props.visible} title="设置" handleOk={handleOk} handleCancel={handleOk}>
            <p>主题</p>
            <Radio.Group onChange={radioChange} value={this.props.theme}>
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
        handleOk: () => {
            dispatch({
                type: 'app/save',
                payload: {
                    visible: false
                }
            })
        },
        radioChange: (e) => {
            dispatch({
                type: 'app/save',
                payload: {
                    theme: e.target.value
                }
            })
        }
    }

})(ThemeSet)