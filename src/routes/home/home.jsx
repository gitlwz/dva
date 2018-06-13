import React from "react";
import { Radio, Carousel } from 'antd';
import { connect } from 'dva';
import styles from './home.less'
/**
 * 模块设置页面主题
 */
class Home extends React.Component {

    componentDidMount() {

    }

    render() {
        const { radioChange, handleOk } = this.props;
        return <div>
            <Carousel autoplay>
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
            </Carousel>
            <div id="off" className={styles.play}>
                我自己会移动偏移我是推送过来的新闻广告费没了
            </div>
        </div>
    }
}

export default connect((state, props) => {
    return {

        props
    }
}, (dispatch, props) => {
    return {
        handleOk: () => {
            dispatch({
                type: 'kineApp/save',
                payload: {
                    visible: false
                }
            })
        },
        radioChange: (e) => {
            dispatch({
                type: 'kineApp/save',
                payload: {
                    theme: e.target.value
                }
            })
        }
    }

})(Home)