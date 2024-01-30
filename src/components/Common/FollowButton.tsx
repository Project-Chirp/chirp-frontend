import { Button } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "../../state/hooks";
import { useEffect, useState } from "react";

const styles = {
  followButton: {
    backgroundColor: "primary.main",
    boxShadow: "none",
    fontWeight: "bold",
    minWidth: "84px",
    "&:hover": {
      backgroundColor: "primary.dark",
      boxShadow: "none",
    },
    textTransform: "none",
  },
  followingButton: {
    boxShadow: "none",
    textTransform: "none",
    fontWeight: "bold",
    minWidth: "84px",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "gray.light",
    },
  },
};

type FollowButtonProps = {
  username?: string;
};

const FollowButton = ({ username }: FollowButtonProps) => {
  const user = useAppSelector((state) => state.user);
  const [followStatus, setFollowStatus] = useState(false);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/profile/getFollowStatus",
        {
          params: {
            userId: user.userId,
            username,
          },
        }
      );
      console.log(result.data);
      setFollowStatus(result.data.followStatus);
    };

    if (user.username !== username) {
      fetchFollowStatus();
    }
  }, [followStatus]);

  const followUsers = async () => {
    try {
      await axios.put(
        "http://localhost:3001/api/profile/followUser",
        {
          userId: user.userId,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFollowStatus(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowUsers = async () => {
    try {
      await axios.put(
        "http://localhost:3001/api/profile/unfollowUser",
        {
          userId: user.userId,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFollowStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (followStatus) {
      unfollowUsers();
    } else {
      followUsers();
    }
  };

  return followStatus ? (
    <Button
      onClick={handleFollow}
      size="small"
      sx={styles.followingButton}
      variant="outlined"
    >
      Following
    </Button>
  ) : (
    <Button
      onClick={handleFollow}
      size="small"
      sx={styles.followButton}
      variant="contained"
    >
      Follow
    </Button>
  );
};

export default FollowButton;
