import { Fragment, React, useState } from "react";
import { Form, Input, Button } from 'antd';

const ContractCreateForm = (props) => {
  const { values, setValues, handleChange, handleSubmit } = props;
  //destructing variable from state
  // const { customerid, customername, email, date } = values;
  const { id, contract_id, product_id, quantity } = values;
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [value, setValue] = useState(null);

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  // console.log(values);

  return (
    <Form onFinish={onFinish} onClick={handleSubmit}>
      <Form.Item
        label="Contract ID"
        name="contractid"
        value={contract_id}
        onChange={handleChange}
        rules={[{ required: true, message: 'Contract ID' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Product ID"
        name="productid"
        value={product_id}
        onChange={handleChange}
        rules={[{ required: true, message: 'Contract ID' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        value={quantity}
        onChange={handleChange}
        rules={[{ required: true, message: 'Quantity' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" >Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default ContractCreateForm;
