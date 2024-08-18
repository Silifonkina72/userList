// components/MyModal.js
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MyModalProps } from '../types/SortUserList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  minHeight: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

function MyModal({ open, onClose } : MyModalProps) {
  return (
    <Box sx={style}>
      <h2 id="modal-modal-title">Ошибка фильтрации</h2>
      <p id="modal-modal-description">
        Нет результатов, соответствующих вашему запросу. Пожалуйста, попробуйте еще раз.
      </p>
      <Button onClick={onClose}>close</Button>
    </Box>
  );
}

export default MyModal;