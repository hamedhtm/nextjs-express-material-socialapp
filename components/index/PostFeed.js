import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  addComment,
  addPost,
  deleteComment,
  deletePost,
  getPostFeed,
  likePost,
  unlikePost,
} from "../../lib/api";
import NewPost from "./NewPost";
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2),
  },
}));

const PostFeed = ({ currentUser }) => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  useEffect(() => {
    getPostFeed(currentUser._id).then((posts) => setPosts(posts));
  }, []);

  const handleChange = (name, e) => {
    if (name === "image") {
      setImage(e.target.files[0]);
    } else {
      setText(e.target.value);
    }
  };

  const handleAddPost = () => {
    const postData = new FormData();
    postData.append("image", image);
    postData.append("text", text);

    setIsAddingPost(true);

    addPost(currentUser._id, postData)
      .then((postData) => {
        const updatedPosts = [postData, ...posts];
        setPosts(updatedPosts);
        setIsAddingPost(false);
        setText("");
        setImage("");
      })
      .catch((err) => {
        console.error(err);
        setIsAddingPost(false);
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
    <div className={classes.root}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        color="primary"
        className={classes.title}>
        Post Feed
      </Typography>
      <NewPost
        currentUser={currentUser}
        text={text}
        image={image}
        isAddingPost={isAddingPost}
        handleChange={handleChange}
        handleAddPost={handleAddPost}
      />
      {posts.map((post) => (
        <Post
          key={post._id}
          currentUser={currentUser}
          post={post}
          isDeletingPost={isDeletingPost}
          handleDeletePost={handleDeletePost}
          handleToggleLike={handleToggleLike}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default PostFeed;
