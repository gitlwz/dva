import React from 'react';
import { Table } from "antd";

const MyTable = ({ columns, rowKey, dataSource, loading, pageNum, selectedRowKeys, pageNumOnchange, rowKeysOnchange }) => {

  //行选择事件
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      rowKeysOnchange(selectedRowKeys)
    }
  };

  //分页
  const pagination = {
    total: dataSource.length,
    current: pageNum,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => {
      return (<div>共{total}条</div>);
    },
    onShowSizeChange: (page, pageSize) => {
      // queryData(page, pageSize);
    },
    onChange: (page, pageSize) => {
      pageNumOnchange(page)
    }
  }

  return (
    <Table rowKey={record => record[rowKey]} bordered={true} columns={columns} dataSource={dataSource} rowSelection={rowKeysOnchange ? rowSelection : null}
      loading={loading} pagination={pageNumOnchange ? pagination : false} />
  );
};

MyTable.propTypes = {
};

export default MyTable;
