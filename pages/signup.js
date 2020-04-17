import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { Gavel, VerifiedUserTwoTone } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/_action/user.actions";
import CustomSnackbar from "../components/CustomSnackbar";
import Link from "next/link";
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
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    // marginTop: theme.spacing(5),
    padding: theme.spacing(2),
  },
  input: {
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green",
  },
  signinLink: {
    textDecoration: "none",
    color: "white",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.register.loading);
  console.log(loading);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [openSuccess, setOpenSuccess] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string("Enter a name")
      .typeError("Enter a name")
      .required("Name is required"),
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("")
      .min(6, "Password must contain atleast 6 characters")
      .required("Enter your password"),
    confirmPassword: Yup.string("Enter your password")
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });

  const handleSubmit = async (data) => {
    try {
      await dispatch(register(data));
      setOpenSuccess(true);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <motion.div
      className={classes.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="h5" component="h1">
          Sign up
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            values: { name, email, password, confirmPassword },
            errors,
            touched,
          }) => (
            <Form className={classes.form}>
              <Field
                name="name"
                type="input"
                as={TextField}
                label="Name"
                value={name}
                helperText={touched.name ? errors.name : ""}
                error={touched.name && Boolean(errors.name)}
                fullWidth
                required
                className={classes.input}
              />
              <Field
                name="email"
                type="email"
                as={TextField}
                label="Email"
                value={email}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                fullWidth
                required
                className={classes.input}
              />
              <Field
                name="password"
                type="password"
                as={TextField}
                label="Password"
                value={password}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                fullWidth
                required
                className={classes.input}
              />
              <Field
                name="confirmPassword"
                type="password"
                as={TextField}
                label="Confirm Password"
                value={confirmPassword}
                helperText={
                  touched.confirmPassword ? errors.confirmPassword : ""
                }
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                fullWidth
                required
                className={classes.input}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}>
                {loading ? "Signing up..." : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>

      {error && <CustomSnackbar msg={error} type={"error"} />}

      <Dialog
        open={openSuccess}
        disableBackdropClick={true}
        TransitionComponent={Transition}>
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
          New Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            User {user} successfully created!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained">
            <Link href="/signin">
              <a className={classes.signinLink}>Sign in</a>
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default Signup;
