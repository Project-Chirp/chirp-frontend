import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserSearchBar from "../Common/UserSearchBar";
import Advertisement from "./Advertisement";
import RelevantUsers from "./RelevantUsers";
import SidebarFooter from "./SidebarFooter";
import SuggestedUserItem from "./SuggestedUsers";

const styles = {
  rightContent: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    height: "100vh",
    paddingTop: 1,
    position: "fixed",
    width: "310px",
  },
};

type SideBarProps = {
  isExpandedPost?: boolean;
};

const SideBar = ({ isExpandedPost }: SideBarProps) => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.rightContent}>
      <UserSearchBar onSelect={(o) => navigate(`/${o.username}`)} />
      {isExpandedPost ? <RelevantUsers /> : <SuggestedUserItem />}
      <Advertisement />
      <SidebarFooter />
    </Box>
  );
};

export default SideBar;
