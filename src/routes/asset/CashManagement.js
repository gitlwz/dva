import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Button,Checkbox, Row, Col,Collapse ,Icon ,Popover,message } from 'antd';
import style from './asset.less';
import styleA from './CashManagement.less';
import copy from 'copy-to-clipboard';
const QRCode = require('qrcode.react');

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
        this.state = {
            check:{}

        }
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
    //立即生效
    comeClick = (key) => {
        this.props.dispatch({
            type: 'asset/createAddress',
            payload: {
                params:[key]
            }
        })
    }
    //生成二维码
    qrCodeContent = (code) => {
        return(
            <div>
                <QRCode size={150} value={code}/>
            </div>
        )
    }
    //复制
    copy = (code) =>{
        copy(code);
        message.success('复制成功！');
    }
    //是否显示二维码
    qrCode = (address,key) =>{
        if(!!address[0]){
            let item = address[0];
            return (
                    <div>
                        <span>{item.address}</span>
                        <div className={styleA.qrCode}>
                            <span className={styleA.iconCode}>
                                <Popover content={this.qrCodeContent(item.address)} title={item.currency +"二维码"}>
                                    <Icon style={{fontSize:"24px"}} type="qrcode" />
                                </Popover>
                            </span>
                            
                            <span onClick={()=>this.copy(item.address)} style={{paddingLeft:"12px"}} className={styleA.iconCode}>
                                <Icon style={{verticalAlign:"top",marginTop:"5px"}} type="right" />
                                <span style={{verticalAlign:"top",marginTop:"5px",paddingLeft:"4px"}}>点击复制</span>
                            </span>
                        </div>
                       
                    </div>
            )
        }

        return(
            <span onClick={()=>this.comeClick(key)} className={styleA.link}>立即生效</span>
        )
    } 
    //其他货币充值地址
    otherAddress = (QBotherAddress) => {
        let html = [];
        for(let key in QBotherAddress){
            html.push(
                <Row key={key} className={styleA.row}>
                    <Col span={5} className={styleA.row_title}>{key}</Col>
                    <Col span={19}>
                        {this.qrCode(QBotherAddress[key],key)}
                    </Col>
                </Row>
            )
        }
        return html;
    }
    //绑定其他货币提现地址
    TXotherAddress = (TXotherAddress) => {
        let html = [];
        for(let key in TXotherAddress){
            html.push(
                <Panel header={this.PanelTitle(key,this.props.currentCollapse)} key={key} style={customPanelStyle}>
                    <p>
                        {this.TXotherAddressCheck(TXotherAddress[key],key)}
                        <Button onClick={()=>this.bindClick(key)} className="asset_btn tx_btn" type="primary">立即绑定</Button>
                    </p>
                </Panel>
            )
        }
        return html;
    }
    //立即绑定
    bindClick = (key) =>{
        this.props.history.push("/bindingAddress/"+key)
    }
    TXotherAddressCheck = (list,key) =>{
        if(list.length > 0){
            let _checked = this.state.check;
            let _allChecked = false;
            if(!!_checked[key]){
                _allChecked = _checked[key].all;
            }
            return (
                <div style={{paddingLeft:"10px"}}>
                    {list.map((item)=>{
                        let itemChcked = false;
                        if(!!_checked[key]){
                            itemChcked = _checked[key][item.id];
                        }
                        return(
                            <div key={item.id} style={{marginBottom:"10px"}}>
                                <Checkbox checked={itemChcked} onChange={(e)=>this.AllCheck(key,e.target.value,e.target.checked)} value={item.id}>
                                    <span>{item.addressRemark}</span>
                                    <span style={{paddingLeft:"14px"}}>{item.address}</span>
                                </Checkbox>
                            </div>
                        )
                    })}
                    <div style={{marginBottom:"10px"}}>
                        <Checkbox checked={_allChecked} value={key} onChange={(e)=>this.AllCheck(key,'all',e.target.checked)}>
                            <span>{"全选"}</span>
                        </Checkbox>
                    </div>
                </div>
            )
        }
        return null;
    }   
    AllCheck = (key,value,checked) =>{
        let check = this.state.check;
        if(!check[key]){
            check[key] = {};
        }
        if(value === "all"){
            check[key].all = checked;
            this.props.TXotherAddress[key].forEach((ele)=>{
                check[key][ele.id] = checked;
            })
        }else if(value !== "all"){
            check[key][value] = checked;
            if(!checked){
                check[key].all = false;
            }else{
                let arrkey = [];
                for(let _key in check[key]){
                    if(_key !== "all" && check[key][_key] === true){
                        arrkey.push(_key)
                    }
                }
                if(arrkey.length === this.props.TXotherAddress[key].length){
                    check[key].all = true;
                }
            }
        }
        this.setState({
            check
        })
    }
    render() {
        return (
            <div style={{  paddingTop: '53px' }}>
                <div className={style.right_title}>
                    
                </div>
                <div style={{fontSize:"20px",marginTop:"100px"}}>
                    内测阶段暂不开放！
                </div>
                {/* <div className={style.right_bz}>
                    <div className={styleA.card}>
                        <div className={styleA.card_title}>绑定银行卡</div>
                        <Button className="asset_btn" type="primary">暂未开放</Button>
                    </div>
                    <div className={styleA.card}>
                        <div className={styleA.card_title}>其他货币充值地址</div>
                        <div className={styleA.card_content}>
                            <Row>
                                <Col span={5} className={styleA.row_title}>其他货币充值地址</Col>
                                <Col span={19}></Col>
                            </Row>
                            {this.otherAddress(this.props.QBotherAddress)}
                                    
                        </div>
                    </div>
                    <div className={styleA.card}>
                        <div className={styleA.card_title}>绑定其他货币提现地址</div>
                        <Collapse bordered={false} accordion onChange={this.CollapseChange}>
                            {this.TXotherAddress(this.props.TXotherAddress)}
                        </Collapse>
                    </div>
                </div> */}
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