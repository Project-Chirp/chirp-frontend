import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import FollowButton from "./FollowButton";
import FollowingButton from "./FollowingButton";

type UserButtonProps = {
  username: string;
  initialFollowStatus: boolean;
};

const UserButton = ({ username, initialFollowStatus }: UserButtonProps) => {
  const user = useAppSelector((state) => state.user);
  const [followStatus, setFollowStatus] = useState(initialFollowStatus);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/profile/getFollowStatus",
        {
          params: {
            userId: user.userId,
            username,
          },
        }
      );
      setFollowStatus(result.data.followStatus);
    };

    if (user.username !== username) {
      fetchFollowStatus();
    }
  }, [followStatus]);

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await axios.put(
        "http://localhost:3001/api/profile/followUser",
        {
          userId: user.userId,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFollowStatus(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await axios.put(
        "http://localhost:3001/api/profile/unfollowUser",
        {
          userId: user.userId,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFollowStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  return followStatus ? (
    <FollowingButton onClick={handleUnfollow} />
  ) : (
    <FollowButton onClick={handleFollow} />
  );
};

export default UserButton;
