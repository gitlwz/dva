import React, { Component } from "react"

import styles from './YHTable.less';

class YHTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    loadDataSource() {
        let { columns, dataSource, total } = this.props;
        let trs = [];
        //解决数组重复问题,改bug不知道什么原因导致,待研究
        dataSource = [...new Set(dataSource)]
        if (total) {
            if (dataSource && dataSource.length > 0) {
                dataSource.push(total)
            }
        }
        for (let i = 0; i < dataSource.length; i++) {
            var tr = [];
            for (let j = 0; j < columns.length; j++) {
                if (!!columns[j].render) {
                    tr.push(<td key={dataSource[i].instrumentId + columns[j].title}>{columns[j].render(dataSource[i], i)}</td>)
                } else {
                    tr.push(<td key={dataSource[i].instrumentId + columns[j].title}>{dataSource[i][columns[j].dataIndex]}</td>)
                }
            }
            trs.push(<tr key={dataSource[i].instrumentId}>{tr}</tr>)

        }
        return trs;
    }

    loadColumns() {
        if (this.props.columns.length > 0) {
            return this.props.columns.map((data, index) => {
                return <th style={{ minWidth: 80 }} key={data.dataIndex}>{data.title}</th>
            })
        }
    }
    render() {
        return <div className={styles.table}>
            <table style={{ cellspacing: 0, cellpadding: 0, border: 0 }}>
                <tbody>
                    <tr>{this.loadColumns()}</tr>
                    {this.loadDataSource()}
                </tbody>
            </table>
        </div>
    }
}

YHTable.defaultProps = {
    columns: [],
    dataSource: []
};

export default YHTable;