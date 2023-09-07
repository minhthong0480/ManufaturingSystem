import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Modal, Input, Row, Col } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { MaterialService } from "../services/material-service"
import '../styles/Common.css';
import { showErrorMessage } from '../commons/utilities'
const MaterialTable = () => {

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedEditMaterial, setSelectedEditMaterial] = useState(null);
  const [editMaterialErrors, setEditMaterialErrors] = useState({})
  const [openEditModal, setOpenEditModal] = useState(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [createMaterialErrors, setCreateMaterialErrors] = useState({})
  const [createMaterial, setCreateMaterial] = useState(null);

  const triggerSearch = (name) => {
      MaterialService.getAll(name)
      .then(data => {
        if(data && data.code < 400){
          setMaterials(data.data)
        }else{
          showErrorMessage(data.message)
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

  const handleClickedEdit = (record) => {
    setSelectedEditMaterial(record)
    setOpenEditModal(true)
    setEditMaterialErrors({})
  };

  const handleCloseEdit = () => {
    setSelectedEditMaterial(null)
    setOpenEditModal(false)
  };

  const handleEditValidation = (submitData) => {
    const errors = {}
    if(!submitData.name || submitData.name.length == 0)
      errors.name = 'Please fill out Name'
    if(!submitData.brand || submitData.brand.length == 0)
      errors.brand = 'Please fill out Brand'
    
    try {
        const floatCost = Number.parseFloat(submitData.cost)
        if(floatCost < 0 || !floatCost)
          errors.cost = 'Please Cost can not be negative or empty'
    } catch (error) {
          errors.cost = 'Please Cost can be positive and a float number only'
    }
    
    if(!submitData.unit || submitData.unit.length == 0){
      errors.unit = 'Please fill out Unit'
    }

    try {
      const floatQuantity = Number.parseFloat(submitData.quantity)
      if(floatQuantity < 0 || !floatQuantity)
        errors.quantity = 'Please Quantity can not be negative or empty'
    } catch (error) {
        errors.quantity = 'Please Quantity can be positive and a float number only'
    }
    setEditMaterialErrors(errors)
    return errors
  }
  const handleEditFormChange = (name, value) => {
    const newValue = {...selectedEditMaterial}
    newValue[name] = value
    setSelectedEditMaterial(newValue)
  }

  const handleSubmitEditedData = () => {
    const submitData = {
      name : null,
      brand : null,
      cost : null,
      unit : null,
      quantity : null 
    }
    submitData.name = selectedEditMaterial.name;
    submitData.brand = selectedEditMaterial.brand;
    submitData.cost = Number.parseFloat(selectedEditMaterial.cost);
    submitData.unit = selectedEditMaterial.unit;
    submitData.quantity = Number.parseFloat(selectedEditMaterial.quantity)


    const errors = handleEditValidation(submitData)
    if(Object.keys(errors).length > 0){
      return
    }

    MaterialService.update(selectedEditMaterial.id, submitData)
                   .then(data => {
                      if(data && data.code < 400){
                        handleCloseEdit()
                        triggerSearch(searchText)
                      }else{
                        showErrorMessage(data.message)
                      }
                   })
  }

  const handleClickedCreate = () => {
    setCreateMaterial({})
    setCreateMaterialErrors({})
    setOpenCreateModal(true)
  };

  const handleCloseCreate = () => {
    setCreateMaterial(null)
    setOpenCreateModal(false)
  };

  const handleCreateFormChange = (name, value) => {
    const newValue = {...createMaterial}
    newValue[name] = value
    setCreateMaterial(newValue)
  }

  const handleCreateValidation = (submitData) => {
    const errors = {}
    if(!submitData.name || submitData.name.length == 0)
      errors.name = 'Please fill out Name'
    if(!submitData.brand || submitData.brand.length == 0)
      errors.brand = 'Please fill out Brand'
    
    try {
        const floatCost = Number.parseFloat(submitData.cost)
        if(floatCost < 0 || !floatCost)
          errors.cost = 'Please Cost can not be negative or empty'
    } catch (error) {
          errors.cost = 'Please Cost can be positive and a float number only'
    }
    
    if(!submitData.unit || submitData.unit.length == 0){
      errors.unit = 'Please fill out Unit'
    }

    try {
      const floatQuantity = Number.parseFloat(submitData.quantity)
      if(floatQuantity < 0 || !floatQuantity)
        errors.quantity = 'Please Quantity can not be negative or empty'
    } catch (error) {
        errors.quantity = 'Please Quantity can be positive and a float number only'
    }
    setCreateMaterialErrors(errors)
    return errors
  }


  const handleSubmitCreateData = () => {
    const submitData = {
      name : null,
      brand : null,
      cost : null,
      unit : null,
      quantity : null 
    }
    submitData.name = createMaterial.name;
    submitData.brand = createMaterial.brand;
    submitData.cost = Number.parseFloat(createMaterial.cost);
    submitData.unit = createMaterial.unit;
    submitData.quantity = Number.parseFloat(createMaterial.quantity)

    const errors = handleCreateValidation(submitData)
    if(Object.keys(errors).length > 0)
      return

    MaterialService.create(submitData)
                   .then(data => {
                      if(data && data.code < 400){
                        handleCloseCreate()
                        triggerSearch(searchText)
                      }else{
                        showErrorMessage(data.message)
                      }
                   })
  }
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
            onClick={() => handleClickedEdit(record)}
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
      <h1>Danh sách vật tư</h1>
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
            onClick={handleClickedCreate}
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
      <Modal
        open={openEditModal}
        onCancel={handleCloseEdit}
        destroyOnClose={handleCloseEdit}
        onOk={handleSubmitEditedData}
      >
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
                <div>
                  <label>Name</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                defaultValue={selectedEditMaterial ? selectedEditMaterial.name : null}
                onChange={(e) => {handleEditFormChange('name', e.target.value)}}
                type="string"  
                placeholder="Contract Number"/>
                {editMaterialErrors.name && 
                (
                  <span className="error">{editMaterialErrors.name}</span>
                )}
          </Col>
          <Col span={12}>
                <div>
                  <label>Brand</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                defaultValue={selectedEditMaterial ? selectedEditMaterial.brand : null}
                onChange={(e) => {handleEditFormChange('brand', e.target.value)}}
                type="string"  
                placeholder="Contract Number"/>
                {editMaterialErrors.brand && 
                (
                  <span className="error">{editMaterialErrors.brand}</span>
                )}
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
                <div>
                  <label>Cost</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                defaultValue={selectedEditMaterial ? selectedEditMaterial.cost : null}
                onChange={(e) => {handleEditFormChange('cost', e.target.value)}}
                type="number"  
                placeholder="Contract Number"/>
                {editMaterialErrors.cost && 
                (
                  <span className="error">{editMaterialErrors.cost}</span>
                )}
          </Col>
          <Col span={12}>
                <div>
                  <label>Unit</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                defaultValue={selectedEditMaterial ? selectedEditMaterial.unit : null}
                onChange={(e) => {handleEditFormChange('unit', e.target.value)}}
                type="string"  
                placeholder="Contract Number"/>
                {editMaterialErrors.unit && 
                (
                  <span className="error">{editMaterialErrors.unit}</span>
                )}
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
                <div>
                  <label>Quantity</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                defaultValue={selectedEditMaterial ? selectedEditMaterial.quantity : null}
                onChange={(e) => {handleEditFormChange('quantity', e.target.value)}}
                type="number"  
                placeholder="Contract Number"/>
                {editMaterialErrors.quantity && 
                (
                  <span className="error">{editMaterialErrors.quantity}</span>
                )}
          </Col>
          <Col span={12}>
                <div>
                  <label>Created Date</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                defaultValue={selectedEditMaterial ? selectedEditMaterial.createDate : null}
                disabled={true}
                type="string"  
                placeholder="Contract Number"/>
          </Col>
        </Row>
      </Modal>
      <Modal
        open={openCreateModal}
        onCancel={handleCloseCreate}
        destroyOnClose={handleCloseCreate}
        onOk={handleSubmitCreateData}
      >
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
                <div>
                  <label>Name</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                onChange={(e) => {handleCreateFormChange('name', e.target.value)}}
                type="string"  
                placeholder="Material Name"/>
                {createMaterialErrors.name && 
                (
                  <span className="error">{createMaterialErrors.name}</span>
                )}
          </Col>
          <Col span={12}>
                <div>
                  <label>Brand</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                onChange={(e) => {handleCreateFormChange('brand', e.target.value)}}
                type="string"  
                placeholder="Material Brand"/>
                {createMaterialErrors.brand && 
                (
                  <span className="error">{createMaterialErrors.brand}</span>
                )}
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
                <div>
                  <label>Cost</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                onChange={(e) => {handleCreateFormChange('cost', e.target.value)}}
                type="number"  
                placeholder="Material Cost"/>
                {createMaterialErrors.cost && 
                (
                  <span className="error">{createMaterialErrors.cost}</span>
                )}
          </Col>
          <Col span={12}>
                <div>
                  <label>Unit</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                onChange={(e) => {handleCreateFormChange('unit', e.target.value)}}
                type="string"  
                placeholder="Material Unit"/>
                {createMaterialErrors.unit && 
                (
                  <span className="error">{createMaterialErrors.unit}</span>
                )}
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
                <div>
                  <label>Quantity</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                onChange={(e) => {handleCreateFormChange('quantity', e.target.value)}}
                type="number"  
                placeholder="Material Quantity"/>
                {createMaterialErrors.quantity && 
                (
                  <span className="error">{createMaterialErrors.quantity}</span>
                )}
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default MaterialTable;
