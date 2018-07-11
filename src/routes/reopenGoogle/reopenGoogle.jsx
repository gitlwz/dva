import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Input,message,Popover,Button ,Spin } from 'antd';
import copy from 'copy-to-clipboard';
import style from './reopenGoogle.less'
const QRCode = require('qrcode.react');
/**
 * 资产管理
 */
class reopenGoogle extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount = () =>{
        this.findCode();
    }
    findCode = () =>{
        if(!this.props.match.params.name){
            message.warning("请先登录账号！")
            return;
        }
        this.props.dispatch({
            type: 'reopenGoogle/gooleCheckBegin',
            payload: {
                params:[this.props.match.params.name]
            }
        })
    }
    //生成二维码
    qrCodeContent = (code) => {
        return(
            <div onClick={()=>this.findCode()} style={{cursor:"pointer"}}>
                <QRCode size={150} value={code || ""}/>
            </div>
        )
    }
    opentClick = () =>{
        if(!this.refs.input.input.value){
            this.props.dispatch({
                type: 'reopenGoogle/save',
                payload: {
                    error:{
                        show:true,
                        text:"请输入验证码！"
                    }
                }
            })
            return;
        }
        this.props.dispatch({
            type: 'reopenGoogle/gooleCheckOver',
            payload: {
                params:[this.props.match.params.name,this.refs.input.input.value]
            }
        })
    }
    inputOnchange = (e) => {
        if(!!e.target.value){
            this.props.dispatch({
                type: 'reopenGoogle/save',
                payload: {
                    error:{
                        show:false,
                        text:""
                    }
                }
            })
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: "#F7F7F7", color: "black" }}>
            <Spin spinning={this.props.loading} size="large" >
                <div className={style.content}>
                    <div className={style.title}>
                        开启谷歌两步验证
                    </div>
                    <div className={style.header}>
                        <div className={style.header_text}>
                            下载APP
                        </div>
                        <div>
                            <div className={style.imgIcon1}></div>
                            <div className={style.imgIcon2}></div>
                        </div>
                    </div>
                    <div className={style.detail}>
                        <div className={style.header_text +" " +style.header_tex2}>
                            扫描二维码
                        </div>
                        <div className={style.detail_content}>
                            <div className={style.detail_left}>
                                {this.qrCodeContent(this.props.gooleCheck.qrCode)}
                                <div className={style.detail_left_footer}>使用谷歌验证器APP扫描该二维码</div>
                            </div>
                            <div className={style.detail_right}>
                                <div>
                                    {this.props.gooleCheck.secret}
                                </div>
                                <div>
                                    如果您无法扫描二维码
                                </div>
                                <div>
                                    可以将该16位秘钥手动输入到谷歌验证APP中
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={style.header_text +" " +style.header_tex3}>
                                填写动态码
                            </div>
                            <div className="reopenGoogle2">
                                <Input onChange={this.inputOnchange} ref="input"  placeholder="请输入谷歌动态密码" />
                                {this.props.error.show?<div className={style.error}>{this.props.error.text}</div>:null}
                            </div>
                        </div>
                        <div className="reopenGoogle">
                            <Button onClick={this.opentClick}  type="primary">开启谷歌验证</Button>
                        </div>
                    </div>
                    
                </div>
                </Spin>
            </div>

        )
    }
}
export default connect((state, props) => {
    let {gooleCheck,error,loading} = state.reopenGoogle
    return {
        loading,
        gooleCheck,
        error,
        ...props,
    }
})(reopenGoogle);