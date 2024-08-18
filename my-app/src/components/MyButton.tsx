import React from "react";
import { Button } from "@mui/material";
import { MyButtonProps } from "../types/SortUserList";

export function MyButton({ applyFilter, filterValue } : MyButtonProps) {
  return (
    <>
      <Button
        onClick={applyFilter}
        variant="contained"
        disabled={filterValue.trim() === ""}
      >
        Filter
      </Button>
    </>
  );
}
