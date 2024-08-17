import { TableCell, TableRow } from "@mui/material";
import { OneUserSortProps } from "../types/SortUserList";
import React, { memo } from 'react'

const OneUserSort = memo(({ user }: OneUserSortProps) => {
  return (
    <>
      <TableRow
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
      </TableRow>
    </>
  );
})
export default OneUserSort;
