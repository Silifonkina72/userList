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
} from "@mui/material";
import OneUser from "./OneUser";
import { User } from "../types/Types";
import MyModal from "./Modal";
import { MyButton } from "./MyButton";
import "../styles/scss/filterUserList.scss";
import "../styles/scss/oneUser.scss";

export function FilterUserList(): JSX.Element {
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
    const filtered = users.filter((user: User) => {
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
    setShowModal(false);
  };

  return (
    <>
      <div className="user-filter">
        <div className="user-filter__description">
          Также вы можете воспользоваться фильтром, для поиска конкретного
          пользователя
        </div>
        <div className="user-filter__controls">
          <Select
            value={filterCategory}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "Filter by category" }}
            className="user-filter__select"
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
            className="user-filter__textfield"
            InputProps={{ style: { height: 40 } }}
          />
          <MyButton applyFilter={applyFilter} filterValue={filterValue} />
        </div>
      </div>

      {showModal && <MyModal open={showModal} onClose={handleClose} />}

      {showTable && (
        <TableContainer component={Paper} className="user-table__container">
          <Table
            size="small"
            aria-label="a dense table"
            className="user-table__table"
          >
            <TableHead className="user-table__head">
              <TableRow className="user-table__row">
                <TableCell align="center" className="user-table__cell">
                  ФИО
                </TableCell>
                <TableCell align="center" className="user-table__cell">
                  email
                </TableCell>
                <TableCell align="center" className="user-table__cell">
                  аддрес
                </TableCell>
                <TableCell align="center" className="user-table__cell">
                  компания
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="user-table__body">
              {filteredUsers.map((user: User) => (
                <OneUser key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
