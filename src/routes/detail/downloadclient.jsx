import React, { Component, PropTypes } from 'react';
import downloadclient_bg from '../../assets/yinghe/downloadclient/downloadclient_bg.png';
import downloadclient_computer from '../../assets/yinghe/downloadclient/downloadclient_computer.png';
import styles from './downloadclient.less';

/**
 * api文档下载
 */
class Downloadclient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currLanguage: "China"
        }
    }



    // 渲染
    render() {
        return (
            <div className={styles.root}>

                <div className={styles.content} style={{ padding: '0px 0px', background: '#f7f7f7' }}>
                    <div className={styles.center}>
                        <div className={styles.title}>帮助中心 > 常见问题</div>
                        <div className={styles.body}>
                            <div className={styles.img_content}>
                                <img className={styles.img_bg} src={downloadclient_bg} alt="" />
                                <img className={styles.img_co} src={downloadclient_computer} alt="" />
                                <div className={styles.text}>
                                    <div className={styles.text_h1}>客户端下载链接</div>
                                    <div className={styles.text_h2}>加入全世界最活跃的数字资 产交易平台</div>
                                </div>
                            </div>
                            <div>
                                <div style={{ textAlign: 'center', paddingTop: "65px" }}>
                                    <span className={styles.buttons + " " + styles.ios}>IOS</span>
                                    <span className={styles.buttons + " " + styles.and} style={{ marginLeft: "24px" }}>ANDROID</span>
                                </div>
                                <div style={{ textAlign: 'center', paddingTop: "10px" }}>
                                    <span className={styles.buttons + " " + styles.mac}>MAC OS</span>
                                    <span className={styles.buttons + " " + styles.win} style={{ marginLeft: "24px" }}>WINDOWS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Downloadclient;