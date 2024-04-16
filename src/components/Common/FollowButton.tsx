import { Button } from "@mui/material";

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
