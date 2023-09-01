import React from "react";
import { Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { Button, Row, Col, Input } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "../../styles//Contract.css"
import { deactivateContract, filterContracts } from "../../actions/contract";

const Contract = () => {
  const dispatcher = useDispatch();
  const [contract, setContract] = useState([]);
  const [filteredData, setFilteredData] = useState([{
    key: "0",
    avatar: "Edward King 0",
    employeeId: "32",
    name: "London, Park Lane no. 0",
    email: "123",
    phone: "13214",
    role: "1234123",
  },
  {
    key: "1",
    avatar: "Edward King 0",
    employeeId: "32",
    name: "London, Park Lane no. 0",
    email: "123",
    phone: "13214",
    role: "1234123",
  },]);

  const [searchText, setSearchText] = useState("");

  const onTriggerFiltering = async (page, pageSize, term) => {
      dispatcher(filterContracts(page, pageSize, term))
  };

  const handleTextChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  }
  const handleSearch = (e) => {
    onTriggerFiltering(1, 10, searchText)
  }

  useEffect(() => {
    onTriggerFiltering(1, 10, null);
  }, []);

const handleEdit = (record) => {
    console.log("Button clicked for record:", record);
  };

const handleDelete = async () => {
    if (!window.confirm("Do you want to delete this contract?")) return;
    deactivateContract().then((res) => {
      toast.success("Contract Deleted");
      window.location.reload()
    });
  };

  const columns = [
    { title: "Contract ID", dataIndex: "contract_id", key: "id" },
    {
      title: "Contract Number",
      dataIndex: "contract_number",
      key: "contractnumber",
    },
    { title: "Customer ID", dataIndex: "customer_id", key: "customerid" },
    { title: "User ID", dataIndex: "user_id", key: "startdate" },
    { title: "Start Date", dataIndex: "start_date", key: "startdate" },
    { title: "Deadline", dataIndex: "deadline", key: "deadline" },
    { title: "Total", dataIndex: "total", key: "total" },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <EyeOutlined 
            onClick={() => handleDelete()}
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
            onClick={() => handleDelete()}
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
      <div className="contract-page-container">
      <Row justify="end">
        <Col> 
          <Input.Search 
            placeholder="Search name..."
            value={searchText}
            onPressEnter={handleSearch}
            onSearch={handleSearch}
            onChange={handleTextChange}
            style={{ marginBottom: 16, marginTop: 80 }}
          />
          </Col>
          <Button
            className="create-button"
            type="primary"
            href="/create_contract"
          >
            Create New Contract
          </Button>
      </Row>
      </div>
      <Table dataSource={filteredData} columns={columns} />
    </Fragment>
  );
};

export default Contract;
