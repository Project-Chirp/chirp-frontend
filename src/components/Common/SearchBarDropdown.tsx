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
  debounce,
  createFilterOptions,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { SelectedUser } from "../../state/slices/messagesSlice";
import { useLocation, useNavigate } from "react-router-dom";

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
  noOptions: {
    padding: 2,
    textAlign: "center",
  },
};

const SearchBarDropDown = ({ placeholder }: SearchBarProps) => {
  const debouncedFetch = useMemo(
    () => debounce((keywords: string) => fetchUsers(keywords), 100),
    []
  );
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState<SelectedUser[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUsers = async (keywords: string) => {
    setLoading(true);
    if (keywords.length === 0) {
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      const result = await axios.get(
        `http://localhost:3001/api/users/searchUsers`,
        {
          params: {
            keyword: keywords,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSearchOptions(result.data as SelectedUser[]);

      if (keywords.trim() === "") {
        setSearchOptions([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (newInputValue: string) => {
    setKeywords(newInputValue);

    if (newInputValue.trim() === "") {
      setSearchOptions([]);
    }
  };

  const onSelect = (selectedUsername: string) => {
    inputRef.current?.blur();
    navigate(`/${selectedUsername}`);
  };

  useEffect(() => {
    debouncedFetch(keywords);
  }, [keywords]);

  useEffect(() => {
    setKeywords("");
    setSearchOptions([]);
  }, [location]);

  const renderOption = (params: any, option: SelectedUser) => {
    return (
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
                <Typography variant="subtitle1">
                  {option.displayName}
                </Typography>
                <Typography variant="subtitle2">{`@${option.username}`}</Typography>
              </Box>
            }
          />
        </ListItemButton>
      </Box>
    );
  };

  return (
    <Box sx={styles.box}>
      <Autocomplete
        disablePortal
        fullWidth
        freeSolo
        filterOptions={(options) => options}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : `${option.displayName} @${option.username}`
        }
        id="search"
        inputValue={keywords}
        ListboxProps={{ sx: styles.listBox }}
        loading={loading}
        loadingText="Start typing to search..."
        onChange={(_, value) => {
          if (value && typeof value !== "string") {
            onSelect(value.username);
          }
        }}
        onBlur={() => setFocusSearchBar(false)}
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
        onFocus={() => setFocusSearchBar(true)}
        open={focusSearchBar}
        openOnFocus
        options={searchOptions}
        noOptionsText={"No user found"}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            hiddenLabel
            InputProps={{
              ...params.InputProps,
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
              inputRef: inputRef,
            }}
            placeholder={placeholder}
            size="small"
          />
        )}
        renderOption={(params, option) =>
          searchOptions.length === 0 ? (
            <Box sx={styles.noOptions}>
              <Typography>No user found</Typography>
            </Box>
          ) : (
            renderOption(params, option)
          )
        }
        sx={styles.autocomplete}
      />
    </Box>
  );
};

export default SearchBarDropDown;
