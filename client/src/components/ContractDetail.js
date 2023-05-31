import * as React from "react";
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

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
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
  createData("011", "K", "11/01", "K@gmail.com"),
  createData("012", "L", "12/01", "L@gmail.com"),
  createData("013", "M", "13/01", "M@gmail.com"),
  createData("014", "N", "14/01", "N@gmail.com"),
  createData("015", "O", "15/01", "O@gmail.com"),
];

export default function ContractDetail() {
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
      <Stack spacing={2} direction="row">
        <Button variant="contained" sx={{ marginLeft: "auto", marginTop: "20px", marginRight:"20px", marginBottom:"20px"}}>
          Tạo Hợp Đồng
        </Button>
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440, marginLeft:"10px", marginRight:"30px", padding:"5px" }}>
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
