import { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { getall } from "../action/contract-detail";

// const Contract = ({h}) => {

//   // function handleClick(id) {
//   //   // Define the logic for handling the button click here
//   //   console.log(`Button clicked for row with id ${id}`);
//   // }

// const columns = [
//   { id: "id", label: "ID", minWidth: 170 },
//   { id: "customer_id", label: "ID Khach Hang", minWidth: 170 },

//   { id: "product_id", label: "ID San Pham", minWidth: 100 },
//   {id:"quantity", label: "So Luong", minWidth:100}
//   // {
//   //   id: "ngayhopdong",
//   //   label: "Ngay Hop Dong",
//   //   minWidth: 170,
//   //   align: "right",
//   // },
//   // {
//   //   id: "email",
//   //   label: "Email",
//   //   minWidth: 170,
//   //   align: "right",
//   // },
//   // {
//   //   id: "button",
//   //   label: "",
//   //   minWidth: 170,
//   //   align: "center",
//   // },
// ];

// function createData(id, customer_id, product_id, quantity) {
//   return { id, customer_id, product_id, quantity };
// }

// const rows = [
//   createData(h.id, h.customer_id, "01/01", "A@gmail.com"),
//   createData("002", "B", "02/01", "B@gmail.com"),
//   createData("003", "C", "03/01", "C@gmail.com"),
//   createData("004", "D", "04/01", "D@gmail.com"),
// ];

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <>
//       <Box
//         spacing={2}
//         display="flex"
//         justifyContent="flex-end"
//         alignItems="flex-end"
//       >
//         <Link className="nav-link active" to="/create_contract">
//           <Button
//             variant="contained"
//             sx={{
//               marginTop: "20px",
//               marginRight: "20px",
//               marginBottom: "20px",
//             }}
//           >
//             Tạo Hợp Đồng
//           </Button>
//         </Link>
//       </Box>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <TableContainer
//           sx={{
//             maxHeight: 440,
//             marginLeft: "10px",
//             marginRight: "30px",
//             padding: "5px",
//           }}
//         >
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{ minWidth: column.minWidth }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => {
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={row.code}
//                     >
//                       {columns.map((column) => {
//                         const value = row[column.id];
//                         return (
//                           <TableCell key={column.id} align={column.align}>
//                             {column.format && typeof value === "number"
//                               ? column.format(value)
//                               : value}
//                           </TableCell>
//                         );
//                       })}
//                       <TableCell align="left">
//                       <Button component={Link} to="/" color="inherit">
//             Edit
//           </Button>
//                       </TableCell>
//                       <TableCell>
//                         <IconButton aria-label="delete">
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </>
//   );
// }
//  export default Contract;


const Contract = () => {
  
  const [contract, setContract] = useState([]);
  
  useEffect(() => {
    loadContract();
  }, []);
  
  const loadContract = async () =>{
    let res = await getall();
    // console.log(res)
    setContract(res.data);
  }

  console.log(contract)
  
  
  // let row = [
  //   { id: contract.id, productid: contract.product_id, contractid: contract.contract_id, quantity: contract.quantity },
  // // //   // { id: 2, contractid: "B", productid: "bb", quantity: 1 },
  // // //   // { id: 3, contractid: "C", productid: "cc", quantity: 1 },
  // // //   // { id: 3, contractid: "D", productid: "dd", quantity: 1 },
  // ];

  return (
    <Fragment>
      <Box
        spacing={2}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Link className="nav-link active" to="/create_contract">
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              marginRight: "20px",
              marginBottom: "20px",
            }}
          >
            Create Contract
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Contract ID</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contract.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.contractid}</TableCell>
                <TableCell>{row.productid}</TableCell>
                <TableCell>{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default Contract;
