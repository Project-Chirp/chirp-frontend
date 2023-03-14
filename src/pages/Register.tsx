import { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material/";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();

  // const submitUser = async () => {
  //   if (email && password && lastName && firstName) {
  //     const myData = {
  //       email: email,
  //       password_hash: password,
  //       last_name: lastName,
  //       first_name: firstName,
  //       birth_date: dateOfBirth.toISOString(),
  //     };

  //     await fetch("http://localhost:3001/api/appUsers/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(myData),
  //     }).then(function (response) {
  //       return response;
  //     });
  //   }
  // };

  return (
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
          value={dateOfBirth}
          onChange={(e) => {
            e && setDateOfBirth(e);
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
  );
};

export default Register;
