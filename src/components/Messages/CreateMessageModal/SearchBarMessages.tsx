import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { OtherUser } from "./MessagesModalList";
import { useAppSelector } from "../../../state/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
  box: {
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    width: "95%",
  },
  searchField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
    },
  },
  avatar: { margin: "auto" },
  displayName: {
    fontWeight: "bold",
  },
  primaryTextContainer: {
    gap: 0.5,
    width: "30%",
    height: "100%",
  },
  stack: {
    width: "100%",
  },
};

type SearchBarProps = {
  placeholder: string;
  selectedUser: OtherUser;
  setSelectedUser: (state: OtherUser) => void;
};

const SearchBarMessages = ({
  placeholder,
  selectedUser,
  setSelectedUser,
}: SearchBarProps) => {
  const user = useAppSelector((state) => state.user);
  const [followedList, setFollowedList] = useState<OtherUser[]>([]);

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/messages/${user.userId}/${selectedUser.otherUserId}`;
    navigate(path);
  };

  useEffect(() => {
    const fetchDMList = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/messages/followedList",
        {
          params: {
            userId: user.userId,
          },
        }
      );
      setFollowedList(result.data as OtherUser[]);
    };
    fetchDMList();
  }, [user]);

  return (
    <Box sx={styles.box}>
      <Autocomplete
        id="messages-search"
        onChange={(event, value) =>
          value
            ? setSelectedUser(value)
            : setSelectedUser({
                displayName: "",
                otherUserId: -1,
                username: "",
              })
        }
        options={followedList}
        getOptionLabel={(option) =>
          `${option.username}  @${option.displayName}`
        }
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              fullWidth
              hiddenLabel
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => routeChange()}
                      disabled={!selectedUser.username.trim()}
                    >
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder={placeholder}
              size="small"
              sx={styles.searchField}
            />
          );
        }}
        renderOption={(props, option) => {
          return (
            <List component="li" {...props}>
              <Stack direction="row" sx={styles.stack}>
                <ListItemAvatar sx={styles.avatar}>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Box sx={styles.primaryTextContainer}>
                      <Typography sx={styles.displayName} variant="body2">
                        {option.displayName}
                      </Typography>
                      <Typography variant="body2">{`@${option.username}`}</Typography>
                    </Box>
                  }
                />
              </Stack>
            </List>
          );
        }}
      />
    </Box>
  );
};

export default SearchBarMessages;
