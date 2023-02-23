import { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material/";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
    <main>
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={400}
        alignItems="center"
        justifyContent="center"
        margin="auto"
        marginTop={5}
        padding={3}
        width={1000}
      >
        <Typography
          variant="h1"
          textAlign="center"
          fontWeight={700}
          fontSize={32}
          paddingBottom={5}
        >
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
          placeholder="Display Name"
          id="displayname"
        />
        <TextField
          label="Display Name"
          margin="dense"
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
                sx={{ width: 253.4 }}
                margin="dense"
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
          sx={{
            marginTop: 3,
            marginBottom: 2,
            borderRadius: 10,
            width: 253.4,
          }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </main>
  );
};

export default Register;
