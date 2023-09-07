import React from "react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Button, Row, Input } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "../../styles/Contract.css";
import "../../styles/PaginatedTable.css";
import { deactivateContract } from "../../actions/contract";
import { ContractService } from "../../services/contract-service";
import { PaginatedTable } from '../Commons/PaginatedTable'
import { showErrorMessage } from '../../commons/utilities'
const Contract = () => {
  const navigate = useNavigate(); 


  const [filter, setFilter] = useState({
    searchText: "",
    data: [],
    totalRows: 0,
    page: 1,
    pageSize: 10,
    isActive: true,
  });

  const keySearch = () => {
    if (window.contractSearchTimer) {
      window.clearTimeout(window.contractSearchTimer);
    }
    window.contractSearchTimer = window.setTimeout(
      ((cPage, cPageSize, cSearchText) => {
        return () => {
          onTriggerFiltering(cPage, cPageSize, cSearchText);
        };
      })(filter.page, filter.pageSize, filter.searchText),
      500
    );
  };

  const onTriggerFiltering = async (page, pageSize, term) => {
      const filterResult = await ContractService.filter(page, pageSize, term, filter.isActive);
      if(filterResult.code >= 400) {
        showErrorMessage('An error is occurred while searching, please try again!')
        return
      }
      setFilter({...filter, totalRows: filterResult.data.totalRows, data : [...filterResult.data.data]})
  }

  const handleTextChange = (e) => {
    setFilter({ ...filter, searchText: e.target.value });
  };
  const handleSearch = (e) => {
    onTriggerFiltering(filter.page, filter.pageSize, filter.searchText);
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
    onTriggerFiltering(filter.page, filter.pageSize, filter.searchText);
  }, []);

  const handleEdit = (record) => {
    let path = `/edit_contract/${record.id}`;
    navigate(path);
  };

  const handleDelete = async (record) => {
    if (!window.confirm("Do you want to delete this contract?")) return;
    const deleteResult = await ContractService.delete(record)
    if(deleteResult.code >= 400){
      showErrorMessage('An error is occured while deleting, please try again!')
    }else {
      toast.success("Contract Deleted");
      setFilter({...filter, data : [...filter.data.filter(e => e.id != record.id)]})
    }
  };

  const columns = [
    { title: "Contract ID", dataIndex: "id", key: "id" },
    {
      title: "Contract Number",
      dataIndex: "contractNumber",
      key: "contractnumber",
    },
    { title: "Customer ID", dataIndex: "customerId", key: "customerId" },
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Start Date", dataIndex: "dateStart", key: "dateStart" },
    { title: "Deadline", dataIndex: "deadline", key: "deadline" },
    { title: "Total", dataIndex: "total", key: "total" },

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
      <h1>Contract List</h1>
      <div className="contract-list-filter-container--flex">
        <Row justify="end">
          <Input.Search
            className="contract-list-filter-search"
            placeholder="Search name..."
            value={filter.searchText}
            onPressEnter={handleSearch}
            onSearch={handleSearch}
            onKeyUpCapture={keySearch}
            onChange={handleTextChange}
            style={{ marginBottom: 16, marginTop: 80 }}
          />
        </Row>
        <Row justify="end">
          <Button
            className="contract-list-create-new-button"
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
