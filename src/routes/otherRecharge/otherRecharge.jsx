import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import style from './otherRecharge.less'

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
                            <Input value={this.props.AddressValue} disabled placeholder="充值地址" />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default connect((state, props) => {
    let {AddressValue} = state.otherRecharge
    return {
        AddressValue,
        ...props,
    }
})(OtherRecharge);