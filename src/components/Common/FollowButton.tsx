import { Button } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "../../state/hooks";
import useAxios from "../../utilities/useAxios";

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
  const user = useAppSelector((state) => state.user);
  const { loading, error, sendRequest } = useAxios();

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await sendRequest({
        endpoint: "follow/followUser",
        method: "PUT",
        body: { visitedUserId },
        headers: { "Content-Type": "application/json" },
      });
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
