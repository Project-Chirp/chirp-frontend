import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../state/hooks";
import axios from "axios";
import { ProfileContent } from "../../pages/Profile";

const styles = {
  followingButton: {
    boxShadow: "none",
    textTransform: "none",
    fontWeight: "bold",
    minWidth: "84px",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "gray.light",
      border: 1,
      borderColor: "primary.main",
      color: "primary.main",
    },
  },
};

type FollowingButtonProps = {
  onClick: () => void;
  username?: string;
};

const FollowingButton = ({ onClick, username }: FollowingButtonProps) => {
  const user = useAppSelector((state) => state.user);

  const handleUnfollow = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await axios.put(
        "http://localhost:3001/api/follow/unfollowUser",
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
      onClick={handleUnfollow}
      size="small"
      sx={styles.followingButton}
      variant="contained"
    >
      Following
    </Button>
  );
};

export default FollowingButton;
