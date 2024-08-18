import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import OneUser from "./OneUser";
import { User } from "../types/SortUserList";
import MyModal from "./Modal";
import { MyButton } from "./MyButton";



export function FilterUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filterCategory, setFilterCategory] = useState<keyof User>("name");
  const [filterValue, setFilterValue] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.log("error ", error);
      }
    };
    fetchUser();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterCategory(event?.target.value as keyof User);
  };

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValue(event?.target.value);
  };

  const applyFilter = () => {
    const filtered = users.filter((user) => {
      if (filterCategory === "address") {
        return user.address.city
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      } else if (filterCategory === "company") {
        return user.company.name
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      } else {
        return user[filterCategory]
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }
    });
    if (filtered.length === 0) {
      setShowModal(true);
      setShowTable(false);
    } else {
      setFilteredUsers(filtered);
      setShowTable(true);
    }
    setFilterValue("");
  };

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <div>
        <Select
          value={filterCategory}
          onChange={handleFilterChange}
          displayEmpty
          inputProps={{ "aria-label": "Filter by category" }}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="address">City</MenuItem>
          <MenuItem value="company">Company</MenuItem>
        </Select>
        <TextField
          value={filterValue}
          onChange={handleFilterValueChange}
          placeholder="Filter value"
        />
        <MyButton  applyFilter={applyFilter} filterValue={filterValue}/>
        {/* <Button
          onClick={applyFilter}
          variant="contained"
          disabled={filterValue.trim() === ""}
        >
          Filter
        </Button> */}
      </div>

      {showModal && <MyModal open={showModal} onClose={handleClose} />}


      {showTable && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ФИО</TableCell>
                <TableCell align="center">email</TableCell>
                <TableCell align="center">аддрес</TableCell>
                <TableCell align="center">компания</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <OneUser key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
