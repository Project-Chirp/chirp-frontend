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
import { SelectedUser } from "../../../state/slices/messagesSlice";
import useAxios from "../../../utilities/useAxios";

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
  const { sendRequest } = useAxios();
  useEffect(() => {
    const fetchDMList = async () => {
      const result = await sendRequest({
        endpoint: "messages/followedList",
        method: "GET",
      });
      setFollowedList(result as SelectedUser[]);
    };
    fetchDMList();
  }, [user, sendRequest]);

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
                primary={option.displayName}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`@${option.username}`}
                secondaryTypographyProps={{ variant: "subtitle2" }}
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
