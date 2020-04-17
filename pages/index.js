import React from "react";
import {
  Button,
  Grid,
  Typography,
  Drawer,
  CircularProgress
} from "@material-ui/core";
import Router from "next/router";

import PostFeed from "../components/index/PostFeed";
import UserFeed from "../components/index/UserFeed";

import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(5)
    }
  },
  progressContainer: {
    height: "80vh"
  },
  progress: {
    margin: theme.spacing(2),
    color: theme.palette.secondary.light
  },
  drawerContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  drawer: {
    width: 350
  },
  drawerPaper: {
    marginTop: 70,
    width: 350
  },
  fabButton: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.primary.light
  },
  heroContent: {
    maxWidth: 600,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    margin: "0 auto"
  }
}));

const Index = () => {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={classes.root}
    >
      {user && user._id ? (
        // Auth User Page
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            <PostFeed currentUser={user} />
          </Grid>
          <Grid item className={classes.drawerContainer}>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              anchor="right"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <UserFeed currentUser={user} />
            </Drawer>
          </Grid>
        </Grid>
      ) : (
        // Splash Page (UnAuth Page)
        <Grid
          justify="center"
          alignItems="center"
          direction="row"
          container
          className={classes.heroContent}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            A Better Social Network
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            component="p"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
            nesciunt suscipit voluptas harum commodi fugiat ab, rem facilis
            alias veritatis labore totam nihil! Distinctio veniam consectetur
            vitae magni. Dolorem, necessitatibus.
          </Typography>
          <Button
            className={classes.fabButton}
            variant="contained"
            color="primary"
            onClick={() => Router.push("/signup")}
          >
            Get Started
          </Button>
        </Grid>
      )}
    </motion.main>
  );
};

export default Index;
