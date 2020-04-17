import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareOutlined from "@material-ui/icons/ShareOutlined";
import { makeStyles } from "@material-ui/core/styles";
import ActiveLink from "./ActiveLink";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/_action/user.actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    // z-index 1 higher than the fixed drawer in home page to clip it under the navigation
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbarTitle: {
    flex: 1,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const Navbar = ({ router }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user) || {};
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      className={classes.appBar}
      position={router.pathname === "/" ? "fixed" : "static"}>
      <Toolbar>
        <ActiveLink href="/">
          <ShareOutlined className={classes.icon} />
        </ActiveLink>
        <Typography
          variant="h5"
          component="h1"
          className={classes.toolbarTitle}>
          <ActiveLink href={"/"}>NextConnect</ActiveLink>
        </Typography>
        {user._id ? (
          // Auth Navigation
          <div>
            <Button>
              <ActiveLink href={`/profile/${user._id}`}>Profile</ActiveLink>
            </Button>
            <Button variant="outlined" onClick={handleLogOut}>
              Sign out
            </Button>
          </div>
        ) : (
          // UnAuth Navigation
          <div>
            <Button>
              <ActiveLink href="/signin">Sign in</ActiveLink>
            </Button>
            <Button>
              <ActiveLink href="/signup">Sign up</ActiveLink>
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
