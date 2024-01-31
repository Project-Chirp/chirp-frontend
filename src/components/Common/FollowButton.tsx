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
  onClick: () => void;
};

const FollowButton = ({ onClick }: FollowButtonProps) => {
  return (
    <Button
      sx={styles.followButton}
      onClick={onClick}
      size="small"
      variant="contained"
    >
      Follow
    </Button>
  );
};

export default FollowButton;
