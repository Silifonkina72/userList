import { TableCell, TableRow } from "@mui/material";
import { OneUserSortProps } from "../types/Types";
import React, { memo } from "react";
import "../styles/scss/oneUser.scss";

const OneUser = memo(({ user }: OneUserSortProps): JSX.Element => {
  return (
    <>
      <TableRow
        key={user.id}
        className="user-one-table__row"
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell
          component="th"
          scope="row"
          align="center"
          className="user-one-table__cell"
        >
          {user.name}
        </TableCell>
        <TableCell align="center" className="user-one-table__cell">
          {user.email}
        </TableCell>
        <TableCell
          align="center"
          className="user-one-table__cell user-one-table__cell--address"
        >
          <span className="user-one-table__highlight"> City:</span>{" "}
          {user.address.city}, <br></br>
          <span className="user-one-table__highlight">zipcode:</span>{" "}
          {user.address.zipcode}
        </TableCell>
        <TableCell align="center" className="user-one-table__cell">
          {user.company.name}
        </TableCell>
      </TableRow>
    </>
  );
});
export default OneUser;
