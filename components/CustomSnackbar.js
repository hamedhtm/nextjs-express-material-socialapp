import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const CustomSnackbar = ({ msg, type, handleClose }) => {
  const [open, setOpen] = useState(Boolean(msg));

  const handleCloseDefault = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      onClose={handleClose || handleCloseDefault}
      autoHideDuration={4000}>
      <Alert
        onClose={handleClose || handleCloseDefault}
        severity={type}
        elevation={4}
        variant="filled">
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
