import {
  Card,
  CardActions,
  IconButton,
  Avatar,
  TextField,
  Button,
  CardContent,
  CardHeader,
  Typography
} from "@material-ui/core";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";

const styles = theme => ({
  card: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.primary.light
  },
  cardContent: {
    backgroundColor: "white"
  },
  input: {
    display: "none"
  },
  cardActions: {
    display: "flex",
    flexDirection: "row-reverse"
  }
});

const NewPost = ({
  classes,
  currentUser,
  text,
  image,
  isAddingPost,
  handleChange,
  handleAddPost
}) => (
  <Card className={classes.card}>
    <CardHeader
      avatar={<Avatar src={currentUser.avatar} />}
      title={
        <Typography variant="h6" component="h2">
          {currentUser.name}
        </Typography>
      }
      // className={classes.cardHeader}
    />
    <CardContent className={classes.cardContent}>
      <TextField
        label="Add a status"
        value={text}
        name="text"
        multiline
        row="4"
        rowsMax="4"
        placeholder={`What's on your mind, ${currentUser.name}?`}
        fullWidth
        margin="normal"
        onChange={e => handleChange("text", e)}
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <input
        accept="image/*"
        name="image"
        id="image"
        onChange={e => handleChange("image", e)}
        className={classes.input}
        type="file"
      />
      <label htmlFor="image">
        <IconButton color="secondary" component="span">
          <AddAPhoto />
        </IconButton>
      </label>
      <span>{image && image.name}</span>
    </CardContent>
    <CardActions className={classes.cardActions}>
      <Button
        color="primary"
        variant="contained"
        disabled={!text || isAddingPost}
        className={classes.submit}
        onClick={handleAddPost}
      >
        {isAddingPost ? "Sending" : "Post"}
      </Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(NewPost);
