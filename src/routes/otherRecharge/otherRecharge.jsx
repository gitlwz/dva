import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Input,message,Popover,Button } from 'antd';
import copy from 'copy-to-clipboard';
import style from './otherRecharge.less'
const QRCode = require('qrcode.react');
/**
 * 资产管理
 */
class OtherRecharge extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount = () =>{
        this.props.dispatch({
            type: 'otherRecharge/findFundAddress',
            payload: {
                params:[this.props.match.params.type,"1"]
            }
        })
    }
    //生成二维码
    qrCodeContent = (code) => {
        return(
            <div>
                <QRCode size={150} value={code || ""}/>
            </div>
        )
    }
    copy = (code) => {
        copy(code);
        message.success('复制成功！');
    }
    render() {
        return (
            <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
                <div className={style.content}>
                    <div className={style.title}>
                        其他货币充值
                    </div>
                    <div>
                        <div className={style.cztext}>
                            请充值 <span style={{color:"#FDCC39",fontWeight: "bold" }}>{this.props.match.params.type}</span> 到以下地址
                        </div>
                        <div className={"OtherRecharge"}>
                            <Input value={this.props.AddressValue.address} disabled placeholder="充值地址" />
                        </div>
                        <div onClick={()=>this.copy(this.props.AddressValue.address)} className={style.copy}>
                            复制地址
                        </div>
                        <br/>
                        <Popover content={this.qrCodeContent(this.props.AddressValue.address)} title={this.props.match.params.type +"二维码"}>
                            <div  className={style.copy}>
                                显示二维码
                            </div>
                        </Popover>
                        <br/>
                        <div  className={style._text}>
                            {this.props.match.params.type}充值到账需要至少20个区块确认（大约5-30分钟）
                        </div>
                        <div className="otherRecharge">
                            <Button onClick={()=>this.props.history.push("/asset")} type="primary">返回</Button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default connect((state, props) => {
    let {AddressValue} = state.otherRecharge
    console.log("*******8",AddressValue)
    return {
        AddressValue,
        ...props,
    }
})(OtherRecharge);