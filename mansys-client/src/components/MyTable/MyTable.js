import { Empty, Table, Spin, Checkbox } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { isNil } from "lodash";
const MyTable = (props) => {
    const { isLoading = true, dataSource, columns } = props
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPagesize] = useState();
    const locale = {
        emptyText: isLoading ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="đang tải ..." /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu" />
    };
    const changePageSize = (page, pageSize) => {
        setPagesize(pageSize);
        setPage(page);
    };
    const pagination = {
        defaultPageSize: 5,
        pageSizeOptions: [5, 10, 20],
        current: page,
        total: totalRecords,
        pageSize: pageSize,
        onShowSizeChange: changePageSize,
        onChange: setPage,
        showTotal: (total, range) => `${total} Kết quả`,
    };
    return (
        <Table
            style={{ paddingTop: "1rem" }}
            dataSource={dataSource}
            columns={columns}
            loading={isLoading ? { indicator: <Spin spinning={isLoading} indicator={<LoadingOutlined spin />} /> } : false}
            pagination={pagination}
            locale={locale}
        />
    )
}
export default MyTable;