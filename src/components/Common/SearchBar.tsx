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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import PageLoader from "../../pages/PageLoader";
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
    maxHeight: "60vh", // Set a maximum height to prevent the list from expanding infinitely
    overflowY: "auto", // Add scrollbar if the list exceeds maxHeight
    zIndex: 1300,
  },
  searchIcon: { paddingRight: 0 },
  searchIconFocused: {
    paddingRight: 0,
    "&.Mui-disabled": {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const onSelect = (selectedUsername: string) => {
    const path = `/${selectedUsername}`;
    navigate(path);
  };

  const handleClick = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      console.log("Test");
      setFocusSearchBar(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    if (keywords.trim().length > 0) {
      fetchUsers({ pageParam: 1 });
    }
  }, [keywords]);

  const fetchUsers = async ({ pageParam = 1 }) => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const result = await axios.get(
        `http://localhost:3001/api/users/getUsers`,
        {
          params: {
            keyword: keywords,
            offset: 1,
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
        popupIcon={false}
        clearIcon={false}
        options={userList}
        openOnFocus
        loading={loading}
        filterOptions={(x) => x}
        onInputChange={(_, newInputValue) => {
          setKeywords(newInputValue);
        }}
        inputValue={keywords}
        ListboxProps={{ ref: containerRef }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              ref={searchBarRef}
              fullWidth
              hiddenLabel
              InputProps={{
                ...params.InputProps,
                type: "search",
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
          );
        }}
        sx={styles.autocomplete}
      />
    </Box>
  );
};

export default SearchBar;
