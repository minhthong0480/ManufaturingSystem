import { Fragment, React, useState } from "react";
import { toast } from "react-toastify";
import ContractCreateForm from "../forms/ContractCreateForm";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { create } from "../action/contract-detail";

const ContractCreate = () => {
  //   const { auth } = useSelector((state) => ({ ...state }));
  //   const { token } = auth;

  // const { Option } = Select;
  // const [selectedDateTime, setSelectedDateTime] = useState(null);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    id: "",
    contract_id: "",
    product_id: "",
    quantity: "",
  });

  //destructing variable from state
  const { customerid, customername, email } = values;
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let customerData = new FormData();
    // customerData.append("id", id);
    // customerData.append("contract_id", contract_id);
    // customerData.append("product_id", product_id);
    // customerData.append("quantity", quantity);
    // customerData.append("customerid", customerid);
    // customerData.append("customername", customername);
    // // customerData.append("selectedDateTime", selectedDateTime);
    // customerData.append("email", email);

    // console.log([...customerData]);

    // setSelectedDateTime(null);

    //  dispatch(create(token, petData));
    try {
      let res = await create({
        ...values,
        quantity: parseInt(values.quantity),
      });
      console.log(values);
      console.log("CONTRACT CREATE RES", res);
      toast.success("New Contract added");
      setTimeout(() => {
        //window.location.reload();
        navigate("/user/dashboard");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  console.log(values);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ margin: "20px" }}>
          Tao Moi Hop Dong
        </Typography>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <ContractCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              onChange={(date) => setSelectedDateTime(date)}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContractCreate;
