import { Fragment, React, useState } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector, Provider } from "react-redux";
import "../../Style/ContractCreate.css"

const ContractCreateForm = (props) => {
  const { values, setValues, handleChange, handleSubmit } = props;
  //destructing variable from state
  // const { customerid, customername, email, date } = values;
  const { contract_id, user_id, product_id, start_date, deadline, total } =
    values;
  // const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [value, setValue] = useState(null);

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const username = useSelector((state) => state.auth.username)

  return (
    <div className="contract-create-form-container">
      <Form onFinish={onFinish}>
        <Form.Item label="Contract ID">
          <Input
            name="contract_id"
            value={values.contract_id}
            onChange={handleChange}
            rules={[{ required: true, message: "Contract ID" }]}
          />
        </Form.Item>

        <Form.Item label="Customer ID">
          <Select>
            <Select.Option value="demo">Demo1</Select.Option>
            <Select.Option value="demo">Demo2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Signed By">
          <Input
            name="user_id"
            value={username}
            // value = {values.user_id}
            // onChange={handleChange}
            // rules={[{ required: true, message: "Signed By" }]}
            disabled
          />
        </Form.Item>

        <Form.Item label="Start Date">
          <DatePicker
            name="start_date"
            value={values.start_date}
            onChange={handleChange}
            rules={[{ required: true, message: "Start Date" }]}
          />
        </Form.Item>

        <Form.Item label="Deadline">
          <DatePicker
            name="deadline"
            value={values.dealine}
            onChange={handleChange}
            rules={[{ required: true, message: "Deadline" }]}
          />
        </Form.Item>

        {/* <Form.Item label="Product">
          <Input
            name="product_id"
            value={values.product_id}
            onChange={handleChange}
            rules={[{ required: true, message: "Contract ID" }]}
          />
        </Form.Item> */}

        <Form.List name="products">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field) => (
                <Form.Item label="Product" key={field.key}>
                  <Select {...field} placeholder="Click to add Products" />
                  {fields.length > 1 && (
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                >
                  <PlusOutlined /> Add Products
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>

        <Form.Item label="Total">
          <Input
            name="total"
            value={values.total}
            onChange={handleChange}
            // rules={[{ required: true, message: "Total" }]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContractCreateForm;
