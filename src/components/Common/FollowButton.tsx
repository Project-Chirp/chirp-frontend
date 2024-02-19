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
  onClick: (e: React.MouseEvent) => void;
};

const FollowButton = ({ onClick }: FollowButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="small"
      sx={styles.followButton}
      variant="contained"
    >
      Follow
    </Button>
  );
};

export default FollowButton;
