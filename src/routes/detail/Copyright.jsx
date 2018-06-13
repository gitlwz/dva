import React, { Component, PropTypes } from 'react';
import NationTitle from '../../components/nationTitle';
import styles from './joinus.less';
import { copyright, privacy, userAgreement, application } from '../../dataJson/userData';

/**
 * 法律说明 上市申请  用户协议 隐私条款
 */
class Copyright extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refrsh: 1
        }
    }
    componentWillMount = () => {
        // window.onhashchange = () => {
        //     this.setState({
        //         refrsh: this.state.refrsh++
        //     })
        //     document.body.scrollTop = document.documentElement.scrollTop = 0;
        // }
    }
    render() {
        let falg = false;
        let hash = this.props.location.search;
        let data = {}
        if (hash == "?copyright") {
            data = copyright;
        } else if (hash == "?privacy") {
            data = privacy;
        } else if (hash == "?userAgreement") {
            data = userAgreement;
        } else if (hash == "?application") {
            data = application;
            data.title = "上市申请"
            falg = true;
        }
        return (


            <div>
                <NationTitle title={data.title} />
                <div className={styles.body}>
                    {!falg ? <div className={styles.item}>
                        <div className={styles.content} style={{ backgroundColor: "transparent" }}>
                            <pre style={{ fontSize: '16px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                {data.content}
                            </pre>
                        </div>
                    </div> : null}
                    {!!falg ? data.map((item, index) => {
                        return (
                            <div className={styles.item} key={index}>
                                <div className={styles.application}>
                                    {item.title}
                                </div>
                                <div className={styles.content} style={{ backgroundColor: "transparent" }}>
                                    <pre style={{ fontSize: '16px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                        {item.content}
                                    </pre>
                                </div>
                            </div>
                        )
                    }) : null}
                </div>
            </div>

        )
    }
}

export default Copyright