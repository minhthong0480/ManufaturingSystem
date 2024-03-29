import React from "react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "../../styles/Contract.css";
import "../../styles/PaginatedTable.css";
import { PaginatedTable } from '../Commons/PaginatedTable'
import { showErrorMessage, formatCurrency, showSuccessMessage } from '../../commons/utilities'
import { Row, Col, Select, DatePicker, Button, Input, Steps, Tabs } from "antd";
import { ReceivingNoteService } from "../../services/receiving-note-service";

const ReceivingNote = () => {
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
    const filterResult = await ReceivingNoteService.filter(page, pageSize, term);
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
    let path = `/receiving_note/${record.id}`;
    navigate(path);
  };

  const handleDelete = async (record) => {
    if (!window.confirm("Do you want to delete this receiving note?")) return;
    const deleteResult = await ReceivingNoteService.delete(record)
    if (deleteResult.code >= 400) {
      showErrorMessage('An error is occured while deleting, please try again!')
    } else {
      setFilter({ ...filter, data: [...filter.data.filter(e => e.id != record.id)] })
      showSuccessMessage("Delete success")
    }
  };

  const columns = [
    { title: "Receiving Note ID", dataIndex: "id", key: "id" },
    { title: "Supplier ID", dataIndex: "supplierId", key: "supplierId" },
    { title: "Purchase Order", dataIndex: "purchaseOrder", key: "purchaseOrder" },
    { title: "Remarks", dataIndex: "remarks", key: "remarks" },
    { title: "Received By", dataIndex: "receivedBy", key: "receivedBy" },
    { title: "Receipt Date", dataIndex: "receiptDate", key: "receiptDate" },
    {
      title: "Approval", dataIndex: "approval", render: (_, record) => (
        <span>{record.approval ? "Approved" : "N/A"}</span>
      ),
    },

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
      <div className="main-content-container">
        <div className="text-align-right">
          <Button type="primary" onClick={() => {
            navigate("/receiving_note/create")
          }}>
            Create Receiving Note
          </Button>
        </div>
      </div>
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

export default ReceivingNote;
