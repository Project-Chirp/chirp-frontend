import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../state/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { SelectedUser } from "../../../state/slices/messagesSlice";

const styles = {
  autocomplete: { "&.MuiAutocomplete-input": { paddingLeft: 0 } },
  box: {
    paddingBottom: 1,
    paddingTop: 0,
    paddingX: 2,
  },
  searchIcon: { paddingRight: 0 },
};

type MessagesSearchBarProps = {
  placeholder: string;
  onSearchOpen: () => void;
  onSearchClose: () => void;
  onSelect: (state: number) => void;
};

const MessagesSearchBar = ({
  placeholder,
  onSearchOpen,
  onSearchClose,
  onSelect,
}: MessagesSearchBarProps) => {
  const user = useAppSelector((state) => state.user);
  const [followedList, setFollowedList] = useState<SelectedUser[]>([]);
  useEffect(() => {
    const fetchDMList = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/messages/followedList",
        {
          params: {
            userId: user.userId,
          },
        },
      );
      setFollowedList(result.data as SelectedUser[]);
    };
    fetchDMList();
  }, [user]);

  return (
    <Box sx={styles.box}>
      <Autocomplete
        fullWidth
        getOptionLabel={(option) => `${option.displayName} @${option.username}`}
        id="messages-search"
        popupIcon={false}
        onOpen={onSearchOpen}
        onClose={onSearchClose}
        options={followedList}
        openOnFocus
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              fullWidth
              hiddenLabel
              placeholder={placeholder}
              size="small"
              slotProps={{
                input: {
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton disabled sx={styles.searchIcon}>
                        <SearchRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          );
        }}
        renderOption={(_, option) => {
          return (
            <ListItemButton
              key={option.userId}
              component="li"
              onClick={() => onSelect(option.userId)}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Box>
                    <Typography variant="subtitle1">
                      {option.displayName}
                    </Typography>
                    <Typography variant="subtitle2">{`@${option.username}`}</Typography>
                  </Box>
                }
              />
            </ListItemButton>
          );
        }}
        sx={styles.autocomplete}
      />
    </Box>
  );
};

export default MessagesSearchBar;
