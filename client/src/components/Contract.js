import * as React from "react";
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
import { IconButton,  } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


function handleClick(id) {
  // Define the logic for handling the button click here
  console.log(`Button clicked for row with id ${id}`);
}

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "customerid", label: "ID Khach Hang", minWidth: 170 },

  { id: "tenkhachhang", label: "Ten Khach Hang", minWidth: 100 },
  {
    id: "ngayhopdong",
    label: "Ngay Hop Dong",
    minWidth: 170,
    align: "right",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
  },
  {
    id: "button",
    label: "",
    minWidth: 170,
    align: "center",
  },
];

function createData(id, tenkhachhang, ngayhopdong, email) {
  return { id, tenkhachhang, ngayhopdong, email };
}

const rows = [
  createData("001", "NGUYEN VAN A", "01/01", "A@gmail.com"),
  createData("002", "B", "02/01", "B@gmail.com"),
  createData("003", "C", "03/01", "C@gmail.com"),
  createData("004", "D", "04/01", "D@gmail.com"),
  createData("005", "E", "05/01", "E@gmail.com"),
  createData("006", "F", "06/01", "F@gmail.com"),
  createData("007", "G", "07/01", "G@gmail.com"),
  createData("008", "H", "08/01", "H@gmail.com"),
  createData("009", "I", "09/01", "I@gmail.com"),
  createData("010", "J", "10/01", "J@gmail.com"),
];

export default function Contract() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
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
            Tạo Hợp Đồng
          </Button>
        </Link>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          sx={{
            maxHeight: 440,
            marginLeft: "10px",
            marginRight: "30px",
            padding: "5px",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={() => handleClick(row.id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
