import React from "react";
import { Pagination, Table } from "antd";
import { useState } from "react";

export const PaginatedTable = ({ columns, page, pageSize, totalRows, data, pageChange, pageSizeChange ,paginationClassName }) => {
    
  const handleChangePage = (page) => {
      pageChange(page, pageSize)
    };

    const handlePageSizeChange = (current, size) => {
      if(current != size)
        pageSizeChange(size)
    }
  
    const renderPagination = () => (
      <div className="paginated-table-pagination-container">
        <Pagination
        className={paginationClassName || "paginated-table-pagination--center"}
        current={page}
        total={totalRows}
        pageSize={pageSize}
        onChange={handleChangePage}
        onShowSizeChange={handlePageSizeChange}
      />
      </div>
    );
  
    return (
      <div>
        <Table
          className="paginated-table-table--block"
          dataSource={data}
          columns={columns}
          pagination={false}
        />
        {renderPagination()}
      </div>
    );
  };
  
  export default PaginatedTable;