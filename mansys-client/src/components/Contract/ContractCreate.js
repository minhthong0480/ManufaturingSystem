import { Fragment, React, useState } from "react";
import { toast } from "react-toastify";
import ContractCreateForm from "./ContractCreateForm";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { createContract } from "../../action/contract-detail";

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
    <Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ marginTop: "80px" }}>
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
              // onChange={(date) => setSelectedDateTime(date)}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContractCreate;
