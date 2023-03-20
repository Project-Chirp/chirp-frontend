import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, MenuItem } from "@mui/material";
import { Button, Typography, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Container } from "@mui/system";

const styles = {
  userProfileArrow: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  rightBound: {
    paddingRight: 1000,
  },
  arrowBtn: {
    border: "none",
    backgroundColor: "white",
  },
  arrowText: {
    paddingLeft: 2,
    display: "inline",
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
};

const ProfileUI = () => {
  return (
    <Container maxWidth="lg">
      <div>
        {/**Not sure about this */}
        <div>
          <button>
            <ArrowBackIcon></ArrowBackIcon>
            <Typography>User Profile</Typography>
          </button>
        </div>
        <div>
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
        <Button variant="contained" startIcon={<EditIcon />}>
          Edit Profile
        </Button>
        <div>
          <h2>Username</h2>
          <p>
            Hi guys!. Im new here and I am a big Manchester United Fan. PS I
            also watch anime and play Valorant!
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ProfileUI;
