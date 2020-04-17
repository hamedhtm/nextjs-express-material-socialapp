import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/_action/user.actions";
import { motion } from "framer-motion";
import CustomSnackbar from "../components/CustomSnackbar";

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
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [error, setError] = useState("");
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("")
      .min(6, "Password must contain atleast 8 characters")
      .required("Enter your password"),
  });

  const handleSubmit = async (data) => {
    try {
      await dispatch(login(data));
    } catch (e) {
      console.log(e);
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
          <Lock />
        </Avatar>
        <Typography variant="h5" component="h1">
          Sign in
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ values: { email, password }, errors, touched }) => (
            <Form className={classes.form}>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </Form>
          )}
        </Formik>

        {error && <CustomSnackbar msg={error} type={"error"} />}
      </Paper>
    </motion.div>
  );
};

export default SignIn;
