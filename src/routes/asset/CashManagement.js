import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Row, Col,Collapse ,Icon  } from 'antd';
import style from './asset.less';
import styleA from './CashManagement.less';
const Panel = Collapse.Panel;
const customPanelStyle = {
    background:'rgba(255,255,255,1)',
    marginTop:'14px',
    overflow: 'hidden',
    border:'1px dashed  rgba(160,160,160,1)'
};
class CashManagement extends Component {

    constructor(props) {
        super(props);
    }
    componentWillMount = () => {
        this.props.dispatch({
            type: 'asset/findTraderFundAddress'
        })
    }
    //折叠面板按钮处理
    PanelTitle = (text,currentCollapse) =>{
        let btnText = "显示";
        let btnIcon = "down";
        let _style = {};
        if(text == currentCollapse){
            btnText = "隐藏";
            btnIcon = "up";
            _style = {background:'rgba(255,230,152,1)'}
        }
        return(
            <div style={{height:"22px"}}>
                <span>{text}</span>
                <span>
                    <Button style={_style} className="asset_btn title_btn" type="primary">
                        {btnText}
                        <Icon type={btnIcon} />
                    </Button>
                </span>    
            </div> 
        )
    }
    //折叠面板变化回调
    CollapseChange = (currentCollapse) =>{
        this.props.dispatch({
            type: 'asset/save',
            payload: {
                currentCollapse
            }
        })
    }
    render() {
        return (
            <div style={{ display: this.props.currentSelect == "充提管理" ? "block" : "none", paddingTop: '53px' }}>
                <div className={style.right_title}>
                    充提管理
                    <span className={style.zh}>727770481@qq.com</span>
                </div>
                <div className={style.right_bz}>
                    <div className={styleA.card}>
                        <div className={styleA.card_title}>绑定银行卡</div>
                        {/* <div className={styleA.card_content}>22222</div> */}
                        <Button className="asset_btn" type="primary">暂未开放</Button>
                    </div>
                    <div className={styleA.card}>
                        <div className={styleA.card_title}>其他货币充值地址</div>
                        <div className={styleA.card_content}>
                            <Row>
                                <Col span={10} className={styleA.row_title}>其他货币充值地址</Col>
                                <Col span={14}></Col>
                            </Row>
                            {Object.keys(this.props.QBotherAddress).map((ele, index) => {
                                return (
                                    <Row key={index} className={styleA.row}>
                                        <Col span={10} className={styleA.row_title}>{ele}</Col>
                                        <Col span={14}>
                                            <a className={styleA.link}>立即生效</a>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styleA.card}>
                        <div className={styleA.card_title}>绑定其他货币提现地址</div>
                        <Collapse bordered={false} accordion onChange={this.CollapseChange}>
                            {Object.keys(this.props.TXotherAddress).map((item,index)=>{
                                return(
                                    <Panel header={this.PanelTitle(item,this.props.currentCollapse)} key={item} style={customPanelStyle}>
                                        <p>
                                            <Button className="asset_btn tx_btn" type="primary">立即绑定</Button>
                                        </p>
                                    </Panel>
                                )
                            })}
                        </Collapse>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state, props) => {
    let { currentSelect, QBotherAddress,TXotherAddress,currentCollapse } = state.asset
    return {
        currentSelect,
        QBotherAddress,
        TXotherAddress,
        currentCollapse,
        ...props
    }
})(CashManagement);