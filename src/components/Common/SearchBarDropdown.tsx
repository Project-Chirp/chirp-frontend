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
  debounce,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { SelectedUser } from "../../state/slices/messagesSlice";
import { useNavigate } from "react-router-dom";
import useAxios from "../../utilities/useAxios";

type SearchBarDropDownProps = {
  placeholder: string;
};

const styles = {
  listBox: {
    maxHeight: "60vh",
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

const SearchBarDropDown = ({ placeholder }: SearchBarDropDownProps) => {
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState<SelectedUser[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { sendRequest } = useAxios();

  const fetchUsers = async (keywords: string) => {
    setLoading(true);
    if (keywords.trim() === "") {
      setSearchOptions([]);
      setLoading(false);
      return;
    }
    try {
      const result = await sendRequest(
        {
          method: "GET",
          params: { keywords },
        },
        "users/searchUsers",
      );
      setSearchOptions(result as SelectedUser[]);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setSearchOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(
    () => debounce((keywords: string) => fetchUsers(keywords), 100),
    [],
  );

  useEffect(() => {
    debouncedFetch(keywords);
  }, [keywords]);

  const handleSelect = (selectedUsername: string) => {
    setKeywords("");
    setSearchOptions([]);
    inputRef.current?.blur();
    navigate(`/${selectedUsername}`);
  };

  const handleInputChange = (newInputValue: string) => {
    setLoading(true);
    setKeywords(newInputValue);
  };

  const handleClear = () => {
    setKeywords("");
    setSearchOptions([]);
  };

  return (
    <Box>
      <Autocomplete
        clearOnBlur={false}
        disablePortal
        filterOptions={(x) => x}
        forcePopupIcon={false}
        fullWidth
        getOptionLabel={() => ""}
        inputValue={keywords}
        ListboxProps={{ style: styles.listBox }}
        loading={loading}
        noOptionsText={
          !keywords ? "Start typing to search..." : "No user found"
        }
        onBlur={() => setFocusSearchBar(false)}
        onChange={(_, value) => value && handleSelect(value.username)}
        onFocus={() => setFocusSearchBar(true)}
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
        open={focusSearchBar}
        options={searchOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            inputRef={inputRef}
            placeholder={placeholder}
            size="small"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: keywords && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear}>
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
              },
            }}
            variant="outlined"
          />
        )}
        renderOption={(params, option) => {
          return (
            <ListItemButton
              {...params}
              component="li"
              key={option.userId}
              onClick={() => handleSelect(option.username)}
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
        value={null}
      />
    </Box>
  );
};

export default SearchBarDropDown;
