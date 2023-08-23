import { useState } from "react";
import { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button, Typography, Tabs, Tab, Avatar, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProfileTweets from "../components/Profile/ProfileTweets";
import axios from "axios";
import { useAppSelector } from "../state/hooks";
import ProfileReplies from "../components/Profile/ProfileReplies";
import ProfileLikes from "../components/Profile/ProfileLikes";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton/IconButton";
import Layout from "./Layout";
import SideBar from "../components/SideBar/SideBar";
import EditProfileModal from "../components/Profile/EditProfileModal";

const styles = {
  avatar: {
    height: 140,
    marginTop: "-15%",
    width: 140,
  },
  avatarContainer: {
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "space-between",
  },
  banner: { width: "100%", height: "200px" },
  bio: { paddingTop: 1 },
  displayName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editProfileButton: {
    backgroundColor: "black",
  },
  followerButtons: {
    color: "black",
    padding: 0,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  followerCount: { fontWeight: "bold", paddingRight: 0.5 },
  followerContainer: { paddingTop: 1, display: "flex", gap: 3 },
  header: {
    alignItems: "center",
    display: "flex",
  },
  joinedDate: {
    display: "flex",
    gap: 0.5,
    paddingTop: 1,
  },
  nameContainer: { paddingTop: 1 },
  profileContent: { padding: 2 },
  tweetCount: { fontSize: 13 },
  username: {
    color: "#71797E",
    fontSize: 16,
  },
};

type ProfileContent = {
  postCount: number;
  bio: string;
  joinedDate: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [value, setValue] = useState("one");
  const [profileContents, setProfileContents] = useState<ProfileContent>({
    postCount: 0,
    bio: "",
    joinedDate: "",
  });
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchProfileContents = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/profile/getProfileContents",
        {
          params: {
            userId: user.userId,
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
  }, [value, user]);

  return (
    <>
      <Layout
        middleContent={
          <Box>
            <Box style={styles.header}>
              <IconButton onClick={() => navigate(-1)}>
                <KeyboardBackspaceIcon color="secondary" />
              </IconButton>
              <Box>
                <Typography sx={styles.displayName}>
                  {user.displayName}
                </Typography>
                <Typography sx={styles.tweetCount}>
                  {profileContents.postCount} Tweets
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                component="img"
                sx={styles.banner}
                src={process.env.PUBLIC_URL + "/blue.jpg"}
                alt="Temp"
              />
              <Box sx={styles.profileContent}>
                <Box sx={styles.avatarContainer}>
                  <Avatar
                    alt="Profile Picture"
                    src={process.env.PUBLIC_URL + "/rock.jpg"}
                    sx={styles.avatar}
                  />
                  <Button
                    onClick={() => setEditProfileModalOpen(true)}
                    startIcon={<EditIcon />}
                    sx={styles.editProfileButton}
                    variant="contained"
                  >
                    Edit Profile
                  </Button>
                </Box>
                <Box sx={styles.nameContainer}>
                  <Typography variant="h2" sx={styles.displayName}>
                    {user.displayName}
                  </Typography>
                  <Typography variant="h3" sx={styles.username}>
                    @{user.username}
                  </Typography>
                </Box>
                <Typography sx={styles.bio}>{profileContents.bio}</Typography>
                <Box sx={styles.joinedDate}>
                  <CalendarMonthIcon />
                  <Typography>Joined {profileContents.joinedDate}</Typography>
                </Box>
                <Box sx={styles.followerContainer}>
                  <Button sx={styles.followerButtons}>
                    <Typography component="span" sx={styles.followerCount}>
                      500M
                    </Typography>
                    <Typography component="span">Followers</Typography>
                  </Button>
                  <Button sx={styles.followerButtons}>
                    <Typography component="span" sx={styles.followerCount}>
                      0
                    </Typography>
                    <Typography component="span">Following</Typography>
                  </Button>
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
              <Tab value="one" label="Tweets" />
              <Tab value="two" label="Replies" />
              <Tab value="three" label="Likes" />
            </Tabs>
            {value === "one" && (
              <Box>
                <ProfileTweets />
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
      <EditProfileModal
        open={editProfileModalOpen}
        onClose={() => setEditProfileModalOpen(false)}
        editProfileContents={{
          displayName: user.displayName,
          bio: profileContents.bio,
        }}
      />
    </>
  );
};

export default Profile;
