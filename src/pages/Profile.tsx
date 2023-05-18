import React from "react";
import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography, Tabs, Tab, Avatar, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProfileTweets from "../components/Posts/ProfileTweets";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import ProfileReplies from "../components/Posts/ProfileReplies";
import ProfileLikes from "../components/Posts/ProfileLikes";

const styles = {
  userProfileArrow: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  rightBound: {},
  arrowBtn: {
    border: "none",
    backgroundColor: "white",
  },
  arrowText: {
    paddingLeft: 2,
    display: "inline",
    fontSize: 18,
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
  usernameDisplay: {
    fontSize: 30,
    marginTop: 0,
  },
  menu: { marginTop: 60, marginRight: 83 },
  tabSelection: {
    marginLeft: 55,
  },
};

const Profile = () => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(value);
  };

  useEffect(() => {}, [value]);
  const posts = useAppSelector((state) => state.post);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <>
      <Box width={650}>
        <div style={styles.rightBound}>
          {/**Not sure about this */}
          <div style={styles.userProfileArrow}>
            <button style={styles.arrowBtn}>
              <ArrowBackIcon></ArrowBackIcon>
              <Typography sx={styles.arrowText}>User Profile</Typography>
            </button>
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
            <h2 style={styles.usernameDisplay}>{user.username}</h2>
            <p>
              Hi guys!. Im new here and I am a big Manchester United Fan. PS I
              also watch anime and play Valorant!
            </p>
          </div>
          <Tabs value={value} onChange={handleChange}>
            <Tab value="one" style={styles.tabSelection} label="Tweets" />
            <Tab value="two" style={styles.tabSelection} label="Replies" />
            <Tab value="three" style={styles.tabSelection} label="Media" />
            <Tab value="four" style={styles.tabSelection} label="Likes" />
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
          {value === "three" && <p>testing three</p>}
          {value === "four" && (
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
