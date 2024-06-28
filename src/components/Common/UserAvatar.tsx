import { Avatar, Link } from "@mui/material";
import { Link as Routerlink } from "react-router-dom";

const styles = {
  avatar: {
    opacity: 0.75,
    "&:hover": {
      opacity: 1,
    },
  },
};

type UserAvatarProps = {
  onClick?: (event: React.MouseEvent) => void;
  username?: string;
};

const UserAvatar = ({ onClick, username }: UserAvatarProps) => {
  return (
    <Link component={Routerlink} to={`/${username}`} onClick={onClick}>
      <Avatar sx={styles.avatar} />
    </Link>
  );
};

export default UserAvatar;
