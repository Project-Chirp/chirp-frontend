import { Button } from "@mui/material";

const styles = {
  followingButton: {
    boxShadow: "none",
    textTransform: "none",
    fontWeight: "bold",
    minWidth: "84px",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "gray.light",
      color: "primary.main",
      border: 1,
      borderColor: "primary.main",
    },
  },
};

type FollowingButtonProps = {
  onClick: () => void;
};

const FollowingButton = ({ onClick }: FollowingButtonProps) => {
  return (
    <Button
      sx={styles.followingButton}
      onClick={onClick}
      size="small"
      variant="contained"
    >
      Following
    </Button>
  );
};

export default FollowingButton;
