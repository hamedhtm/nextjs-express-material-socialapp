import React, { useState } from "react";
import {
  Avatar,
  Button,
  Typography,
  Input,
  InputLabel,
  FormControl,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Dialog,
  Paper,
  Slide,
} from "@material-ui/core";
import {
  VerifiedUserTwoTone,
  // FaceTwoTone,
  CloudUpload,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { authInitialProps } from "../lib/auth";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../lib/api";
import { updateCurrentUser } from "../store/_action/user.actions";
import Router from "next/router";
import CustomSnackbar from "../components/CustomSnackbar";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  title: {
    color: theme.palette.primary.main,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.25em",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  signinLink: {
    textDecoration: "none",
    color: "white",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  snack: {
    color: theme.palette.secondary.light,
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green",
  },
  input: {
    display: "none",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditProfile = () => {
  const classes = useStyles();
  const { avatar, email, name, _id } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    name,
    email,
  });
  const [newAvatar, setNewAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [openSuccess, setOpenSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (name, e) => {
    if (name === "avatar") {
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
      setNewAvatar(e.target.files[0]);
    } else {
      setValue({
        ...value,
        [name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("avatar", newAvatar);
    userData.append("name", value.name);
    userData.append("email", value.email);
    setIsSaving(true);
    updateUser(_id, userData)
      .then((updatedUser) => {
        console.log(updatedUser);
        dispatch(updateCurrentUser(updatedUser));
        setOpenSuccess(true);
        setTimeout(() => Router.push(`/profile/${_id}`), 3000);
      })
      .catch((err) => {
        const error = (err.response && err.response.data) || err.message;
        setIsSaving(false);
        setError(error);
      });
  };

  return (
    <motion.div
      className={classes.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h1" className={classes.title}>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Avatar src={avatarPreview || avatar} className={classes.bigAvatar} />
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            onChange={(e) => handleChange("avatar", e)}
            className={classes.input}
          />
          <label htmlFor="avatar" className={classes.uploadButton}>
            <Button variant="contained" color="secondary" component="span">
              Upload Image <CloudUpload />
            </Button>
          </label>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              type="text"
              name="name"
              value={value.name || name}
              onChange={(e) => handleChange("name", e)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              type="email"
              name="email"
              value={value.email || email}
              onChange={(e) => handleChange("email", e)}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            disabled={isSaving}
            variant="contained"
            color="primary"
            className={classes.submit}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </form>
      </Paper>
      {error && <CustomSnackbar msg={error} type={"error"} />}

      <Dialog
        open={openSuccess}
        disableBackdropClick={true}
        TransitionComponent={Transition}>
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
          Profile Updated
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            User {name} was successfully updated!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export async function getServerSideProps(context) {
  return (await authInitialProps(true))(context);
}

export default EditProfile;
