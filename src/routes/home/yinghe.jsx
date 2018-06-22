import React, { Component, PropTypes } from 'react';
import { Carousel, Row, Col } from 'antd';
import { connect } from 'dva';
import Home from './home';

import styles from './yinghe.less';

/**
 * 模块:赢和超腾主页
 * 创建时间:2018-5-24
 * 创建人:席坤
 */
class YingHe extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.findAllSlideshow();
        this.props.findPushNotice();
    }

    //加载轮播图
    // loadBanner() {
    //     if (this.state.currLanguage == "China") {
    //         return <Carousel autoplay autoplaySpeed={5000}>
    //             <div> <img src={Chinalogo} style={{ width: '100%' }} /></div>
    //             <div> <img src={EnglishLogon} style={{ width: '100%' }} /></div>
    //         </Carousel>
    //     } else {
    //         return <Carousel autoplay autoplaySpeed={5000}>
    //             <img src={EnglishLogon} style={{ width: '100%' }} />
    //         </Carousel>
    //     }
    // }

    loadCarousel(noticeList, name) {
        if (!!noticeList) {
            let data = noticeList[name];
            if (!!data && data.length > 0) {
                return data.map(item => {
                    <div key={item.msgID}>{item.msgTitle}</div>
                })
            }
        }
    }

    // 渲染
    render() {
        const { noticeList } = this.props;
        console.log(noticeList)
        return (
            <div>
                <div style={{ width: '100%', height: 100 }}></div>
                <div style={{ background: 'rgba(35,35,35,1)' }}>
                    <Row type="flex" justify="space-around" align="middle" style={{ fontSize: 14, color: '#CDCDCD', height: 60 }}>
                        <Col span={8}>
                            <Carousel autoplay autoplaySpeed={4000} vertical dots={false}>
                                {this.loadCarousel(noticeList, "left")}
                            </Carousel>
                        </Col>
                        <Col span={8}>
                            <Carousel autoplay={true} autoplaySpeed={4000} vertical dots={false}>
                                <div>邀请好友注册，轻松享受50%返佣</div>
                            </Carousel></Col>
                        <Col span={8}>
                            <Carousel autoplay autoplaySpeed={4000} vertical dots={false}>
                                <div>邀请好友注册，轻松享受50%返佣</div>
                                <div>赢和点卡功能震撼上线，等价USDT，现开放购买，优惠多多</div>
                            </Carousel></Col>
                    </Row>
                </div>

                <div style={{ padding: '30px 0px', background: '#f7f7f7', display: 'flex', justifyContent: 'center' }}>
                    <Home />
                </div>

            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        noticeList: state.other.noticeList,
        props
    }
}, (dispatch) => {
    return {
        findAllSlideshow: () => {
            dispatch({
                type: 'app/findAllSlideshow',
                payload: []
            })
        },
        findPushNotice: () => {
            dispatch({
                type: 'other/findPushNotice'
            })
        },
    }
})(YingHe);