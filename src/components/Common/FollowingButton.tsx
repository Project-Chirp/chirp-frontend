import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
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
  setFollowStatus: Dispatch<SetStateAction<boolean>>;
  username: string;
};

const FollowingButton = ({
  setFollowStatus,
  username,
}: FollowingButtonProps) => {
  const user = useAppSelector((state) => state.user);

  const handleUnfollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
