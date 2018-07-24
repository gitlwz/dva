import React from "react";
import { Button } from 'antd'
import flow2 from '../../../assets/fabi/flow2.png';
import flow3 from '../../../assets/fabi/flow3.png';
import { connect } from "dva";
import styles from './release.less';

//查看发布进度
class ReleaseResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            publishState: '1'
        }
    }

    componentWillMount() {
        let postersID = window.location.href.split("=")[1];
        if (postersID != undefined) {
            this.props.dispatch({
                type: 'release/findBiddingPostersByPostersID',
                payload: {
                    postersID: [postersID],
                    callback: (res) => {
                        this.setState({ publishState: res.postersStatus })
                    }
                }
            })
        }
    }

    jumpTo() {
        this.props.history.push("/orderManager?key=2")
    }

    //渲染审核界面
    loadPublishContent(publishState) {
        switch (publishState) {
            case '0':
                return (
                    <div className={styles.result}>
                        <img src={flow2} />
                        <div> 审核中...</div>
                        <Button onClick={() => this.jumpTo()}>我的发布</Button>
                    </div>)
                break;
            case '1':
                return (
                    <div className={styles.result}>
                        <img src={flow3} />
                        <div > 审核成功</div>
                        <Button onClick={() => this.jumpTo()}>我的发布</Button>
                    </div>)
                break;
            case '3':
                return (
                    <div className={styles.result}>
                        <img src={flow3} />
                        <div > 审核失败</div>
                        <Button onClick={() => this.jumpTo()}>我的发布</Button>
                    </div>)

                break;
            //default: return this.loadPublish();
        }
    }



    render() {
        let postersID = window.location.href.split("=")[1];
        return (
            <div style={{ background: "#F4F4F4" }}>
                <div className={styles.root}>
                    <div className={styles.header}>
                        <div className={styles.wyfb}>我要发布</div>
                        <div className={styles.wan}>认证的信息越完善，审核的速度越快哦</div>
                    </div>
                    {this.loadPublishContent(this.state.publishState)}
                </div>
            </div>
        )
    }
}

export default connect()(ReleaseResult);