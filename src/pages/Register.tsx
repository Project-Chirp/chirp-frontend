import { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material/";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "./../state/hooks";
import { setUser } from "../state/slices/userSlice";
import dayjs, { Dayjs } from "dayjs";

const styles = {
  container: { height: "100%" },
  title: {
    padding: 3,
    textAlign: "center",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    margin: "auto",
    width: "15%",
  },
};

const Register = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [birthDate, setBirthDate] = useState<Dayjs | undefined>();

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const submitUserInfo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    try {
      dispatch(setUser({ ...user, isLoading: true }));
      const newUserInfo = await axios.put(
        `http://localhost:3001/api/users/${user.userId}`,
        {
          username,
          displayName,
          birthDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(setUser(newUserInfo.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitUserInfo} style={styles.container}>
      <Typography sx={styles.title} variant="h1">
        {`Let's get to know a little more about you`}
      </Typography>
      <Box sx={styles.inputs}>
        <TextField
          label="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
          required
          type="text"
          value={username}
          variant="outlined"
        />
        <TextField
          label="Display Name"
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
          placeholder="Display Name"
          type="text"
          value={displayName}
          variant="outlined"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            maxDate={dayjs(new Date())}
            onChange={(value) => {
              if (value) {
                setBirthDate(value);
              }
            }}
            slotProps={{
              textField: { placeholder: "Date of Birth", variant: "outlined" },
            }}
            value={dayjs(birthDate)}
          />
        </LocalizationProvider>
        <Button size="large" type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default Register;
