import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Order, User } from "../types/Types";
import "../styles/scss/sortUserList.scss";
import OneUserFirst from "./OneUserFirst";

export function SortAdaptivFirst(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof User>("name");

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

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedUsers = users.slice().sort((a: User, b: User) => {
    const isAsc = order === "asc";
    let compareResult: number;

    if (orderBy === "address") {
      compareResult =
        a.address.city < b.address.city
          ? -1
          : a.address.city > b.address.city
          ? 1
          : 0;
    } else if (orderBy === "company") {
      compareResult =
        a.company.name < b.company.name
          ? -1
          : a.company.name > b.company.name
          ? 1
          : 0;
    } else {
      compareResult =
        a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
    }

    return isAsc ? compareResult : -compareResult;
  });

  return (
    <>
      <div className="user-table-description">
        Перед вами представлена таблица пользователей с возможностью сортировки
        по ФИО, email, аддрессу и компании
      </div>
      <div className="user-table">
        <TableContainer component={Paper} className="user-table__container">
          <Table
            size="small"
            aria-label="a dense table"
            className="user-table__table"
          >
            <TableHead className="user-table__head">
              <TableRow className="user-table__row">
                <TableCell align="center" className="user-table__cell">
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "name")}
                    className="user-table__sort-label"
                  >
                    ФИО
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" className="user-table__cell">
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={orderBy === "email" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "email")}
                    className="user-table__sort-label"
                  >
                    email
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="user-table__body">
              {sortedUsers.map((user: User) => (
                <OneUserFirst key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
