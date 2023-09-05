import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { createContract } from "../../actions/contract";
import { Row, Col, Select, DatePicker, Button } from "antd";
import FilterableSelect from "../Commons/FilterableSelection";
import { CustomerService } from "../../services/customer-service";
import { ProductsService } from "../../services/products-service";
import { useSelector } from "react-redux";

import moment from "moment";
import "../../styles/Common.css";

const ContractCreate = () => {
  const currentDate = moment();

  const auth = useSelector((state) => state.auth);
  const [customerSelections, setCustomerSelections] = useState([]);
  const [productSelections, setProductSelections] = useState([]);

  useEffect(() => {
    CustomerService.getAll().then((data) => {
      if (data && data.code == 200 && data.data) {
        const mappedData = data.data.map((e) => ({
          key: e.name,
          value: e.id,
        }));

        setCustomerSelections(mappedData);
      }
    });
  }, []);

  useEffect(() => {
    //create use effect get all product
    ProductsService.getAll().then((data) => {
      if (data && data.status == 200 && data.data) {
        const mappedData = data.data.map((e) => ({
          key: e.name,
          value: e.id,
        }));
        
        console.log(data);

        setProductSelections(mappedData);
      }
    });
  }, []);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    contractNumber: "",
    customerId: "",
    userId: "",
    dateStart: "",
    deadline: "",
  });

  useEffect(() => {
    console.log("Values changed: ", values);
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await createContract({
        ...values,
        quantity: parseInt(values.quantity),
      });
      toast.success("New Contract added");
      setTimeout(() => {
        navigate("/contracts");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues((prevData) => ({ ...prevData, [name]: value }));
  // };

  return (
    <div>
      <div>
        <Typography variant="h4" sx={{ marginTop: "80px" }}>
          Tạo Mới Hợp Đồng
        </Typography>
      </div>
      <div className="main-content-container">
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
            <div>
              <label>Customer</label>
              <span className="input--required">(*)</span>
            </div>
            <FilterableSelect
              defaultOptions={customerSelections}
              className="w-100"
              placeholder="Select an option"
            />
          </Col>
          <Col span={12}>
            <div>
              <label>Product</label>
              <span className="input--required">(*)</span>
            </div>
            <FilterableSelect
              defaultOptions={productSelections}
              className="w-100"
              placeholder="Select an option"
            />
          </Col>
          <Col span={12}>
            <div>
              <label>Created By</label>
              <span className="input--required">(*)</span>
            </div>
            <Select
              className="w-100"
              placeholder="Select an option"
              value={auth.username}
            >
              <Select.Option key={auth.username} value={auth.username} />
            </Select>
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
            <div>
              <label>Date Start</label>
              <span className="input--required">(*)</span>
            </div>
            <DatePicker
              className="w-100"
              placeholder="Select Date Start"
              defaultValue={currentDate}
              format="DD-MM-YYYY"
            />
          </Col>
          <Col span={12}>
            <div>
              <label>Deadline</label>
              <span className="input--required">(*)</span>
            </div>
            <DatePicker
              className="w-100"
              placeholder="Select Date Start"
              format="DD-MM-YYYY"
            />
          </Col>
        </Row>
        <Row>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default ContractCreate;
