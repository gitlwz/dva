import React from 'react';
import NationTitle from '../../components/nationTitle';
import styles from './yhrate.less';
import { connect } from 'dva';

/**
 * 费率说明
 */
class Rate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'other/queryRateList',
            payload: []
        })
        console.log(this.props.rateList)
    }
    render() {
        return (
            <div style={{ paddingBottom:"20px" }}>
                <NationTitle title="交易手续费" />
                <div className={styles.body}>
                    <div className={styles.title}>
                        <div>交易对</div>
                        <div>挂单</div>
                        <div>吃单</div>
                    </div>

                    {this.props.rateList.map(item => {
                        return <div className={styles.item} key={item.instrumentID}>
                            <div>{item.instrumentID}</div>
                            <div>{item.offsetFeeRate}%</div>
                            <div>{item.openFeeRate}%</div>
                        </div>
                    })}

                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        rateList: state.other.rateList,
        props
    }
})(Rate)
