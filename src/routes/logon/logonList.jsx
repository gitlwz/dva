import React from 'react';
import { Button, Modal, Form, Input, message, Table } from "antd";
import MyTable from '../../components/Table';
import { connect } from 'dva';

class LoginList extends React.Component {

    componentWillMount() {
        this.props.dispatch({
            type: 'logon/queryLogonList',
            payload: ["2018-04-13", "2018-04-13", null]
        })
    }


    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                sorter: (a, b) => a > b
            }, {
                title: '操作人',
                dataIndex: 'loginId'
            }, {
                title: '操作人ip',
                dataIndex: 'logIP'
            },
            {
                title: '登陆时间',
                dataIndex: 'logTime'
            },
            {
                title: '操作类型',
                dataIndex: 'logType',
                render: (text, item) => {
                    switch (item.logType) {
                        case "1":
                            return <span>登陆</span>
                            break;

                        default:
                            break;
                    }
                }
            },
            {
                title: '操作内容',
                dataIndex: 'remark'
            }];

        return (
            <MyTable rowKey="id" columns={columns} dataSource={this.props.dataList} pageNum={this.props.pageNum} loading={this.props.loading} pageNumOnchange={page => {
                this.props.dispatch({
                    type: 'logon/save',
                    payload: {
                        pageNum: page
                    }
                })
            }} />
        )
    }
}

export default connect((state, props) => {
    return {
        dataList: state.logon.dataList,
        pageNum: state.logon.pageNum,
        loading: state.loading.models.logon,
        props
    }
})(LoginList);