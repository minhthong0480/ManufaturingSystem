import { Descriptions, Modal, List, Typography } from 'antd';
import { React, useState, useEffect, Fragment } from "react";
import moment from "moment";
import { Row, Col, Select, DatePicker, Button, Input, Steps, TextArea } from "antd";
import { formatCurrency } from "../../commons/utilities";
import FilterableSelect from "../Commons/FilterableSelection";

const ProductDetail = (props) => {
  const { Text } = Typography;
  const { isModalOpen, record, setIsModalDetailOpen, dataCategory } = props;
  const { name, price, createDate, supplier, category_id } = record;

  const [disabled, setDisabled] = useState(true);
  console.log(record);
  const dataMaterial = [
    {
      title: 'Mặt bàn gỗ ',
      description: '20cm*80cm*18mm'
    },
    {
      title: 'gỗ làm kệ',
      description: '40cm*80cm*18mm'
    }
  ]
  const items = [
    {
      key: '1',
      label: 'Tên sản phẩm',
      children: name,
    },
    {
      key: '2',
      label: 'Giá',
      span: 2,
      children: Math.round(price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VND",
    },
    {
      key: '4',
      label: 'Ngày tạo',
      children: moment(createDate).format('DD/MM/YYYY')
    },
    {
      key: '5',
      label: 'Nhà cung cấp',
      span: 2,
      children: supplier,
    },
    {
      key: '6',
      label: 'Ngành hàng',
      span: 3,
      children: dataCategory.find(f => f.id == category_id)?.name || "không có",
    },
    {
      key: '7',
      label: 'Nguyên vật liệu',
      children: <List
        itemLayout="horizontal"
        dataSource={dataMaterial}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.description}
            />
            <Text>Số lượng : 1</Text>
          </List.Item>
        )}
      />
    },
  ];

  const handleOk = () => {
    setIsModalDetailOpen(false)
  };

  const handleCancel = () => {
    setIsModalDetailOpen(false)
  };

  function handleEditClick() {
    if (!disabled) {
      resetData();
    } else setDisabled(!disabled);
  }

  function resetData() {
    // TODO
    setDisabled(!disabled)
  }

  return (
    <Modal title="Thông tin chi tiết sản phẩm"
      width="60vw"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={false}
    >
      <Descriptions bordered items={items} />
      <div className="text-align-right">
        <Button type="primary" onClick={handleEditClick}>
          {disabled ? "Chỉnh sửa" : "Huỷ chỉnh sửa"}
        </Button>
      </div>
      <div className="main-content-container m-top--3rem">
        <Row gutter={16} className="m-top--1rem">
          <Col span={2}>
            <div>
              <label>Id</label>
            </div>
            <Input
              disabled={true}
              value={record.id}
              type="string"
              placeholder="Product Id"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
          <Col span={11}>
            <div>
              <label>Cost</label>
            </div>
            <Input
              disabled={disabled}
              value={formatCurrency(record.cost)}
              type="text"
              placeholder="Contract Total"
            />
          </Col>
          <Col span={11}>
            <div>
              <label>Price</label>
            </div>
            <Input
              disabled={disabled}
              value={formatCurrency(record.price)}
              type="text"
              placeholder="Contract Total"
            />
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={24}>
            <div>
              <label>Name</label>
              {/* <span className="input--required">(*)</span> */}
            </div>
            <Input
              disabled={disabled}
              value={record.name}
              type="string"
              placeholder="Product Name"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={24}>
            <div>
              <label>Description</label>
              {/* <span className="input--required">(*)</span> */}
            </div>
            <Input.TextArea
              rows={4}
              disabled={disabled}
              value={record.description}
              type="string"
              placeholder="Product Name"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
            <div>
              <label>Category</label>
            </div>
            <Select
              disabled={disabled}
              defaultOptions={record.category}
              value={record.category}
              className="w-100"
              placeholder="Select an option"
            />
          </Col>
          <Col span={12}>
            <div>
              <label>Supllier</label>
            </div>
            <Select
              disabled={disabled}
              defaultOptions={record.supplier}
              value={record.category}
              className="w-100"
              placeholder="Select an option"
            />
          </Col>
        </Row>
      </div>

    </Modal>
  )
}
export default ProductDetail;