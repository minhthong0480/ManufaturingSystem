import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Input } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { MaterialService } from "../services/material-service"
import '../styles/Common.css';

const MaterialTable = () => {

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const triggerSearch = (name) => {
      MaterialService.getAll(name)
      .then(data => {
        if(data && data.code < 400){
          setMaterials(data.data)
        }
      })

    }
  useEffect(() => {
    triggerSearch('')
  }, []);

  const handleSearch = (e) => {
    triggerSearch(e.target.value)
    setSearchText(e.target.value)
  };

  const handleEdit = (record) => {
  };

  const handleDelete = async (materialId) => {
    const result = await MaterialService.delete(materialId)
    triggerSearch(searchText)
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Create Date", dataIndex: "createDate", key: "createDate" },
    
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
    <div className="main-content-container">
      <h1>Material List</h1>
      <div className="contract-page-container">
          <Input.Search 
            placeholder="Search name..."
            onChange={handleSearch}
            onPressEnter={handleSearch}
            onSearch={() => {triggerSearch(searchText)}}
            value={searchText}
            enterButton
          />
          <Button
            className="create-button"
            href="/material_contract"
          >
            Create Material
          </Button>
      </div>
      <Table
        dataSource={materials}
        columns={columns}
        // loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default MaterialTable;
