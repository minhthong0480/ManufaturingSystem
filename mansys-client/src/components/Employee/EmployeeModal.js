import { Button, Form, Input, Modal, Space } from "antd";
import React from "react";

const EmployeeModal = ({ isModalOpen, handleOk, handleCancel, handleAdd }) => {
  const [form] = Form.useForm();
  const addNewEmployee = (values) => {
    handleAdd(values);
    form.resetFields();
  };
  return (
    <Modal open={isModalOpen} footer={[]}>
      <h2 style={{ textAlign: "center" }}>Add new employee</h2>

      <Form
        layout={"vertical"}
        form={form}
        initialValues={{}}
        style={{ maxWidth: 600 }}
        onFinish={addNewEmployee}
      >
        <Form.Item label="Employee name" name="name">
          <Input placeholder="Employee name" />
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

export default EmployeeModal;
