import React from "react";
import styles from './release.less';
import { connect } from "dva";

//我要发布
class Release extends React.Component {
    render() {
        return (<div>我要发布</div>)
    }
}

export default connect()(Release);