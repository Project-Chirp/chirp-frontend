import { Button } from "@mui/material";
import useAxios from "../../utilities/useAxios";
import { useAppSelector } from "../../state/hooks";

const styles = {
  followButton: {
    boxShadow: "none",
    fontWeight: "bold",
    minWidth: "84px",
    "&:hover": {
      boxShadow: "none",
    },
  },
};

type FollowButtonProps = {
  onClick?: () => void;
  visitedUserId: number;
};

const FollowButton = ({ onClick, visitedUserId }: FollowButtonProps) => {
  const currentUserId = useAppSelector((state) => state.user.userId);
  const { sendRequest } = useAxios();

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await sendRequest(
        {
          method: "PUT",
          data: { currentUserId, visitedUserId },
          headers: { "Content-Type": "application/json" },
        },
        "follow/followUser"
      );
      onClick?.();
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
