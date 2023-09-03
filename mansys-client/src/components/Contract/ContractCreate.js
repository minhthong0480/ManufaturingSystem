import { Fragment, React, useState } from "react";
import { toast } from "react-toastify";
import ContractCreateForm from "./ContractCreateForm";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { createContract } from "../../actions/contract";
import { Row, Col, Select, DatePicker } from 'antd';
import '../../styles/Common.css'

const ContractCreate = () => {
  //   const { auth } = useSelector((state) => ({ ...state }));
  //   const { token } = auth;

  // const { Option } = Select;
  // const [selectedDateTime, setSelectedDateTime] = useState(null);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    contract_id: "",
    product_id: "",
    quantity: "",
  });

  // console.log(values);

  //destructing variable from state
  // const { customerid, customername, email } = values;
  // const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      let res = await createContract({
        ...values,
        quantity: parseInt(values.quantity),
      });
      // console.log(values);
      console.log("CONTRACT CREATE RES");
      toast.success("New Contract added");
      setTimeout(() => {
        //window.location.reload();
        navigate("/contract");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  // console.log(values);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setValues({ ...values, [e.target.name]: e.target.value });
    setValues((prevData) => ({ ...prevData, [name]: value }));
  };

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
                <label>Customer</label>
                <Select
                className="w-100"
                placeholder="Select an option"></Select>
          </Col>
          <Col span={12}>
                <label>Created By</label>
                <Select
                  className="w-100"
                  placeholder="Select an option"></Select>
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
                <label>Date Start</label>
                <DatePicker
                    className="w-100"
                    placeholder="Select Date Start"
                  />
          </Col>
          <Col span={12}>
              <label>Deadline</label>
              <DatePicker
                    className="w-100"
                    placeholder="Select Date Start"
              />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContractCreate;
