import React, { Component, PropTypes } from 'react';
import style from '../asset/asset.less'
import { Row, Col, Select, Alert, Spin, Icon } from 'antd';
import { connect } from 'dva';
import Recharge from './Recharge';
import Entrust from './entrust';
const Option = Select.Option;

/**
 * 记录查询
 */
class Record extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftMenu: ["充提币记录", "委托查询"]
        }

    }
    componentWillMount = () => {

    }
    callback = (key) => {
        console.log(key)
    }
    //左边menu点击事件
    leftMenuClick = (men) => {
        this.props.dispatch({
            type: 'record/save',
            payload: {
                currentSelect: men
            }
        })
    }
    render() {
        return (
            <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <div className={style.accounContent}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={5}>
                            <div className={style.gutter_letft}>
                                <div className={style.left_card}>
                                    {this.state.leftMenu.map((item, index) => {
                                        let _style = style.left_item;
                                        if (item === this.props.currentSelect) {
                                            _style = _style + " " + style.left_active;
                                        }
                                        return <div onClick={() => this.leftMenuClick(item)} className={_style} key={item}>{item}</div>
                                    })}
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={19}>
                            {this.props.currentSelect === "充提币记录" && <Recharge />}
                            {this.props.currentSelect === "委托查询" && <Entrust />}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    return {
        currentSelect: state.record.currentSelect,
        ...props
    }
})(Record);