import { Fragment, React, useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

const ContractCreateForm = (props) => {
  const { values, setValues, handleChange, handleSubmit } = props;
  //destructing variable from state
  const { customerid, customername, email } = values;
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [value, setValue] = useState(null);

  //console.log(values)

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              label="Customer ID"
              name="customerid"
              value={customerid}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Customer Name"
              name="customername"
              value={customername}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Pick Date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                format="DD-MM-YYYY HH:mm"
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop:"20px" }}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Box>
      </form>
    </Fragment>
  );
};

export default ContractCreateForm;
