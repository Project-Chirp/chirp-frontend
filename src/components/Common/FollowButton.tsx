import { Button } from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../state/hooks";

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
};

type FollowButtonProps = {
  onClick: () => void;
  username?: string;
};

const FollowButton = ({ onClick, username }: FollowButtonProps) => {
  const user = useAppSelector((state) => state.user);

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await axios.put(
        "http://localhost:3001/api/follow/followUser",
        {
          currentUserId: user.userId,
          visitedUsername: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onClick();
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
