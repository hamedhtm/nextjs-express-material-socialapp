import React, { useState } from "react";
import {
  CardHeader,
  FormControl,
  InputLabel,
  Input,
  Avatar
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "next/link";

import {formatDistance, parseJSON } from 'date-fns'

const styles = theme => ({
  comments: {
    backgroundColor: "rgba(11, 61, 130, 0.06)"
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  smallAvatar: {
    margin: 10
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em"
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer"
  }
});

const Comments = ({
  classes,
  currentUser,
  comments,
  postId,
  handleAddComment,
  handleDeleteComment
}) => {
  const [text, setText] = useState("");

  const handleChange = e => setText(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    handleAddComment(postId, text);
    setText("");
  };

  const showComment = comment => {
    const isCommentCreator = comment.postedBy._id === currentUser._id;
    return (
      <div>
        <Link href={`/profile/${comment.postedBy._id}`}>
          <a>{comment.postedBy.name}</a>
        </Link>
        <br />
        {comment.text}
        <span className={classes.commentDate}>
          {formatDistance(parseJSON(comment.createdAt), new Date(), {addSuffix: true})}
          {isCommentCreator && (
            <Delete
              color="secondary"
              className={classes.commentDelete}
              onClick={() => handleDeleteComment(postId, comment)}
            />
          )}
        </span>
      </div>
    );
  };

  return (
    <div className={classes.comments}>
      {/* Comment Input */}
      <CardHeader
        avatar={
          <Avatar className={classes.smallAvatar} src={currentUser.avatar} />
        }
        title={
          <form onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="add-comment">Add comments</InputLabel>
              <Input
                id="add-comment"
                name="text"
                placeholder="Reply to this post"
                value={text}
                onChange={handleChange}
              />
            </FormControl>
          </form>
        }
        className={classes.cardHeader}
      />

      {/* Comments */}
      {comments.map(comment => (
        <CardHeader
          key={comment._id}
          avatar={
            <Avatar
              className={classes.smallAvatar}
              src={comment.postedBy.avatar}
            />
          }
          title={showComment(comment)}
          className={classes.cardHeader}
        />
      ))}
    </div>
  );
};

export default withStyles(styles)(Comments);
