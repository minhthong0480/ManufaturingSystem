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

  const handleButtonClick = (record) => {
    console.log('Button clicked for record:', record);
  };
  
  console.log(contract);

  // const dataSource = [
  //   { key: "1", name: "John Doe", age: 30, address: "123 Street, City" },
  //   { key: "2", name: "Jane Smith", age: 28, address: "456 Avenue, Town" },
  //   { key: "3", name: "Mike Johnson", age: 35, address: "789 Road, Village" },
  // ];
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
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => handleButtonClick(record)}>Edit</Button>
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
