import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearIcon from "@mui/icons-material/Clear";
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
  debounce,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { SelectedUser } from "../../state/slices/messagesSlice";
import { useNavigate } from "react-router-dom";

type SearchBarProps = {
  placeholder: string;
};

const styles = {
  autocomplete: {
    "&.MuiAutocomplete-input": { paddingX: 0 },
    position: "relative",
  },
  box: {
    paddingBottom: 1,
    paddingTop: 0,
    paddingX: 2,
  },
  displayName: {
    fontWeight: "bold",
  },
  listBox: {
    maxHeight: "60vh",
    overflowY: "auto",
    zIndex: 1300,
  },
  searchIcon: {
    paddingRight: 0,
    "&.Mui-disabled": {
      color: "gray.main",
    },
  },
  searchIconFocused: {
    paddingRight: 0,
    "&.Mui-disabled": {
      color: "primary.main",
    },
  },
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const debouncedSetter = useMemo(
    () => debounce((keywords: string) => setKeywords(keywords), 20),
    []
  );
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<SelectedUser[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    if (keywords.length === 0) return {};
    try {
      const token = await getAccessTokenSilently();
      const result = await axios.get(
        `http://localhost:3001/api/users/getUsers`,
        {
          params: {
            keyword: keywords,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserList(result.data as SelectedUser[]);

      return result.data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setKeywords("");
    setUserList([]);
  };

  const handleInputChange = (newInputValue: string) => {
    debouncedSetter(newInputValue);
    setFocusSearchBar(true);
    if (newInputValue === "") {
      setUserList([]);
    }
  };

  const onSelect = (selectedUsername: string) => {
    setFocusSearchBar(false);
    setKeywords("");
    inputRef.current?.blur();
    const path = `/${selectedUsername}`;
    navigate(path);
  };

  useEffect(() => {
    fetchUsers();
  }, [keywords]);

  return (
    <Box sx={styles.box}>
      <Autocomplete
        disablePortal
        forcePopupIcon={false}
        fullWidth
        filterOptions={(x) => x}
        getOptionLabel={(option) => `${option.displayName} @${option.username}`}
        id="search"
        inputValue={keywords}
        ListboxProps={{ sx: styles.listBox }}
        loading={loading}
        onBlur={() => setFocusSearchBar(false)}
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
        onFocus={() => setFocusSearchBar(true)}
        open={focusSearchBar}
        openOnFocus
        options={userList}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            hiddenLabel
            InputProps={{
              ...params.InputProps,
              endAdornment: keywords && (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleClear()}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    disabled
                    sx={
                      focusSearchBar
                        ? styles.searchIconFocused
                        : styles.searchIcon
                    }
                  >
                    <SearchRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ),
              type: "text",
              inputRef: inputRef,
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                }
              },
            }}
            placeholder={placeholder}
            size="small"
          />
        )}
        renderOption={(params, option) => (
          <Box key={option.userId}>
            <ListItemButton
              {...params}
              component="li"
              key={option.userId}
              onClick={() => onSelect(option.username)}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Box>
                    <Typography sx={styles.displayName} variant="body1">
                      {option.displayName}
                    </Typography>
                    <Typography variant="body2">{`@${option.username}`}</Typography>
                  </Box>
                }
              />
            </ListItemButton>
          </Box>
        )}
        sx={styles.autocomplete}
      />
    </Box>
  );
};

export default SearchBar;
