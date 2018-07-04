import React from 'react';
import styles from './tabs.less'

export default class Tabs extends React.Component {

    loadTabs() {
        return this.props.tabList.map(item => {
            return <div key={item.title} className={styles.tabs} onClick={() => this.props.tabChange(item)}>
                <div style={{ height: 5, background: this.props.tab == item.title ? '#FDCC39' : '' }}></div>
                <div style={{ background: this.props.tab == item.title ? "#F5F5F5" : '' }}>{item.title}</div>
            </div>
        })
    }
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {this.loadTabs()}
            </div>
        )
    }
}