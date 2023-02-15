import PageWrapper from "./PageWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProfilePage = () => {
  return (
    <div>
      <PageWrapper>
        <ArrowBackIcon style={{ padding: 30 }} />
        <h1>User Profile</h1>
      </PageWrapper>
      <img
        src={process.env.PUBLIC_URL + "/blue.jpg"}
        alt="temp"
        width="80%"
        height="200px"
      ></img>
    </div>
  );
};

export default ProfilePage;
