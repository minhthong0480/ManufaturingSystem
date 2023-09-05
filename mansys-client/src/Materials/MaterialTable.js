//create a material table similar to contract table

import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Button, Row, Input } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import moment from "moment";

import "../styles/PaginatedTable.css";
import { deactivateContract } from "../actions/contract";
import { ContractService } from "../services/contract-service";
import { PaginatedTable } from "../components/Commons/PaginatedTable";

const Material = () => {
  const dispatcher = useDispatch();
  const [material, setMaterial] = useState([]);
  const [filter, setFilter] = useState({
    searchText: "",
    data: [],
    totalRows: 0,
    page: 1,
    pageSize: 10,
  });

  const keySearch = () => {
    if (window.materialSearchTimer) {
      window.clearTimeout(window.materialSearchTimer);
    }
  };

  const onTriggerFiltering = async (page, pageSize, term) => {
    const filterResult = await ContractService.getAll(page, pageSize, term);
    if (filterResult.code != 200) return;
    setFilter({
      ...filter,
      totalRows: filterResult.data.totalRows,
      data: [...filterResult.data.data],
    });
  };

  const pageChange = (page) => {
    setFilter({ ...filter, page });
    onTriggerFiltering(page, filter.pageSize, filter.searchText);
  };

  const pageSizeChange = (pageSize) => {
    setFilter({ ...filter, pageSize });
    onTriggerFiltering(filter.page, pageSize, filter.searchText);
  };

  const handleSearch = (e) => {
    onTriggerFiltering(filter.page, filter.pageSize, filter.searchText);
  };

  const handleTextChange = (e) => {
    setFilter({ ...filter, searchText: e.target.value });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      width: "20%",
    },

    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: true,
      width: "20%",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      sorter: true,
      width: "20%",
    },

    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      sorter: true,
      width: "20%",
    },

    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      sorter: true,
      width: "20%",
    },

    {
      title: "Thời gian tạo",
      dataIndex: "createDate",
      key: "createDate",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
  ];

  return (
    <Fragment>
      <h1>Material List</h1>
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

export default Material;
