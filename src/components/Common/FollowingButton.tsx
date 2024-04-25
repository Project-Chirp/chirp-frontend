import { Button } from "@mui/material";
import { useAppSelector } from "../../state/hooks";
import axios from "axios";

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
  visitedUserId: number;
};

const FollowingButton = ({ onClick, visitedUserId }: FollowingButtonProps) => {
  const user = useAppSelector((state) => state.user);

  const handleUnfollow = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await axios.put(
        "http://localhost:3001/api/follow/unfollowUser",
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