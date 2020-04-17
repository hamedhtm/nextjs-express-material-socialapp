import React, { useEffect, useState } from "react";
import {
  Divider,
  Typography,
  IconButton,
  Avatar,
  Button,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItem,
  List,
} from "@material-ui/core";
import AccountBox from "@material-ui/icons/AccountBox";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

import { getUserFeed, followUser } from "../../lib/api";
import CustomSnackbar from "../CustomSnackbar";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../store/_action/user.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  follow: {
    right: theme.spacing(2),
  },
  snack: {
    color: theme.palette.primary.light,
  },
  viewButton: {
    verticalAlign: "middle",
  },
}));

const UserFeed = ({ currentUser }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [usersFeed, setUsersFeed] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    getUserFeed(currentUser._id).then((res) => setUsersFeed(res));
  }, []);

  const handleFollow = (user, userIndex) => {
    followUser(user._id).then(() => {
      const updatedUsers = [
        ...usersFeed.slice(0, userIndex),
        ...usersFeed.slice(userIndex + 1),
      ];
      const newFollowing = currentUser.following;
      const isFollowing =
        newFollowing.findIndex((following) => following._id === user._id) > -1;
      !isFollowing &&
        newFollowing.push({
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
        });
      const updateUser = {
        ...currentUser,
        following: [...newFollowing],
      };
      dispatch(updateCurrentUser(updateUser));
      setUsersFeed(updatedUsers);
      setOpenSuccess(true);
    });
  };

  const handleClose = () => setOpenSuccess(false);

  return (
    <div>
      <Typography type="title" variant="h6" component="h2" align="center">
        Browse Users
      </Typography>
      <Divider />

      {/* Users List */}
      <List>
        {usersFeed.map((user, i) => (
          <span key={user._id}>
            <ListItem>
              <ListItemAvatar className={classes.avatar}>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <ListItemText primary={user.name} />
              <ListItemSecondaryAction className={classes.follow}>
                <Link href={`/profile/${user._id}`}>
                  <IconButton
                    variant="contained"
                    color="secondary"
                    className={classes.viewButton}>
                    <AccountBox />
                  </IconButton>
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleFollow(user, i)}>
                  Follow
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </span>
        ))}
      </List>

      {/* Follow User Snackbar */}
      {openSuccess && (
        <CustomSnackbar
          error={"Following Successfully"}
          type={"success"}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default UserFeed;
