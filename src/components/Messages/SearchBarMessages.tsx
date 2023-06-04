import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  List,
  TextField,
} from "@mui/material";
import MessagesModalListItem from "./MessagesModalListItem";
import { DMList } from "./MessagesModalList";
import { useAppSelector } from "../../state/hooks";
import { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  box: {
    margin: "auto",
    padding: 1,
  },
  searchField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
    },
  },
};

type SearchBarProps = {
  placeholder: string;
};

const handleSearch = () => {
  console.log("handleSearch");
};

const SearchBarMessages = ({ placeholder }: SearchBarProps) => {
  const user = useAppSelector((state) => state.user);
  const [followedList, setFollowedList] = useState<DMList[]>([]);

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
      setFollowedList(result.data as DMList[]);
    };
    fetchDMList();
  }, [user]);
  return (
    <Box sx={styles.box}>
      <Autocomplete
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
                    <IconButton onClick={handleSearch}>
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
              <MessagesModalListItem dmList={option} />
            </List>
          );
        }}
        options={followedList}
        getOptionLabel={(option) => option.username}
        id="messages-search"
      />
    </Box>
  );
};

export default SearchBarMessages;
