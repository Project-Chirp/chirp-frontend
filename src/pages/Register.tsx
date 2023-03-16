import { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material/";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const styles = {
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    height: "100%",
    paddingTop: 5,
  },
  datePicker: {
    width: 253.4,
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 32,
  },
  submitButton: {
    borderRadius: 5,
    width: 253.4,
  },
};

const Register = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | undefined>();

  const submitUserInfo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    try {
      await axios.put(
        "http://localhost:3001/api/appUsers/basicUserInfo",
        {
          username,
          displayName,
          birthDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitUserInfo}>
      <Box sx={styles.container}>
        <Typography variant="h1" sx={styles.title}>
          Let's get to know a little more about you
        </Typography>
        <TextField
          label="Username"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          variant="outlined"
          placeholder="Username"
          id="displayname"
        />
        <TextField
          label="Display Name"
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
          type="text"
          variant="outlined"
          placeholder="Display Name"
          id="displayname"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            renderInput={(props) => (
              <TextField
                sx={styles.datePicker}
                variant="outlined"
                id="date"
                placeholder="Date of Birth"
                {...props}
              />
            )}
            label="Date of Birth"
            value={birthDate}
            onChange={(e) => {
              e && setBirthDate(e);
            }}
            maxDate={new Date()}
          />
        </LocalizationProvider>
        <Button
          size="large"
          sx={styles.submitButton}
          color="primary"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default Register;
