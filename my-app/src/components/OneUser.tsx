import { TableCell, TableRow } from "@mui/material";
import { OneUserSortProps } from "../types/SortUserList";
import React, { memo } from 'react'
import '../styles/scss/oneUser.scss'

const OneUser = memo(({ user }: OneUserSortProps) => {
  return (
    <>
      {/* <TableRow
        key={user.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row" align="center">
          {user.name}
        </TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">
          City: {user.address.city}, zipcode: {user.address.zipcode}
        </TableCell>
        <TableCell align="center">{user.company.name}</TableCell>
      </TableRow> */}

<TableRow
  key={user.id}
  className="user-one-table__row"
  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
>
  <TableCell component="th" scope="row" align="center" className="user-one-table__cell">
    {user.name}
  </TableCell>
  <TableCell align="center" className="user-one-table__cell">
    {user.email}
  </TableCell>
  <TableCell align="center" className="user-one-table__cell user-one-table__cell--address">
  <span className="user-one-table__highlight"> City:</span>  {user.address.city}, <span className="user-one-table__highlight">zipcode:</span> {user.address.zipcode}
  </TableCell>
  <TableCell align="center" className="user-one-table__cell">
    {user.company.name}
  </TableCell>
</TableRow>

    </>
  );
})
export default OneUser;
