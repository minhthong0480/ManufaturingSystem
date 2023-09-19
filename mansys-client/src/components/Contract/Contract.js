import React from "react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Button, Row, Col, Input, Select } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "../../styles/Contract.css";
import "../../styles/PaginatedTable.css";
import { ContractService } from "../../services/contract-service";
import { PaginatedTable } from '../Commons/PaginatedTable'
import { showErrorMessage, formatCurrency } from '../../commons/utilities'
const Contract = () => {
  const navigate = useNavigate();


  const [filter, setFilter] = useState({
    searchText: "",
    listOfStatus: [],
    data: [],
    totalRows: 0,
    page: 1,
    pageSize: 10,
    isActive: true,
  });

  const [statusSelections, setStatusSelections] = useState([])

  // const keySearch = () => {
  //   if (window.contractSearchTimer) {
  //     window.clearTimeout(window.contractSearchTimer);
  //   }
  //   window.contractSearchTimer = window.setTimeout(
  //     ((cPage, cPageSize, cSearchText) => {
  //       return () => {
  //         onTriggerFiltering(cPage, cPageSize, cSearchText);
  //       };
  //     })(filter.page, filter.pageSize, filter.searchText),
  //     500
  //   );
  // };

  const onTriggerFiltering = async (page, pageSize, term, listOfStatus) => {
    const filterResult = await ContractService.filter(page, pageSize, term, listOfStatus, filter.isActive);
    if (filterResult.code >= 400) {
      showErrorMessage('An error is occurred while searching, please try again!')
      return
    }
    setFilter({ ...filter, totalRows: filterResult.data.totalRows, data: [...filterResult.data.data] })
  }

  const handleTextChange = (e) => {
    setFilter({ ...filter, searchText: e.target.value });
  };
  const handleSearch = (e) => {
    onTriggerFiltering(filter.page, filter.pageSize, filter.searchText, filter.listOfStatus);
  };

  const pageChange = (page) => {
    setFilter({ ...filter, page });
    onTriggerFiltering(page, filter.pageSize, filter.searchText);
  };

  const pageSizeChange = (pageSize) => {
    setFilter({ ...filter, pageSize });
    onTriggerFiltering(filter.page, pageSize, filter.searchText);
  };

  useEffect(() => {
    onTriggerFiltering(filter.page, filter.pageSize, filter.searchText, filter.listOfStatus);
  }, []);

  useEffect(() => {
    ContractService.getStatus().then(data => {
      if (data != null && data.code < 400) {
        let selections = data.data.data.map(e => ({ label: e.name, value: e.id }))
        setStatusSelections(selections)
      }
    })
  }, []);

  const handleEdit = (record) => {
    let path = `/edit_contract/${record.id}`;
    navigate(path);
  };

  const handleDelete = async (record) => {
    if (!window.confirm("Do you want to delete this contract?")) return;
    const deleteResult = await ContractService.delete(record)
    if (deleteResult.code >= 400) {
      showErrorMessage('An error is occured while deleting, please try again!')
    } else {
      toast.success("Contract Deleted");
      setFilter({ ...filter, data: [...filter.data.filter(e => e.id != record.id)] })
    }
  };

  const handleStatusChange = (selectedStatus) => {
    setFilter({ ...filter, listOfStatus: [...selectedStatus] })
  }

  const columns = [
    {
      title: "Contract ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "desc"
    },
    {
      title: "Contract Number",
      dataIndex: "contractNumber",
      key: "contractnumber",
      sorter: (a, b) => a.contractNumber.localeCompare(b.contractNumber),
      defaultSortOrder: "asc"
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (_, record) => {
        let style  = {color : "inherit"}
        if(record.status.color != null && record.status.color.length > 0){
          style.color = `#${record.status.color}` 
          style.fontWeight = "bold"
        }
        return (<span style={style}>{record.status.name}</span>)
      },
      sorter: (a, b) => a.status.name.localeCompare(b.status.name),
      defaultSortOrder: "asc"
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      defaultSortOrder: "asc"
    },
    { title: "User Name", dataIndex: "userName", key: "userName" },
    { title: "Start Date", dataIndex: "dateStart", key: "dateStart" },
    { title: "Deadline", dataIndex: "deadline", key: "deadline" },
    {
      title: "Total",
      dataIndex: "total",
      render: (_, record) => {
        return (<span>{formatCurrency(record.total)}</span>)
      },
      sorter: (a, b) => a.total - b.total,
      defaultSortOrder: "asc"
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

          <Button
            type="primary"
            onClick={() => handleEdit(record)}
          // style={{ marginRight: "10px", background: 'green' }}
          >
            Edit
          </Button>

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
      <h1>Danh sách hợp đồng</h1>
      <div className="contract-list-filter-container--flex">
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
            <div>
              <label>Từ khóa</label>
            </div>
            <Input
              className="w-100 m-top--1rem"
              placeholder="Tìm kiếm theo từ khóa..."
              value={filter.searchText}
              onChange={handleTextChange}
            />
          </Col>
          <Col span={12}>
            <div>
              <label>Trạng thái</label>
            </div>
            <Select
              mode="multiple"
              allowClear
              className="w-100 m-top--1rem"
              placeholder="Lọc theo trạng thái..."
              options={statusSelections}
              onChange={handleStatusChange}
            />
          </Col>
        </Row>
        <Row justify="end" className="m-top--1rem">
          <Button
            className="contract-list-create-new-button"
            onClick={handleSearch}
          >
            Search
          </Button>

          <Button
            className="contract-list-create-new-button m-left--1rem"
            type="primary"
            href="/create_contract"
          >
            Create
          </Button>
        </Row>
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

export default Contract;
