import { Avatar, Box, Link, Typography, useTheme } from "@mui/material";
import { Link as Routerlink } from "react-router-dom";
import { ChatBioType } from "../../types/chatBio";
import formatTimestamp from "../../utilities/formatTimestamp";

const styles = {
  avatar: {
    height: 64,
    marginBottom: 0.5,
    width: 64,
    opacity: 0.75,
    "&:hover": {
      opacity: 1,
    },
  },
  bioContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  nameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

type ChatBioProps = {
  bioContents: ChatBioType;
};

const ChatBio = ({ bioContents }: ChatBioProps) => {
  const { username, displayName, bio, joinedDate, followerCount } = bioContents;
  const theme = useTheme();

  return (
    <Box sx={styles.bioContent}>
      <Box sx={styles.nameContainer}>
        <Avatar sx={styles.avatar} />
        <Link
          color={theme.typography.subtitle1.color}
          component={Routerlink}
          to={`/${username}`}
          underline="hover"
          variant="subtitle1"
        >
          {displayName}
        </Link>
        <Typography variant="subtitle2">{`@${username}`}</Typography>
      </Box>
      {bio && <Typography>{bio}</Typography>}
      <Typography variant="body2">
        {joinedDate && `Joined ${formatTimestamp(joinedDate)} • `}
        {`${followerCount ?? 0} Followers`}
      </Typography>
    </Box>
  );
};

export default ChatBio;
