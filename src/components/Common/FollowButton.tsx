import { Button } from "@mui/material";

const styles = {
  followButton: {
    boxShadow: "none",
    backgroundColor: "primary.main",
    textTransform: "none",
    fontWeight: "bold",
    minWidth: "84px",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "primary.dark",
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
      size="small"
      onClick={handleFollow}
      sx={styles.followButton}
      variant="contained"
    >
      Follow
    </Button>
  );
};

export default FollowButton;
