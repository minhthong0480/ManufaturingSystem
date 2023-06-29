import { Fragment, useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

import React from "react";
import { Table } from "antd";

import { getall } from "../action/contract-detail";

const Contract = () => {
  const [contract, setContract] = useState([]);

  useEffect(() => {
    loadContract();
  }, []);

  const loadContract = async () => {
    let res = await getall();
    // console.log(res)
    setContract(res.data);
  };

  const handleEdit = (record) => {
    console.log("Button clicked for record:", record);
  };

  const handleDelete = (record) => {
    console.log("Button clicked for delete", record);
  };

  console.log(contract);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Customer ID",
      dataIndex: "contract_id",
      key: "contractid",
      render: (contract_id) => <span>{contract_id.id}</span>,
    },
    { title: "Product ID", dataIndex: "product_id", key: "productid" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },

    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: '10px' }}>
            Edit
          </Button>
          <DeleteOutlined onClick={() => handleDelete(record)} style={{ marginLeft: '10px', fontSize:'20px' }}>
            Delete
          </DeleteOutlined>
        </div>
      ),
    },
  ];
  return (
    <Fragment>
      <Row justify="end">
        <Col>
          <Button
            style={{ marginTop: "10px" }}
            type="primary"
            href="/create_contract"
          >
            Create New Contract
          </Button>
        </Col>
      </Row>
      <Table dataSource={contract} columns={columns} />
    </Fragment>
  );
};

export default Contract;
