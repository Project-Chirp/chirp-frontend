import { Avatar, Link } from "@mui/material";
import React from "react";
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
  userId?: number;
};

const UserAvatar = ({ userId }: UserAvatarProps) => {
  return (
    <Link component={Routerlink} to={`/user/${userId}`}>
      <Avatar sx={styles.avatar} />
    </Link>
  );
};

export default UserAvatar;
