import React, { useState } from "react";
import { AppBar, Typography, Tabs, Tab } from "@material-ui/core";

import Post from "../../components/index/Post";
import FollowTab from "../../components/profile/FollowTab";

const ProfileTabs = ({
  posts,
  user,
  isDeletingPost,
  handleDeletePost,
  handleToggleLike,
  handleAddComment,
  handleDeleteComment
}) => {

  const [tab, setTab] = useState(0);

  const handleTabChange = (e, value) => {
    setTab(value);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          centered
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <TabContainer>
          {posts.map(post => (
            <Post
              key={post._id}
              currentUser={user}
              post={post}
              isDeletingPost={isDeletingPost}
              handleDeletePost={handleDeletePost}
              handleToggleLike={handleToggleLike}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </TabContainer>
      )}
      {tab === 1 && (
        <TabContainer>
          <FollowTab users={user.following} />
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer>
          <FollowTab users={user.followers} />
        </TabContainer>
      )}
    </div>
  );
};

const TabContainer = ({ children }) => (
  <Typography component="div" style={{ padding: "1em" }}>
    {children}
  </Typography>
);

export default ProfileTabs;
