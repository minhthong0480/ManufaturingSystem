import { Fragment, useEffect, useState } from "react";
import { Button, Row, Col, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import React from "react";
import { Table } from "antd";

import { deleteOne, getall } from "../action/contract-detail";

const Contract = () => {
  const [contract, setContract] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getall(); 
        setContract(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = contract.filter((item) =>
      item.contract_id.id.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
    // loadContract();
  }, [searchText, contract]);

  // const loadContract = async () => {
  //   let res = await getall();
  //   // console.log(res)
  //   setContract(res.data);
  // };
  console.log(contract);

  const handleEdit = (record) => {
    console.log("Button clicked for record:", record);
  };

  // const handleDelete = (record) => {
  //   console.log("Button clicked for delete", record);
  // };
  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this contract?")) return;
    deleteOne(id).then((res) => {
      toast.success("Contract Deleted");
      // loadContract();
    });
  };


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
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <DeleteOutlined
            onClick={() => handleDelete(record.id)}
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
      <Row justify="end">
        <Col>
          <Input.Search
            placeholder="Search name..."
            value={searchText}
            onChange={handleSearch}
            style={{ marginBottom: 16 }}
          />
          <Button
            style={{ marginTop: "10px" }}
            type="primary"
            href="/create_contract"
          >
            Create New Contract
          </Button>
        </Col>
      </Row>
      <Table dataSource={filteredData} columns={columns} />
    </Fragment>
  );
};

export default Contract;
