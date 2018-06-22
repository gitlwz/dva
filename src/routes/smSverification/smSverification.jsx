import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Input,message,Popover,Button ,Spin } from 'antd';
import style from './smSverification.less'
/**
 * 资产管理
 */
class smSverification extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount = () =>{

    }
   
    render() {
        return (
            <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <Spin spinning={this.props.loading} size="large" >
                    <div className={style.content}>
                        <div className={style.title}>
                            绑定手机验证
                        </div>
                        <div className={style.detail}>

                        </div>
                    </div>
                </Spin>
            </div>

        )
    }
}
export default connect((state, props) => {
    let {loading} = state.smSverification
    return {
        loading,
        ...props,
    }
})(smSverification);