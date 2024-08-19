import React from "react";
import { Button } from "@mui/material";
import { MyButtonProps } from "../types/Types";
import "../styles/scss/button.scss";

export function MyButton({
  applyFilter,
  filterValue,
}: MyButtonProps): JSX.Element {
  return (
    <>
      <Button
        onClick={applyFilter}
        variant="contained"
        disableElevation
        disabled={filterValue.trim() === ""}
        className="user-filter__button"
      >
        Filter
      </Button>
    </>
  );
}
