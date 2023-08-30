
import { Button, Form, Input, Modal, Space } from "antd";
import React from "react";

const CustomerModal = ({ isModalOpen, handleOk, handleCancel, handleAdd }) => {
  const [form] = Form.useForm();
  const addNewCustomer = (values) => {
    handleAdd(values);
    form.resetFields();
  };
  return (
    <Modal open={isModalOpen} footer={[]}>
      <h2 style={{ textAlign: "center" }}>Add new customer</h2>

      <Form
        layout={"vertical"}
        form={form}
        initialValues={{}}
        style={{ maxWidth: 600 }}
        onFinish={addNewCustomer}
      >
        <Form.Item label="Customer name" name="name">
          <Input placeholder="Customer name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Phone number" name="phone">
          <Input placeholder="Phone number" />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Input placeholder="Role" />
        </Form.Item>
        <Form.Item label="Note">
          <Input placeholder="Note" />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Space size="middle">
            <Button type="primary" htmlType="submit" onClick={handleOk}>
              Submit
            </Button>
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerModal;

