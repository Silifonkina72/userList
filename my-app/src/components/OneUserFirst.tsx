import { TableCell, TableRow } from "@mui/material";
import { OneUserSortProps } from "../types/SortUserList";
import React, { memo } from 'react'
import '../styles/scss/oneUser.scss'

const OneUserFirst = memo(({ user }: OneUserSortProps) => {
  return (
    <>
      
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
  
</TableRow>

    </>
  );
})
export default OneUserFirst;
