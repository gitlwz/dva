import React, { Component, PropTypes } from 'react';
import style from './asset.less'
import { Row, Col, Select, Alert, Spin, Icon } from 'antd';
import AssetView from './AssetView';
import Recharge from '../recordSearch/Recharge';
import CashManagement from './CashManagement';
import { connect } from 'dva';
import language from '../../language'
const Option = Select.Option;
/**
 * 资产管理
 */
class Asset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftMenu: [language.ZCZL, language.asset.CTBGL, "充提币记录"]
        }

    }
    componentWillMount = () => {

        this.props.dispatch({
            type: 'asset/findByUserID'
        })
        this.props.dispatch({
            type: 'user/getUserId'
        })
    }
    callback = (key) => {
        console.log(key)
    }
    //左边menu点击事件
    leftMenuClick = (men) => {
        this.props.dispatch({
            type: 'asset/selectMenu',
            payload: {
                currentSelect: men
            }
        })
    }
    render() {

        return (
            <Spin size="large" spinning={this.props.loading} >
                <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>

                    <div className={style.accounContent}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                <div className={style.gutter_letft}>
                                    <div className={style.left_card}>
                                        <div className={style.nav_title}>{language.ZCGL}</div>
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
                            <Col className="gutter-row" span={18}>
                                {this.props.currentSelect === language.ZCZL && <AssetView key="1" history={this.props.history} />}
                                {this.props.currentSelect === "充提币记录" && <Recharge key="2" history={this.props.history} />}

                                {this.props.currentSelect === language.asset.CTBGL && <CashManagement key="3" history={this.props.history} />}

                            </Col>
                        </Row>
                    </div>
                </div>
            </Spin>

        )
    }
}
export default connect((state, props) => {
    let { userInfo = {} } = state.user
    return {
        ...state.asset,
        ...props,
        userInfo
    }
})(Asset);