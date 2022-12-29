import React, { useEffect, useState } from "react";
import "../styles/Register.css";
import { Box, Button, Typography, TextField, Link } from "@mui/material/";
import { Link as RouterLink } from "react-router-dom";
import { display } from "@mui/system";
import { Email } from "@mui/icons-material";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState(new Date());
  const [password, setPassword] = useState("");
  const [confirmPword, setConfirmPword] = useState("");

  const [minDNameCheck, setMinDNameCheck] = useState(false);
  const [maxDNameCheck, setMaxDNameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [emailRegex, setEmailRegex] = useState(true);
  const [formatCheck, setFormatCheck] = useState(true);
  const [dNameCheck, setDNameCheck] = useState(false);
  const [pwordRules, setPwordRules] = useState(false);

  useEffect(() => {
    setMinDNameCheck(displayName.length >= 4);
    setMaxDNameCheck(displayName.length === 20);
    setFormatCheck(/^[A-Za-z0-9_.]*$/.test(displayName));
  }, [displayName]);

  useEffect(() => {
    setEmailRegex(
      /^[^/\\*;:,{}\[\]()$?]+@+[^/\\~`*;:,|{}\[\]=()%$?]+[.]{1}[^/\\~`*;:,|{}\[\]=()%$?]+$/.test(
        email
      )
    );
  }, [email]);

  function EmailRules() {
    if (!emailCheck || emailRegex) {
      return <></>;
    } else {
      return <Typography color={"primary"}>Invalid email address</Typography>;
    }
  }

  function DisplayNameRules() {
    if (displayName && dNameCheck && !minDNameCheck) {
      return (
        <Typography textAlign={"center"} color="primary">
          Username must have atleast 4 characters.
        </Typography>
      );
    } else if (maxDNameCheck) {
      return (
        <Typography textAlign={"center"} color="primary">
          Maximum length reached.
        </Typography>
      );
    } else if (!formatCheck) {
      return (
        <Typography textAlign={"center"} color="primary">
          Username can only include letters, numbers, underscore (_) and dot (.)
        </Typography>
      );
    } else {
      return <></>;
    }
  }

  const handleSubmit = () => {};

  return (
    <main>
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
          required={true}
        />
        <TextField
          required={true}
          margin="normal"
          value={lastName}
          onChange={(lname) => setLastName(lname.target.value)}
          type={"text"}
          variant="outlined"
          placeholder="Last Name"
          id="lastname"
        />
        <TextField
          required={true}
          margin="normal"
          value={displayName}
          onChange={(dName) => {
            setDisplayName(dName.target.value.substring(0, 20));
            setDNameCheck(false);
          }}
          onBlur={() => setDNameCheck(true)}
          type={"text"}
          variant="outlined"
          placeholder="Display Name"
          id="displayname"
        />
        <DisplayNameRules />
        <TextField
          required={true}
          margin="normal"
          value={email}
          onChange={(email) => {
            setEmail(email.target.value.replace(/\s+/g, ""));
          }}
          onBlur={() => setEmailCheck(true)}
          type={"email"}
          variant="outlined"
          placeholder="Email"
          id="email"
        />
        <EmailRules />
        <Typography
          variant="h2"
          textAlign={"center"}
          fontWeight={1000}
          fontSize={15}
        >
          Date of Birth
        </Typography>
        <TextField
          required={true}
          margin="normal"
          value={day}
          onChange={(date) => setDay(new Date(date.target.value))}
          type={"date"}
          variant="outlined"
          placeholder="Date"
          id="date"
        />
        <TextField
          required={true}
          margin="normal"
          value={password}
          onChange={(pword) => setPassword(pword.target.value)}
          type={"password"}
          variant="outlined"
          placeholder="Password"
          id="password"
        />
        <TextField
          required={true}
          margin="normal"
          value={confirmPword}
          onChange={(cpword) => setConfirmPword(cpword.target.value)}
          type={"password"}
          variant="outlined"
          placeholder="Confirm password"
          id="confirmpassword"
        />
        <Button
          size={"large"}
          sx={{
            marginTop: 3,
            marginBottom: 2,
            borderRadius: 10,
          }}
          color="primary"
          variant="contained"
          type="submit"
          onClick={() => handleSubmit()}
        >
          Create account
        </Button>
        <Link
          variant="h6"
          component={RouterLink}
          to="/login"
          underline="hover"
          color="inherit"
          fontSize={15}
        >
          Already have an account?
        </Link>
      </Box>
    </main>
  );
};

export default Register;
