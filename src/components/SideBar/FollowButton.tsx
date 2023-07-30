import { Button } from "@mui/material";

const styles = {
  followButton: {
    boxShadow: "none",
    backgroundColor: "primary.main",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#1E9964", // Could be primary.dark
    },
  },
};

type FollowButtonProps = {
  onClick?: () => void;
};

const FollowButton = ({ onClick }: FollowButtonProps) => {
  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
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
