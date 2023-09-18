import { Button, Form, Input, Modal, Space } from "antd";
import React, { useEffect } from "react";

const EmployeeModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  handleAdd,
  editEmployee,
  handleSave,
}) => {
  const [form] = Form.useForm();
  const addNewEmployee = (values) => {
    handleAdd(values);
    form.resetFields();
  };
  const saveEmployee = (values) => {
    handleSave(values);
  };
  const setFormValue = () => {
    editEmployee ? form.setFieldsValue(editEmployee) : form.resetFields();
  };
  useEffect(() => {
    setFormValue();
  }, [editEmployee]);
  return (
    <Modal open={isModalOpen} footer={[]} onCancel={handleCancel}>
      <h2 style={{ textAlign: "center" }}>Add new employee</h2>

      <Form
        layout={"vertical"}
        form={form}
        initialValues={{}}
        style={{ maxWidth: 600 }}
        onFinish={editEmployee ? saveEmployee : addNewEmployee}
      >
        <Form.Item label="Username" name="username">
          <Input placeholder="Username" />
        </Form.Item>
        {!editEmployee && (
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Password" visibilityToggle={false} />
          </Form.Item>
        )}
        <Form.Item label="Employee name" name="name">
          <Input placeholder="Employee name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Phone number" name="phone">
          <Input placeholder="Phone number" />
        </Form.Item>
        <Form.Item label="Role" name="roles">
          <Input placeholder="Role" />
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
