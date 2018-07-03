import React, { Component } from 'react';
import { Modal, Icon,Button } from 'antd';
import "./index.less";
class QDModal extends Component {
	static defaultProps = {
		visible: false,		//是否显示
		title:"title",		//title
		okText:"确认",		//确认文字
		cancelText:"取消", //取消文字
		onOk:()=>{}	,//	 确认事件回调
		onCancel :()=>{},  // 取消事件回调

		width:520  //宽度
	};
	constructor(props){
		super(props);
	}
	close = () =>{
		this.props.onCancel();
	}
	onOk = () =>{
		this.props.onOk();
	}
	render() {
		return (
			<div>
				<Modal
					visible={this.props.visible}
					closable={false}
					wrapClassName={"QDModal"}
					footer={null}
					width={this.props.width}
				>
					<div className="qd-title">
						<div className="qd-title-text">
							{this.props.title}
						</div>
						<div onClick={this.close} className="qd-close">
							<Icon className="qd-icon" type="close" />
						</div>
					</div>
					<div className="qd-content">
						{this.props.children}
					</div>
					<div className="qd-footer">
						<Button onClick={this.close} >{this.props.cancelText}</Button>
						<Button onClick={this.onOk} style={{marginLeft:"20px"}} type="primary">{this.props.okText}</Button>
					</div>
				</Modal>
			</div>
		);
	}
}
export default QDModal;
