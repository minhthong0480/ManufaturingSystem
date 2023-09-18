import { Button, Form, Input, Modal, Space } from "antd";
import React, { useEffect } from "react";

const CustomerModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  handleAdd,
  editCustomer,
  handleSave,
}) => {
  const [form] = Form.useForm();
  const addNewCustomer = (values) => {
    handleAdd(values);
    form.resetFields();
  };
  const saveCustomer = (values) => {
    handleSave(values);
  };
  const setFormValue = () => {
    editCustomer ? form.setFieldsValue(editCustomer) : form.resetFields();
  };
  useEffect(() => {
    setFormValue();
  }, [editCustomer]);

  return (
    <Modal open={isModalOpen} footer={[]} onCancel={handleCancel}>
      <h2 style={{ textAlign: "center" }}>Add new customer</h2>

      <Form
        layout={"vertical"}
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={editCustomer ? saveCustomer : addNewCustomer}
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
        <Form.Item label="Tax Number" name="taxNumber">
          <Input placeholder="Tax Number" />
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
