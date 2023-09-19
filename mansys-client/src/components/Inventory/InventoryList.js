import React from "react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "../../styles/Contract.css";
import "../../styles/PaginatedTable.css";
import { PaginatedTable } from '../Commons/PaginatedTable'
import { showErrorMessage, formatCurrency } from '../../commons/utilities'
import { Row, Col, Select, DatePicker, Button, Input, Steps, Tabs } from "antd";
import { InventoryService } from "../../services/inventory-service";

const InventoryList = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    searchText: "",
    data: [],
    totalRows: 0,
    page: 1,
    pageSize: 10,
    isActive: true,
  });

  useEffect(() => {
    triggerFilter(filter.page, filter.pageSize, filter.searchText);
  }, []);

  const triggerFilter = async (page, pageSize, term) => {
    const filterResult = await InventoryService.filter(page, pageSize, term);
    if (filterResult.code >= 400) {
      showErrorMessage('An error is occurred while searching, please try again!')
      return
    }
    console.log(filterResult)
    setFilter({ ...filter, totalRows: filterResult.data.totalRows, data: [...filterResult.data.data] })
  }

  const pageChange = (page) => {
    setFilter({ ...filter, page });
    triggerFilter(page, filter.pageSize, filter.searchText);
  };

  const pageSizeChange = (pageSize) => {
    setFilter({ ...filter, pageSize });
    triggerFilter(filter.page, pageSize, filter.searchText);
  };

  const handleEdit = (record) => {
    // let path = `/edit_inventory/${record.id}`;
    // navigate(path);
    console.log("edit")
  };

  const handleDelete = async (record) => {
    if (!window.confirm("Do you want to delete this inventory?")) return;
    const deleteResult = await InventoryService.delete(record)
    if (deleteResult.code >= 400) {
      showErrorMessage('An error is occured while deleting, please try again!')
    } else {
      toast.success("Contract Deleted");
      setFilter({ ...filter, data: [...filter.data.filter(e => e.id != record.id)] })
    }
  };

  const columns = [
    { title: "Inventory ID", dataIndex: "id", key: "id" },
    { title: "Product ID", dataIndex: "productId", key: "productId" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Begin Balance", dataIndex: "beginBalance", key: "beginBalance" },
    { title: "End Balance", dataIndex: "endBalance", key: "endBalance" },
    { title: "Stock In", dataIndex: "stockIn", key: "stockIn" },
    { title: "Stock Out", dataIndex: "stockOut", key: "stockOut" },
    { title: "Last Modified", dataIndex: "lastUpdate", key: "lastUpdate" },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="contract-list-actions--flex">
          <EyeOutlined
            onClick={() => handleEdit(record)}
            style={{ marginRight: "10px", fontSize: "20px" }}
          >
            View
          </EyeOutlined>

          <DeleteOutlined
            onClick={() => handleDelete(record)}
            style={{ marginLeft: "10px", fontSize: "20px" }}
          >
            Delete
          </DeleteOutlined>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <PaginatedTable
        columns={columns}
        pageSize={filter.pageSize}
        totalRows={filter.totalRows}
        data={filter.data}
        pageChange={pageChange}
        pageSizeChange={pageSizeChange}
      />
    </Fragment>
  );
};

export default InventoryList;
