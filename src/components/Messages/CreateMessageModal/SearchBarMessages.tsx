import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemButton,
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
  autocomplete: { ".MuiAutocomplete-input": { paddingLeft: 0 } },
  listItemButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  searchIcon: { paddingRight: 0 },
};

type SearchBarProps = {
  placeholder: string;
  selectedUser: OtherUser;
  setSelectedUser: (state: OtherUser) => void;
  setFocusSearchBar: (state: boolean) => void;
};

const SearchBarMessages = ({
  placeholder,
  selectedUser,
  setSelectedUser,
  setFocusSearchBar,
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
        onOpen={() => setFocusSearchBar(true)}
        onClose={() => setFocusSearchBar(false)}
        id="messages-search"
        onChange={
          (_, value) => (value ? setSelectedUser(value) : console.log(value))
          // : setSelectedUser({
          //     displayName: "",
          //     otherUserId: -1,
          //     username: "",
          //   })
        }
        options={followedList}
        getOptionLabel={(option) => `${option.displayName} @${option.username}`}
        sx={styles.autocomplete}
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
                    <IconButton disabled sx={styles.searchIcon}>
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
                <ListItemButton
                  sx={styles.listItemButton}
                  // onClick={() => console.log(selectedUser)}
                >
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
                </ListItemButton>
              </Stack>
            </List>
          );
        }}
      />
    </Box>
  );
};

export default SearchBarMessages;
