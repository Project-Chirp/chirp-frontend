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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../state/hooks";
import { BaseUser } from "../../../types/users";
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
  const userId = useAppSelector((state) => state.user.userId);
  const [followedList, setFollowedList] = useState<BaseUser[]>([]);
  const { sendRequest } = useAxios();

  useEffect(() => {
    const fetchDMList = async () => {
      const result = await sendRequest(
        {
          method: "GET",
          params: { userId },
        },
        "messages/followedList",
      );
      setFollowedList(result);
    };
    fetchDMList();
  }, [userId, sendRequest]);

  return (
    <Box sx={styles.box}>
      <Autocomplete
        fullWidth
        getOptionLabel={(option) => `${option.displayName} @${option.username}`}
        onClose={onSearchClose}
        onOpen={onSearchOpen}
        openOnFocus
        options={followedList}
        popupIcon={false}
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
              component="li"
              key={option.userId}
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
