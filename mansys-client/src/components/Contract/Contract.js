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
  const [filteredData, setFilteredData] = useState([]);
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
            style={{ marginRight: "10px", background: 'green' }}
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
          <Button
            // style={{ marginTop: "10px", marginBottom: 10, background: 'blue' }}
            className="create-button"
            type="primary"
            href="/create_contract"
          >
            Create New Contract
          </Button>
        </Col>
      </Row>
      <Table dataSource={filteredData} columns={columns} />
      </div>
    </Fragment>
  );
};

export default Contract;
