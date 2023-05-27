import React from "react";
import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography, Tabs, Tab, Avatar, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProfileTweets from "../components/Posts/ProfileTweets";
import axios from "axios";
import { useAppSelector } from "../state/hooks";
import ProfileReplies from "../components/Posts/ProfileReplies";
import ProfileLikes from "../components/Posts/ProfileLikes";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const styles = {
  userProfileArrow: {},
  rightBound: {},
  arrowBtn: {
    border: "none",
    backgroundColor: "white",
    position: "absolute" as "absolute",
  },
  arrowText: {
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 125,
    height: 125,
    position: "absolute",
    left: 20,
    top: 135,
  },
  editBtn: {
    backgroundColor: "black",
    borderRadius: 20,
    textTransform: "none",
    marginLeft: 62,
    marginTop: 2,
  },
  displayName: {
    fontSize: 30,
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
  header: { height: "60px", paddingTop: 10 },
  tweetCountStyle: { fontWeight: "normal", paddingLeft: 5, fontSize: 18 },
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
};

const Profile = () => {
  const [value, setValue] = React.useState("one");
  const [tweetCount, setTweetCount] = React.useState();
  const [bio, setBio] = React.useState();
  const [joinDate, setJoinDate] = React.useState("YYYY-MM-DD");
  const user = useAppSelector((state) => state.user);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(value);
  };

  async function fetchTweetCount() {
    const result = await axios.get(
      "http://localhost:3001/api/profile/getTweetCount",
      {
        params: {
          userId: user.userId,
        },
      }
    );
    setTweetCount(result.data);
  }

  async function fetchBio() {
    const result = await axios.get("http://localhost:3001/api/profile/getBio", {
      params: {
        userId: user.userId,
      },
    });
    setBio(result.data);
  }

  async function fetchJoinDate() {
    const result = await axios.get(
      "http://localhost:3001/api/profile/getJoinDate",
      {
        params: {
          userId: user.userId,
        },
      }
    );
    setJoinDate(result.data);
  }

  useEffect(() => {
    fetchBio();
    fetchTweetCount();
    fetchJoinDate();
  }, [value]);
  return (
    <>
      <Box width={650}>
        <div style={styles.rightBound}>
          {/**Not sure about this */}
          <div style={styles.header}>
            {" "}
            <Typography sx={styles.arrowText}>{user.username}</Typography>
            <button style={styles.arrowBtn}>
              <ArrowBackIcon></ArrowBackIcon>
            </button>
            <Typography sx={styles.tweetCountStyle}>
              {tweetCount} Tweets
            </Typography>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src={process.env.PUBLIC_URL + "/blue.jpg"}
              alt="temp"
              width="650px"
              height="200px"
            ></img>
            <Avatar
              alt="profile picture"
              src={process.env.PUBLIC_URL + "/rock.jpg"}
              sx={styles.avatar}
            />
          </div>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={styles.editBtn}
          >
            Edit Profile
          </Button>
          <div style={{ paddingLeft: 15, overflowWrap: "break-word" }}>
            <Typography variant={"h1"} style={styles.displayName}>
              {user.displayName}
            </Typography>
            <Typography variant={"h2"} style={styles.usernameDisplay}>
              @{user.username}
            </Typography>
            <Typography style={styles.bioDisplay}>{bio}</Typography>
            <div style={{ alignItems: "center", display: "flex" }}>
              <CalendarMonthIcon></CalendarMonthIcon>
              <Typography>Joined {joinDate}</Typography>
            </div>
            <Button sx={styles.followercountbtn}>
              <div>
                <b>500M</b> Followers
              </div>
            </Button>
            <Button sx={styles.followingcountbtn}>
              <div>
                <b>0</b> Following
              </div>
            </Button>
          </div>
          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" style={styles.tabSelection} label="Tweets" />
            <Tab value="two" style={styles.tabSelection} label="Replies" />
            <Tab value="three" style={styles.tabSelection} label="Likes" />
          </Tabs>

          {value === "one" && (
            <div>
              {" "}
              <ProfileTweets />
            </div>
          )}
          {value === "two" && (
            <div>
              {" "}
              <ProfileReplies />
            </div>
          )}

          {value === "three" && (
            <div>
              {" "}
              <ProfileLikes />
            </div>
          )}
        </div>
      </Box>
    </>
  );
};

export default Profile;
