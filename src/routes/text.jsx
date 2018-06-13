import React from "react";
import { Radio, Carousel } from 'antd';
import { connect } from 'dva';
/**
 * 模块设置页面主题
 */
class Text extends React.Component {

    componentDidMount() {

    }

    render() {
        const { radioChange, handleOk } = this.props;
        return <div>
            <Carousel autoplay>
                <div><h3>1测试</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
            </Carousel>
           
        </div>
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