import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  IconButton,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

import { deleteUser } from "../../lib/api";
import { logout } from "../../store/_action/user.actions";

const DeleteUser = ({ user }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteUser = () => {
    setIsDeleting(true);
    deleteUser(user._id)
      .then(() => dispatch(logout()))
      .catch((err) => {
        console.log(err.message);
        setIsDeleting(true);
      });
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} color="secondary">
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            color="secondary"
            disabled={isDeleting}>
            {isDeleting ? "Deleting" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;
