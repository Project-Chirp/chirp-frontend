import { Button } from "@mui/material";
import { useAppSelector } from "../../state/hooks";
import axios from "axios";
import { useState } from "react";

const styles = {
  followingButton: {
    backgroundColor: "white.main",
    border: 1,
    boxShadow: "none",
    color: "primary.main",
    fontWeight: "bold",
    minWidth: "84px",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "white.main",
      border: 1,
      borderColor: "error.main",
      color: "error.main",
    },
  },
};

type FollowingButtonProps = {
  onClick?: () => void;
  visitedUserId: number;
};

const FollowingButton = ({ onClick, visitedUserId }: FollowingButtonProps) => {
  const user = useAppSelector((state) => state.user);
  const [isHovered, setIsHovered] = useState(false);

  const handleUnfollow = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/follow/unfollowUser`,
        {
          currentUserId: user.userId,
          visitedUserId: visitedUserId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onClick?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleUnfollow}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      size="small"
      sx={styles.followingButton}
      variant="contained"
    >
      {isHovered ? "Unfollow" : "Following"}
    </Button>
  );
};

export default FollowingButton;
