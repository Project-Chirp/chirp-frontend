import React from "react";
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

const styles = {
  arrowBtn: {
    border: "none",
    backgroundColor: "white",
  },
  arrowText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  avatar: {
    width: 140,
    height: 140,
    left: 25,
    zIndex: 2,
    top: -80,
  },
  editBtn: {
    backgroundColor: "black",
    textTransform: "none",
    marginLeft: 62,
    marginTop: 2,
  },
  displayName: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  usernameDisplay: {
    fontWeight: "normal",
    fontSize: 20,
    color: "#71797E",
    marginBottom: 15,
  },
  menu: { marginTop: 60, marginRight: 83 },
  tabSelection: {
    marginLeft: 85,
  },
  header: {
    height: "60px",
    paddingTop: 10,
    display: "flex",
    alignItems: "center",
  },
  tweetCountStyle: { fontWeight: "normal", fontSize: 15 },
  followercountbtn: {
    border: "none",
    fontSize: 15,
    padding: 0,
    backgroundColor: "white",
    color: "black",
    textTransform: "none",
    marginTop: 2,
  },
  followingcountbtn: {
    border: "none",
    fontSize: 15,
    padding: 0,
    marginLeft: 5,
    color: "black",
    backgroundColor: "white",
    textTransform: "none",
    marginTop: 2,
  },
  bioDisplay: {
    marginBottom: 20,
  },
  parentBox: {
    width: "100%",
  },
  avatarBannerBox: {
    height: 200,
  },
  profileInfoBox: {
    paddingLeft: 15,
    paddingTop: 20,
  },
  calendarBox: {
    alignItems: "center",
    display: "flex",
  },
};

type ProfileContent = {
  postCount: number;
  bio: string;
  joinedDate: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("one");
  const [profileContents, setProfileContents] = React.useState<ProfileContent>({
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
    <Layout
      mainContent={
        <Box>
          <Box style={styles.header}>
            <IconButton style={styles.arrowBtn} onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon color="secondary" />
            </IconButton>
            <Box>
              <Typography sx={styles.arrowText}>{user.username}</Typography>
              <Typography sx={styles.tweetCountStyle}>
                {profileContents.postCount} Tweets
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.avatarBannerBox}>
            <Box
              component="img"
              sx={{ position: "relative", width: "100%", height: "200px" }}
              src={process.env.PUBLIC_URL + "/blue.jpg"}
              alt="temp"
            />
            <Avatar
              alt="profile picture"
              src={process.env.PUBLIC_URL + "/rock.jpg"}
              sx={styles.avatar}
            />
          </Box>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={styles.editBtn}
          >
            Edit Profile
          </Button>

          <Box style={styles.profileInfoBox}>
            <Typography variant={"h2"} style={styles.displayName}>
              {user.displayName}
            </Typography>
            <Typography variant={"h3"} style={styles.usernameDisplay}>
              @{user.username}
            </Typography>
            <Typography style={styles.bioDisplay}>
              {profileContents.bio}
            </Typography>
            <Box style={styles.calendarBox}>
              <CalendarMonthIcon />
              <Typography>Joined {profileContents.joinedDate}</Typography>
            </Box>
            <Button sx={styles.followercountbtn}>
              <Box>
                <b>500M</b> Followers
              </Box>
            </Button>
            <Button sx={styles.followingcountbtn}>
              <Box>
                <b>0</b> Following
              </Box>
            </Button>
          </Box>
          <Tabs
            value={value}
            onChange={(_: React.SyntheticEvent, newValue: string) =>
              setValue(newValue)
            }
          >
            <Tab value="one" style={styles.tabSelection} label="Tweets" />
            <Tab value="two" style={styles.tabSelection} label="Replies" />
            <Tab value="three" style={styles.tabSelection} label="Likes" />
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
    />
  );
};

export default Profile;
