import { Button } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../state/hooks";
import useAxios from "../../utilities/useAxios";

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
  const currentUserId = useAppSelector((state) => state.user.userId);
  const [isHovered, setIsHovered] = useState(false);
  const { sendRequest } = useAxios();

  const handleUnfollow = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await sendRequest(
        {
          method: "PUT",
          data: { currentUserId, visitedUserId },
          headers: { "Content-Type": "application/json" },
        },
        "follow/unfollowUser",
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
