import { Fragment, useEffect, useState } from "react";
import { Button, Row, Col, Input } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "../../styles//Contract.css"

import React from "react";
import { Table } from "antd";

import { deactivateContract, filterContract } from "../../actions/contract-detail";

const Contract = () => {
  const [contract, setContract] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };
  const fetchData = async () => {
    try {
      let res = await filterContract();
      setContract(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  console.log(contract);

  const handleEdit = (record) => {
    console.log("Button clicked for record:", record);
  };

  // const handleDelete = (record) => {
  //   console.log("Button clicked for delete", record);
  // };
  const handleDelete = async () => {
    if (!window.confirm("Do you want to delete this contract?")) return;
    deactivateContract().then((res) => {
      toast.success("Contract Deleted");
      fetchData();
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
            onChange={handleSearch}
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
