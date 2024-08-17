

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TextField, Button, Modal, Box } from '@mui/material';
import OneUserSort from '../components/OneUserSort';
import { User } from '../types/SortUserList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function FilterUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filterCategory, setFilterCategory] = useState<keyof User>('name');
  const [filterValue, setFilterValue] = useState<string>('');
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

  const handleFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event?.target.value);
  };

  const applyFilter = () => {
    const filtered = users.filter(user => {
      if (filterCategory === 'address') {
        return user.address.city.toLowerCase().includes(filterValue.toLowerCase());
      } else if (filterCategory === 'company') {
        return user.company.name.toLowerCase().includes(filterValue.toLowerCase());
      } else {
        return user[filterCategory].toString().toLowerCase().includes(filterValue.toLowerCase());
      }
    });
    if (filtered.length === 0) {
      setShowModal(true);
      setShowTable(false);
    } else {
      setFilteredUsers(filtered);
      setShowTable(true);
    }
    setFilterValue('');
  };

  return (
    <>
      <div>
        <Select
          value={filterCategory}
          onChange={handleFilterChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Filter by category' }}
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
        <Button onClick={applyFilter} variant="contained" disabled={filterValue.trim() === ''}>Filter</Button>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-modal-title">Ошибка фильтрации</h2>
          <p id="modal-modal-description">
            Нет результатов, соответствующих вашему запросу. Пожалуйста, попробуйте еще раз.
          </p>
          <Button onClick={()=>setShowModal(false)}>close</Button>
        </Box>
      </Modal>

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
                <OneUserSort key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}