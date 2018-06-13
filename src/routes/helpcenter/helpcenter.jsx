import React, { Component, PropTypes } from 'react';
import styles from './helpcenter.less';
import { Input } from 'antd';
const Search = Input.Search;
/**
 * 帮助中心
 */
class HelpCenter extends Component {
    constructor(props) {
        super(props);
        
    }
    componentWillMount = () => {
        
    }
    render() {
        return (
            <div style={{backgroundColor:"#F7F7F7"}}>
                <div className={styles.body}>
                    <div className={styles.left}>
                        <div className={styles.left_content}>
                            <div>
                                1222222222
                            </div>
                        </div>
                    
                    
                    </div>
                    <div className={styles.right}>
                        <div className={styles.searchcontent + " searchcontent"}>
                            <Search
                                placeholder="输入搜索内容"
                                onSearch={value => console.log(value)}
                                enterButton
                            />
                        </div>

                        <div className={styles.right_content}>
                            <div className={styles.right_item}>
                                <span>如何将小额资产兑换为</span>
                            </div>
                            <div className={styles.right_item}></div>
                            <div className={styles.right_item}></div>
                            <div className={styles.right_item}></div>
                            <div className={styles.right_item}></div>
                            <div className={styles.right_item}></div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default HelpCenter