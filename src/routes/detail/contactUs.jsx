import React, { Component, PropTypes } from 'react';
import { message } from "antd"
import styles from './contactUs.less';
import { connect } from 'dva';
import UploadComponent from '../../components/upload';
import Validator from '../../tool/Validator';

/**
 * 联系我们
 */
const inputStyle = { backgroundColor: 'transparent', borderColor: '#3E3E3E' };

class ContactUs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errTip1: '',
      errTip2: '',
      errTip3: '',
      errTip4: '',
      questionShow: false,
      uploadShow: false,
      emailShow: false,
      textShow: false,
    }

  }

  componentDidMount() {
    this.props.dispatch({
      type: 'app/findAllQuestions',
      payload: []
    })
  }

  //提交
  submit = () => {
    this.setState({
      errTip1: this.props.questionParams.problemType == '' ? '请选择问题分类！' : '',
      errTip2: this.props.questionParams.problemPhoto == '' ? '请上传图片！' : '',
      errTip3: !Validator.email(this.props.questionParams.email) ? '请输入正确的邮箱！' : '',
      errTip4: this.props.questionParams.problemBody == "" ? '请添加问题描述！' : ''
    })
    if (this.props.questionParams.problemType && this.props.questionParams.problemPhoto && Validator.email(this.props.questionParams.email) &&  this.props.questionParams.problemBody) {
      //problemPhoto
      this.props.dispatch({
        type: 'app/customerProblems',
        payload: [this.props.questionParams]
      }, message.success("提交成功,我们的工作人员会及时和您联系"));
    }
  }

  //修改样式
  changeStyle(value, inputType) {
    if (value == '') {
      inputStyle.backgroundColor = 'transparent';
    }
    if (value != '') {
      inputStyle.backgroundColor = '#EBEBEB';
    }
    this.setState({
      questionShow: inputType == 'question' ? true : false,
      uploadShow: inputType == 'upload' ? true : false,
      emailShow: inputType == 'email' ? true : false,
      textShow: inputType == 'text' ? true : false,
    })
  }

  changeParams(params) {
    this.props.dispatch({
      type: 'app/save',
      payload: {
        questionParams: {
          ...this.props.questionParams,
          ...params
        }
      }
    })
  }

  upLoadCallBack = (data) => {
    this.changeParams({ problemPhoto: data.path })
    message.success("图片上传成功")
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: "30px 0px", minHeight: 700, overflow: 'scroll', background: '#f7f7f7' }}>
        <div style={{ display: 'flex', flexDirection: 'column', background: 'white' }}>
          <div style={{ width: '100%', height: '60px', background: '#FECC39', borderRadius: '10px', fontSize: "30px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>联系我们</div>
          <div className={styles.root}>
            <div style={{ marginRight: 50, position: "relative" }}>
              <div className={styles.title}>问题分类</div>
              <select
                className={styles.select} style={this.state.questionShow ? { ...inputStyle } : null}
                value={this.props.questionParams.problemType}
                onChange={e => { this.changeParams({ problemType: e.target.value }); this.changeStyle(e.target.value, 'question') }}
              >
                <option value="" key="">请选择问题分类</option>
                {this.props.questionList.map(item => {
                  return <option value={item} key={item} style={{ height: 40 }}>{item}</option>
                })}
              </select>
              <p style={{ color: '#FF4200', fontSize: '14px', marginTop: 10, position: 'absolute' }}>{this.state.errTip1}</p>
              <div className={styles.title} style={{ marginTop: 60 }}>添加附件</div>
              <div className={styles.uiUpload}>
                <UploadComponent callback={(data, img) => this.upLoadCallBack(data, img)}>
                  <div className={styles.upload}>
                    {this.props.questionParams.problemPhoto ? '重新上传' : '点击上传'}
                  </div>
                </UploadComponent>
              </div>
              <p style={{ color: '#FF4200', fontSize: '14px', marginTop: 10, position: 'absolute' }}>{this.state.errTip2}</p>
              <div className={styles.title} style={{ marginTop: 60 }}>邮件地址</div>
              <input
                style={this.state.emailShow ? { ...inputStyle } : null}
                value={this.props.questionParams.email || ''}
                onChange={e => { this.changeParams({ email: e.target.value }); this.changeStyle(e.target.value, 'email') }}
              />
              <p style={{ color: '#FF4200', fontSize: '14px', marginTop: 10, position: 'absolute' }}>{this.state.errTip3}</p>
            </div>
            <div style={{ position: 'relative' }}>
              <div className={styles.title}>问题描述</div>
              <textarea style={this.state.textShow ? { height: 335, padding: "20px", ...inputStyle } : { height: 335, padding: "20px" }} value={this.props.questionParams.problemBody} onChange={e => { this.changeParams({ problemBody: e.target.value }); this.changeStyle(e.target.value, 'text') }} />
              {
                this.state.errTip4 == '' ?
                  <div className={styles.title} style={{ fontSize: 16, color: '#565656', position: 'absolute' }}>请详细描述你的问题，我们的工作人员会及时与您联系。</div>
                  :
                  <p style={{ color: '#FF4200', fontSize: '14px', marginTop: 10, position: 'absolute' }}>{this.state.errTip4}</p>
              }
            </div>
          </div>
          <div style={{ textAlign: 'center', margin: '80px 0px' }}>
            <button onClick={() => this.submit()} style={{ fontSize: '16px' }}>确定</button>
          </div>

        </div>
      </div>
    )
  }
}

export default connect((state, props) => {
  return {
    questionList: state.app.questionList,
    questionParams: state.app.questionParams,
    resultFlag: state.app.resultFlag,
    props
  }
})(ContactUs);
