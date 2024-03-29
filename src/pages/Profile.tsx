import React, { useState } from "react";
import { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Button,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Box,
  Divider,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProfilePosts from "../components/Profile/ProfilePosts";
import axios from "axios";
import ProfileReplies from "../components/Profile/ProfileReplies";
import ProfileLikes from "../components/Profile/ProfileLikes";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton/IconButton";
import Layout from "./Layout";
import SideBar from "../components/SideBar/SideBar";
import { Link as Routerlink } from "react-router-dom";
import { useAppSelector } from "../state/hooks";
import FollowButton from "../components/Common/FollowButton";

const styles = {
  avatar: {
    border: "5px solid white",
    boxSizing: "border-box",
    height: "140px",
    marginTop: "-15%",
    width: "140px",
  },
  avatarContainer: {
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "space-between",
  },
  banner: {
    width: "100%",
    height: "200px",
    backgroundColor: "primary.main",
  },
  bio: { paddingTop: 1 },
  displayName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editProfileButton: {
    textTransform: "none",
    fontWeight: "bold",
    color: "black",
    minWidth: "84px",
    ":hover": {
      backgroundColor: "primary.light",
    },
  },
  followerButtons: {
    color: "black",
    padding: 0,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  followerCount: { fontWeight: "bold" },
  followerContainer: { paddingTop: 1, display: "flex", gap: 3 },
  header: {
    alignItems: "center",
    display: "flex",
  },
  joinedDate: {
    display: "flex",
    color: "grey",
    gap: 0.5,
    paddingTop: 1,
  },
  nameContainer: { paddingTop: 1 },
  profileContent: { padding: 2 },
  tabs: {
    textTransform: "none",
  },
  tweetCount: { fontSize: 13 },
  username: {
    color: "#71797E",
    fontSize: 15,
  },
};

type ProfileContent = {
  postCount: number;
  bio: string;
  joinedDate: string;
  displayName: string;
  username: string;
  followerCount: number;
  followingCount: number;
};

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [value, setValue] = useState("one");
  const user = useAppSelector((state) => state.user);
  const [profileContents, setProfileContents] = useState<ProfileContent>({
    postCount: 0,
    bio: "",
    joinedDate: "",
    displayName: "",
    username: "",
    followerCount: 0,
    followingCount: 0,
  });

  useEffect(() => {
    const fetchProfileContents = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/profile/getProfileContents",
        {
          params: {
            username,
          },
        }
      );
      const date = new Date(result.data.joinedDate);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const formattedDate = `${month} ${year}`;
      setProfileContents({
        ...result.data,
        joinedDate: formattedDate,
      });
    };
    fetchProfileContents();
    window.scrollTo(0, 0);
  }, [value, username]);

  return (
    <Layout
      middleContent={
        <Box>
          <Box style={styles.header}>
            <IconButton onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon color="secondary" />
            </IconButton>
            <Box>
              <Typography sx={styles.displayName}>
                {profileContents.displayName}
              </Typography>
              <Typography sx={styles.tweetCount}>
                {profileContents.postCount} Tweets
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={styles.banner} />
            <Box sx={styles.profileContent}>
              <Box sx={styles.avatarContainer}>
                <Avatar sx={styles.avatar} />
                {profileContents.username === user.username ? (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={styles.editProfileButton}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <FollowButton />
                )}
              </Box>
              <Box sx={styles.nameContainer}>
                <Typography variant="h2" sx={styles.displayName}>
                  {profileContents.displayName}
                </Typography>
                <Typography variant="h3" sx={styles.username}>
                  @{profileContents.username}
                </Typography>
              </Box>
              <Typography sx={styles.bio}>{profileContents.bio}</Typography>
              <Box sx={styles.joinedDate}>
                <CalendarMonthIcon />
                <Typography>Joined {profileContents.joinedDate}</Typography>
              </Box>
              <Box sx={styles.followerContainer}>
                <Link
                  component={Routerlink}
                  to={`/${username}`} // TODO: Create Modal to check followers
                  underline="hover"
                  sx={styles.followerButtons}
                >
                  <Typography component="span" sx={styles.followerCount}>
                    {profileContents.followerCount}
                  </Typography>
                  <Typography component="span"> Followers</Typography>
                </Link>
                <Link
                  component={Routerlink}
                  to={`/${username}`} // TODO: Create Modal to check following
                  underline="hover"
                  sx={styles.followerButtons}
                >
                  <Typography component="span" sx={styles.followerCount}>
                    {profileContents.followingCount}
                  </Typography>
                  <Typography component="span"> Following</Typography>
                </Link>
              </Box>
            </Box>
          </Box>
          <Tabs
            centered
            component="nav"
            onChange={(_: React.SyntheticEvent, newValue: string) =>
              setValue(newValue)
            }
            value={value}
            variant="fullWidth"
          >
            <Tab sx={styles.tabs} value="one" label="Tweets" />
            <Tab sx={styles.tabs} value="two" label="Replies" />
            <Tab sx={styles.tabs} value="three" label="Likes" />
          </Tabs>
          <Divider />
          {value === "one" && (
            <Box>
              <ProfilePosts />
            </Box>
          )}
          {value === "two" && (
            <Box>
              <ProfileReplies />
            </Box>
          )}
          {value === "three" && (
            <Box>
              <ProfileLikes />
            </Box>
          )}
        </Box>
      }
      rightContent={<SideBar />}
    />
  );
};

export default Profile;
