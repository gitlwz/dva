import React, { Component, PropTypes } from 'react';
import style from './asset.less'
import { Row, Col, Select ,Alert} from 'antd';
import AssetView from './AssetView';
import SecurityCenter from './SecurityCenter';
import CashManagement from './CashManagement';
import { connect } from 'dva';
const Option = Select.Option;

/**
 * 资产管理
 */
class Asset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftMenu: ["资产总览","安全中心","充提管理"]
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
            type: 'asset/selectMenu',
            payload: {
                currentSelect: men
            }
        })
    }
    render() {
        return (
            <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <div style={{display:this.props.topError?'black':"none"}} className={style.topError}>
                    请先完成邮箱验证
                </div>
                <div className={style.accounContent}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className={style.gutter_letft}>
                                <div className={style.left_card}>
                                    {this.state.leftMenu.map((item,index)=>{
                                        let _style = style.left_item;
                                        if(item === this.props.currentSelect){
                                            _style = _style + " " +style.left_active;
                                        }
                                        return <div  onClick={()=>this.leftMenuClick(item)} className={_style}>{item}</div>
                                    })}
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={16}>
                            <AssetView />
                            <SecurityCenter />
                            <CashManagement />
                        </Col>
                    </Row>
                </div>
            </div>

        )
    }
}
export default connect((state, props) => {
    return {
        ...state.asset,
        ...props
    }
})(Asset);