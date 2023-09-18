import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "../../styles/Contract.css";
import "../../styles/PaginatedTable.css";
import { ContractService } from "../../services/contract-service";
import { PaginatedTable } from '../Commons/PaginatedTable'
import { showErrorMessage, formatCurrency } from '../../commons/utilities'
import { Row, Col, Select, DatePicker, Button, Input, Steps, Tabs } from "antd";
import { DeliveryNoteService } from "../../services/delivery-note-service";

const DeliveryNote = () => {
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
    const filterResult = await DeliveryNoteService.filter(page, pageSize, term);
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
    const path = `/delivery_note/${record.id}`
    navigate(path);
  };

  const handleDelete = async (record) => {
    if (!window.confirm("Do you want to delete this delivery note?")) return;
    const deleteResult = await DeliveryNoteService.delete(record)
    if (deleteResult.code >= 400) {
      showErrorMessage('An error is occured while deleting, please try again!')
    } else {
      toast.success("Contract Deleted");
      setFilter({ ...filter, data: [...filter.data.filter(e => e.id != record.id)] })
    }
  };

  const columns = [
    { title: "Delivery Note ID", dataIndex: "id", key: "id" },
    { title: "Customer ID", dataIndex: "customerId", key: "customerId" },
    { title: "Sales Order", dataIndex: "salesOrder", key: "salesOrder" },
    { title: "Remarks", dataIndex: "remarks", key: "remarks" },
    { title: "Delvier By", dataIndex: "deliveryBy", key: "deliveryBy" },
    { title: "Deliver Date", dataIndex: "deliveryDate", key: "deliveryDate" },
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
      <h1>Quan li Delivery Note</h1>

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

export default DeliveryNote;
