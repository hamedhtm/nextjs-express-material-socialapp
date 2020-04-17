import React, { useEffect, useState } from "react";
import {
  Paper,
  Divider,
  CircularProgress,
  Typography,
  IconButton,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItem,
  List,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  getUser,
  getPostsByUser,
  deletePost,
  unlikePost,
  likePost,
  addComment,
  deleteComment,
} from "../lib/api";
import FollowUser from "../components/profile/FollowUser";
import { updateCurrentUser } from "../store/_action/user.actions";
import { authInitialProps } from "../lib/auth";
import DeleteUser from "../components/profile/DeleteUser";
import ProfileTabs from "../components/profile/ProfileTabs";

import { format, parseJSON } from "date-fns";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      width: 600,
    },
  },
  title: {
    color: theme.palette.primary.main,
  },
  progress: {
    margin: theme.spacing(2),
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
}));

const Profile = ({ userId, isAuthorize }) => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(
    currentUser
      ? currentUser.following.findIndex(
          (following) => following._id === userId
        ) > -1
      : false
  );
  const [posts, setPosts] = useState([]);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  const getUserPosts = async (id) => {
    return await getPostsByUser(id);
  };

  useEffect(() => {
    if (isAuthorize) {
      setUser(currentUser);
      getUserPosts(currentUser._id).then((posts) => setPosts(posts));
      setLoading(false);
    } else {
      getUser(userId).then((res) => {
        setUser(res);
        getUserPosts(res._id).then((posts) => setPosts(posts));
        setLoading(false);
        // setIsFollowing(
        //   res.followers.findIndex(follower => follower._id === currentUser._id) >
        //     -1
        // );
      });
    }
  }, []);

  const handleFollowers = (request) => {
    setLoadingBtn(true);
    request(userId).then((user) => {
      dispatch(updateCurrentUser(user));
      setIsFollowing(() => !isFollowing);
      setLoadingBtn(false);
    });
  };

  const handleDeletePost = (deletedPost) => {
    setIsDeletingPost(true);
    deletePost(deletedPost._id)
      .then((postData) => {
        const postIndex = posts.findIndex((post) => post._id === postData._id);
        const updatedPosts = [
          ...posts.slice(0, postIndex),
          ...posts.slice(postIndex + 1),
        ];
        setPosts(updatedPosts);
        setIsDeletingPost(false);
      })
      .catch((err) => {
        console.error(err);
        setIsDeletingPost(false);
      });
  };

  const handleToggleLike = (post) => {
    const isPostLiked = post.likes.includes(currentUser._id);
    const sendRequest = isPostLiked ? unlikePost : likePost;
    sendRequest(post._id)
      .then((postData) => {
        const postIndex = posts.findIndex((post) => post._id === postData._id);
        const updatedPosts = [
          ...posts.slice(0, postIndex),
          postData,
          ...posts.slice(postIndex + 1),
        ];
        setPosts(updatedPosts);
      })
      .catch((err) => console.error(err));
  };

  const handleAddComment = (postId, text) => {
    const comment = { text };
    addComment(postId, comment)
      .then((postData) => {
        const postIndex = posts.findIndex((post) => post._id === postData._id);
        const updatedPosts = [
          ...posts.slice(0, postIndex),
          postData,
          ...posts.slice(postIndex + 1),
        ];
        setPosts(updatedPosts);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteComment = (postId, comment) => {
    deleteComment(postId, comment)
      .then((postData) => {
        const postIndex = posts.findIndex((post) => post._id === postData._id);
        const updatedPosts = [
          ...posts.slice(0, postIndex),
          postData,
          ...posts.slice(postIndex + 1),
        ];
        setPosts(updatedPosts);
      })
      .catch((err) => console.error(err));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Paper className={classes.root} elevation={4}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          className={classes.title}
          gutterBottom>
          User Information
        </Typography>
        {loading ? (
          <div className={classes.progressContainer}>
            <CircularProgress
              className={classes.progress}
              size={55}
              thickness={5}
            />
          </div>
        ) : (
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={user.avatar} className={classes.bigAvatar} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />

              {/* Auth - Edit Buttons / UnAuth - Follow Buttons */}
              {isAuthorize ? (
                <ListItemSecondaryAction>
                  <Link href="/edit-profile">
                    <a>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </a>
                  </Link>
                  <DeleteUser user={user} />
                </ListItemSecondaryAction>
              ) : (
                <FollowUser
                  isFollowing={isFollowing}
                  loadingBtn={loadingBtn}
                  handleFollowers={handleFollowers}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={user.about}
                secondary={`Joined: ${format(
                  parseJSON(user.createdAt),
                  "yyyy-MM-dd"
                )}`}
              />
            </ListItem>

            {/* Display User's Posts, Following, and Followers */}
            <ProfileTabs
              posts={posts}
              user={user}
              isDeletingPost={isDeletingPost}
              handleDeletePost={handleDeletePost}
              handleToggleLike={handleToggleLike}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
            />
          </List>
        )}
      </Paper>
    </motion.div>
  );
};

export async function getServerSideProps(context) {
  return (await authInitialProps(true))(context);
}

export default Profile;
