import React, { Component, PropTypes } from 'react';
import { Carousel, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
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
    loadBanner() {
        if (this.props.imgList.length > 0) {
            return this.props.imgList.map(item => {
                return <div style={{ width: '100%' }} key={item.id}><img src={decodeURI(item.postPhoto)} style={{ width: '100%', height: '100%' }} /></div>
            })
        }
    }


    loadCarousel(noticeList, name) {
        if (!!noticeList) {
            let data = noticeList[name];
            if (!!data && data.length > 0) {
                return data.map(item => {
                    return <div key={item.msgID} style={{ color: 'white', lineHeight: "60px", textAlign: 'center' }} onClick={() => this.props.dispatch(routerRedux.push("/Platform?msgID=" + item.msgID))}>{item.msgTitle}</div>
                })
            }
        }
    }

    // 渲染
    render() {
        const { noticeList } = this.props;
        return (
            <div>

                <Carousel autoplay autoplaySpeed={5000}>
                    {this.loadBanner()}
                </Carousel>

                <div style={{ background: 'rgba(35,35,35,1)' }}>
                    <Row type="flex" justify="space-around" align="middle" style={{ fontSize: 14, color: '#CDCDCD', height: 60 }}>
                        <Col span={8}>
                            <Carousel autoplay autoplaySpeed={4000} vertical dots={false} className={styles.carousel}>
                                {this.loadCarousel(noticeList, "left")}
                            </Carousel>
                        </Col>
                        <Col span={8}>
                            <Carousel autoplay={true} autoplaySpcentereed={4000} vertical dots={false} className={styles.carousel}>
                                {this.loadCarousel(noticeList, "center")}
                            </Carousel></Col>
                        <Col span={8}>
                            <Carousel autoplay autoplaySpeed={4000} vertical dots={false} className={styles.carousel}>
                                {this.loadCarousel(noticeList, "right")}
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
        imgList: state.app.imgList,
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
        dispatch
    }
})(YingHe);