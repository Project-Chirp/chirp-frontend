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
  username?: string;
};

const UserAvatar = ({ username }: UserAvatarProps) => {
  return (
    <Link component={Routerlink} to={`/${username}`}>
      <Avatar sx={styles.avatar} />
    </Link>
  );
};

export default UserAvatar;
