// components/MyModal.js
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MyModalProps } from "../types/Types";
import "../styles/scss/modal.scss";
import { Modal } from "@mui/material";

function MyModal({ open, onClose }: MyModalProps): JSX.Element {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal">
        <h2 className="modal__title">Ошибка фильтрации</h2>
        <p className="modal__description">
          Нет результатов, соответствующих вашему запросу. Пожалуйста,
          попробуйте еще раз.
        </p>
        <Button onClick={onClose} className="modal__button">
          close
        </Button>
      </Box>
    </Modal>
  );
}

export default MyModal;
