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
      border: 1,
      borderColor: "primary.main",
      color: "primary.main",
    },
  },
};

type FollowingButtonProps = {
  onClick: (e: React.MouseEvent) => void;
};

const FollowingButton = ({ onClick }: FollowingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="small"
      sx={styles.followingButton}
      variant="contained"
    >
      Following
    </Button>
  );
};

export default FollowingButton;
