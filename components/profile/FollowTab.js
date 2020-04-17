import React from "react";
import { Avatar, Typography, GridList, GridListTile } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "next/link";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto"
  },
  gridList: {
    width: 300,
    [theme.breakpoints.up("sm")]: {
      width: 400
    }
  },
  tileText: {
    textAlign: "center",
    marginTop: 10
  }
});

const FollowTab = ({ classes, users }) => (
  <div className={classes.root}>
    <GridList cellHeight={160} className={classes.gridList} cols={4}>
      {users.map(user => (
        <GridListTile style={{ height: 120 }} key={user._id}>
          <Link href={`/profile/${user._id}`}>
            <a>
              <Avatar src={user.avatar} className={classes.bigAvatar} />
              <Typography
                component="h3"
                variant="subtitle1"
                className={classes.tileText}
              >
                {user.name}
              </Typography>
            </a>
          </Link>
        </GridListTile>
      ))}
    </GridList>
  </div>
);

export default withStyles(styles)(FollowTab);
