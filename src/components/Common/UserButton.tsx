import { useState } from "react";
import FollowButton from "./FollowButton";
import FollowingButton from "./FollowingButton";

type UserButtonProps = {
  initialFollowStatus: boolean;
  username: string;
};

const UserButton = ({ initialFollowStatus, username }: UserButtonProps) => {
  const [followStatus, setFollowStatus] = useState(initialFollowStatus);

  return followStatus ? (
    <FollowingButton setFollowStatus={setFollowStatus} username={username} />
  ) : (
    <FollowButton setFollowStatus={setFollowStatus} username={username} />
  );
};

export default UserButton;
