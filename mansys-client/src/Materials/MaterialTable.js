// MaterialTable.js

import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Input } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";

const MaterialTable = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("/api/materials"); // Change the API endpoint
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    console.log("Button clicked for record:", record);
  };

  const handleDelete = async (materialId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/materials/${materialId}`); // Change the API endpoint
      message.success("Material deleted successfully");
      fetchMaterials();
    } catch (error) {
      console.error("Error deleting material:", error);
      message.error("Error deleting material");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Quantity", dataIndex: "quantity", key: "quanity" },
    { title: "Create Date", dataIndex: "create_date", key: "create_date" },
    
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div>
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
    <div>
      <h1>Material List</h1>
      <div className="contract-page-container">
          <Input.Search 
            placeholder="Search name..."
            value={searchText}
            onChange={handleSearch}
            enterButton
          />
          <Button
            className="create-button"
            type="primary"
            href="/create_contract"
          >
            Create New Contract
          </Button>
      </div>
      <Table
        dataSource={materials}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default MaterialTable;
