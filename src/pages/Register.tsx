import React, { useState } from "react";
import "../styles/Register.css";
// import { InputLabel } from '@mui/material'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState(new Date());
  const [password, setPassword] = useState("");
  const [confirmPword, setConfirmPword] = useState("");

  const handleSubmit = (e) => {};

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          padding={3}
        >
          <Typography
            variant="h1"
            textAlign={"center"}
            fontFamily={"Inter"}
            fontWeight={700}
            fontSize={32}
          >
            Create a new account
          </Typography>
          <TextField
            margin="normal"
            value={firstName}
            onChange={(fname) => setFirstName(fname.target.value)}
            type={"text"}
            variant="outlined"
            placeholder="First Name"
            id="firstname"
          />
          <TextField
            margin="normal"
            value={lastName}
            onChange={(lname) => setFirstName(lname.target.value)}
            type={"text"}
            variant="outlined"
            placeholder="Last Name"
            id="lastname"
          />
          <TextField
            margin="normal"
            value={displayName}
            onChange={(dName) => setFirstName(dName.target.value)}
            type={"text"}
            variant="outlined"
            placeholder="Display Name"
            id="displayname"
          />
          <TextField
            margin="normal"
            value={email}
            onChange={(email) => setFirstName(email.target.value)}
            type={"email"}
            variant="outlined"
            placeholder="Email"
            id="email"
          />
          <Typography
            variant="h2"
            textAlign={"center"}
            fontFamily={"Inter"}
            fontWeight={1000}
            fontSize={15}
          >
            Date of Birth
          </Typography>
          <TextField
            margin="normal"
            value={day}
            onChange={(date) => setFirstName(date.target.value)}
            type={"date"}
            variant="outlined"
            placeholder="Date"
            id="date"
          />
          <TextField
            margin="normal"
            value={password}
            onChange={(pword) => setFirstName(pword.target.value)}
            type={"password"}
            variant="outlined"
            placeholder="Password"
            id="password"
          />
          <TextField
            margin="normal"
            value={confirmPword}
            onChange={(cpword) => setFirstName(cpword.target.value)}
            type={"password"}
            variant="outlined"
            placeholder="Confirm password"
            id="confirmpassword"
          />
          <Button
            style={{ margin: 10, backgroundColor: "#22AA6F", borderRadius: 10 }}
            size={"large"}
            sx={{ fontFamily: "Inter" }}
            variant="contained"
            type="submit"
          >
            Create account
          </Button>
          <Link
            href="/login"
            underline="hover"
            color="inherit"
            sx={{ fontWeigth: 1000 }}
          >
            Already have an account?
          </Link>
        </Box>
      </form>
    </main>
  );
};

export default Register;
