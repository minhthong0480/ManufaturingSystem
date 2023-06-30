import { Fragment, React, useState } from "react";
import { Form, Input, Button } from "antd";

const ContractCreateForm = (props) => {
  const { values, setValues, handleChange, handleSubmit } = props;
  //destructing variable from state
  // const { customerid, customername, email, date } = values;
  const { contract_id, product_id, quantity } = values;
  // const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [value, setValue] = useState(null);

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  // console.log(values);

  return (
    <Form onFinish={onFinish}>
      <Form.Item label="Contract ID">
        <Input
          name="contract_id"
          value={values.contract_id}
          onChange={handleChange}
          rules={[{ required: true, message: "Contract ID" }]}
        />
      </Form.Item>

      <Form.Item label="Product ID">
        <Input
          name="product_id"
          value={values.product_id}
          onChange={handleChange}
          rules={[{ required: true, message: "Contract ID" }]}
        />
      </Form.Item>

      <Form.Item label="Quantity">
        <Input
          name="quantity"
          value={values.quantity}
          onChange={handleChange}
          rules={[{ required: true, message: "Quantity" }]}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContractCreateForm;
