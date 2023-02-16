import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar } from "@mui/material";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfilePage = () => {
  return (
    <div style={{ paddingRight: 1000 }}>
      {/**Not sure about this */}
      <div style={{ paddingTop: 30, paddingBottom: 30 }}>
        <button style={{ border: "none", backgroundColor: "white" }}>
          <ArrowBackIcon></ArrowBackIcon>
          <Typography sx={{ display: "inline" }}>User Profile</Typography>
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
          sx={{
            width: 125,
            height: 125,
            position: "absolute",
            left: 20,
            top: 135,
          }}
        />
      </div>
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        sx={{
          backgroundColor: "black",
          borderRadius: 20,
          textTransform: "none",
          marginLeft: 62,
          marginTop: 2,
        }}
      >
        Edit Profile
      </Button>
      <div style={{ paddingLeft: 15, overflowWrap: "break-word" }}>
        <h2 style={{ fontSize: 30, marginTop: 0 }}>Username</h2>
        <p>
          Hi guys!. Im new here and I am a big Manchester United Fan. PS I also
          watch anime and play Valorant!
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
