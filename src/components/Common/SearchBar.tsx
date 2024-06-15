import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import PageLoader from "../../pages/PageLoader";
import { useAuth0 } from "@auth0/auth0-react";
import { SelectedUser } from "../../state/slices/messagesSlice";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../utilities/queryClient";

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
    ".MuiButtonBase-root": {
      color: "gray.main",
    },
  },
  searchIconFocused: {
    paddingRight: 0,
    ".Mui-disabled": {
      color: "primary.main",
    },
  },
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState("");
  const [userList, setUserList] = useState<SelectedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [focusSearchBar, setFocusSearchBar] = useState(false);

  const onSelect = (selectedUsername: string) => {
    setFocusSearchBar(false);
    const path = `/${selectedUsername}`;
    navigate(path);
  };

  useEffect(() => {
    fetchUsers({ pageParam: 1 });
  }, [keywords]);

  const fetchUsers = async ({ pageParam = 1 }) => {
    setLoading(true);
    if (keywords.length === 0) return {};
    try {
      const token = await getAccessTokenSilently();
      const result = await axios.get(
        `http://localhost:3001/api/users/getUsers`,
        {
          params: {
            keyword: keywords,
            offset: pageParam,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (pageParam > 1) {
        setUserList((prev) => [...prev, ...result.data]);
      } else {
        setUserList(result.data as SelectedUser[]);
      }

      return result.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const { error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["searchUsers"],
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  if (status === "pending") return <PageLoader />;
  if (status === "error") return <Box>{error.message}</Box>; // TODO: Create an Error Component

  return (
    <Box sx={styles.box}>
      <Autocomplete
        fullWidth
        getOptionLabel={(option) => `${option.displayName} @${option.username}`}
        id="search"
        forcePopupIcon={false}
        options={userList}
        open={focusSearchBar}
        onOpen={() => setFocusSearchBar(true)}
        onBlur={() => setFocusSearchBar(false)}
        openOnFocus
        loading={loading}
        filterOptions={(x) => x}
        onInputChange={(_, newInputValue) => {
          setKeywords(newInputValue);
        }}
        inputValue={keywords}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              fullWidth
              hiddenLabel
              InputProps={{
                ...params.InputProps,
                type: "text",
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
                endAdornment: keywords && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setKeywords("")}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder={placeholder}
              size="small"
            />
          );
        }}
        renderOption={(params, option, state) => {
          const lastOption = state.index === userList.length - 1;
          return (
            <Box key={option.userId}>
              <ListItemButton
                {...params}
                key={option.userId}
                component="li"
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
              {lastOption && hasNextPage && (
                <Box textAlign={"center"} padding={1}>
                  <Button
                    onClick={() => fetchNextPage()}
                    variant="contained"
                    size="small"
                  >
                    Load More
                  </Button>
                </Box>
              )}
            </Box>
          );
        }}
        sx={styles.autocomplete}
      />
    </Box>
  );
};

export default SearchBar;
