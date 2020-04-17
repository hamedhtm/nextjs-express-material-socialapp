import React, {useEffect, useState} from "react";
import {
  Card,
  Avatar,
  Divider,
  IconButton,
  Typography,
  CardActions,
  CardContent,
  CardHeader,
  Badge
} from "@material-ui/core";
import {
  Comment,
  FavoriteBorder,
  Favorite,
  DeleteTwoTone
} from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "next/link";
import Comments from "./Comments";

import {formatDistance, parseJSON } from 'date-fns'

const styles = theme => ({
  card: {
    marginBottom: theme.spacing(3)
  },
  cardContent: {
    backgroundColor: "white"
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: "rgba(11, 61, 130, 0.06)"
  },
  imageContainer: {
    textAlign: "center",
    padding: theme.spacing(1)
  },
  image: {
    height: 200
  },
  favoriteIcon: {
    color: theme.palette.favoriteIcon
  },
  commentIcon: {
    color: theme.palette.commentIcon
  }
});

const Post = ({
  classes,
  post,
  currentUser,
  isDeletingPost,
  handleDeletePost,
  handleToggleLike,
  handleAddComment,
  handleDeleteComment
}) => {

  const isPostCreator = post.postedBy._id === currentUser._id;
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLike] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
    setNumLike(post.likes.length);
  }, [post.likes]);

  useEffect(() => {
    setComments(post.comments)
  }, [post.comments.length]);

  return (
    <Card className={classes.card}>
      {/* Post Header */}
      <CardHeader
        avatar={<Avatar src={post.postedBy.avatar} />}
        action={
          isPostCreator && (
            <IconButton
              disabled={isDeletingPost}
              onClick={() => handleDeletePost(post)}
            >
              <DeleteTwoTone color="secondary" />
            </IconButton>
          )
        }
        title={
          <Link href={`/profile/${post.postedBy._id}`}>
            <a>{post.postedBy.name}</a>
          </Link>
        }
        subheader={formatDistance(parseJSON(post.createdAt), new Date(), {addSuffix: true})}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body1" className={classes.text}>
          {post.text}
        </Typography>
        {/* Post Image */}
        {post.image && (
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              src={post.image}
              alt={"post image"}
            />
          </div>
        )}
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => handleToggleLike(post)}
          className={classes.button}
        >
          <Badge badgeContent={numLikes} color="secondary" showZero>
            {isLiked ? (
              <Favorite className={classes.favoriteIcon} />
            ) : (
              <FavoriteBorder className={classes.favoriteIcon} />
            )}
          </Badge>
        </IconButton>
        <IconButton className={classes.button}>
          <Badge badgeContent={comments.length} color="primary" showZero>
            <Comment className={classes.commentIcon} />
          </Badge>
        </IconButton>
      </CardActions>
      <Divider />
      {/* Comments Area */}
      <Comments
          currentUser={currentUser}
          postId={post._id}
          comments={comments}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
      />
    </Card>
  );
};

export default withStyles(styles)(Post);
