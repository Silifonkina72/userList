import { Button } from "@mui/material";
import React, { memo } from "react";
import { ButtonUpdateProps } from "../types/Types";
import "../styles/scss/button.scss";

export const ButtonUpdate = memo(
  ({ fetchUsers }: ButtonUpdateProps): JSX.Element => {
    return (
      <>
        <Button
          variant="contained"
          onClick={fetchUsers}
          className="user-update"
          disableElevation
        >
          Update
        </Button>
      </>
    );
  }
);
