import React from "react";
import Button from "@material-ui/core/Button";

import { followUser, unFollowUser } from "../../lib/api";

const FollowUser = ({ isFollowing, handleFollowers, loadingBtn }) => {
  const request = isFollowing ? unFollowUser : followUser;

  return (
    <Button
      disabled={loadingBtn}
      variant="contained"
      color={isFollowing ? "secondary" : "primary"}
      onClick={() => handleFollowers(request)}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowUser;
