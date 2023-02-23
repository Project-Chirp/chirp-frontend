import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField, Link } from "@mui/material/";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Date>(new Date());
  const [password, setPassword] = useState("");
  const [confirmPword, setConfirmPword] = useState("");

  const [minDNameCheck, setMinDNameCheck] = useState(false);
  const [maxDNameCheck, setMaxDNameCheck] = useState(false);
  const [passwordRules, setPasswordRules] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [emailRegex, setEmailRegex] = useState(true);
  const [formatCheck, setFormatCheck] = useState(true);
  const [dNameCheck, setDNameCheck] = useState(false);
  const [lengthCheck, setLengthCheck] = useState(true);
  const [lettersCheck, setLettersCheck] = useState(true);
  const [numberCheck, setNumberCheck] = useState(true);
  const [specialCheck, setSpecialCheck] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      displayName &&
      email &&
      dob &&
      password &&
      confirmPword
    ) {
      setSubmitButton(true);
    } else {
      setSubmitButton(false);
    }
  }, [firstName, lastName, email, dob, displayName, password, confirmPword]);
  useEffect(() => {
    setMinDNameCheck(displayName.length >= 4);
    setMaxDNameCheck(displayName.length === 20);
    setFormatCheck(/^[A-Za-z0-9_.]*$/.test(displayName));
  }, [displayName]);

  useEffect(() => {
    setLengthCheck(password.length >= 8);
    setLettersCheck(/[A-Z]/.test(password) && /[a-z]/.test(password));
    setNumberCheck(/\d/.test(password));
    setSpecialCheck(/[^A-Za-z0-9]/.test(password));
  }, [password]);

  useEffect(() => {
    setEmailRegex(
      /^[^/\\*;:,{}\]()$?]+@+[^/\\~`*;:,|{}\]=()%$?]+[.]{1}[^/\\~`*;:,|{}\]=()%$?]+$/.test(
        email
      )
    );
  }, [email]);

  const submitUser = async () => {
    if (email && password && lastName && firstName) {
      const myData = {
        email: email,
        password_hash: password,
        last_name: lastName,
        first_name: firstName,
        birth_date: dob.toISOString(),
      };

      await fetch("http://localhost:3001/api/appUsers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myData),
      }).then(function (response) {
        return response;
      });
    }
  };

  function EmailRules() {
    if (!emailCheck || !email || emailRegex) {
      return <></>;
    } else {
      return (
        <Typography textAlign={"center"} color="primary">
          Invalid email address
        </Typography>
      );
    }
  }

  function PasswordRules() {
    if (lettersCheck && lengthCheck && numberCheck && specialCheck) {
      return <></>;
    }

    return (
      <Box>
        <Typography textAlign={"center"} color="primary" fontWeight={1000}>
          Password requirements:
        </Typography>
        {lengthCheck ? (
          <></>
        ) : (
          <Typography textAlign={"center"} color="primary">
            - 8 characters minimum
          </Typography>
        )}
        {lettersCheck ? (
          <></>
        ) : (
          <Typography textAlign={"center"} color="primary">
            - Upper and lower case letters
          </Typography>
        )}
        {numberCheck ? (
          <></>
        ) : (
          <Typography textAlign={"center"} color="primary">
            - At least one number
          </Typography>
        )}
        {specialCheck ? (
          <></>
        ) : (
          <Typography textAlign={"center"} color="primary">
            - At least one special character
          </Typography>
        )}
      </Box>
    );
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
        width={1000}
      >
        <Typography
          variant="h1"
          textAlign={"center"}
          fontWeight={700}
          fontSize={32}
          paddingBottom={5}
        >
          Create a new account
        </Typography>
        <TextField
          label="First Name"
          margin="dense"
          value={firstName}
          onChange={(fname) => setFirstName(fname.target.value)}
          type={"text"}
          variant="outlined"
          placeholder="First Name"
          id="firstname"
          required={true}
        />
        <TextField
          label="Last Name"
          required={true}
          margin="dense"
          value={lastName}
          onChange={(lname) => setLastName(lname.target.value)}
          type={"text"}
          variant="outlined"
          placeholder="Last Name"
          id="lastname"
        />
        <TextField
          label="Display Name"
          required={true}
          margin="dense"
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
            value={dob}
            onChange={(newValue) => {
              newValue && setDob(newValue);
            }}
            maxDate={new Date()}
          />
        </LocalizationProvider>
        <DisplayNameRules />
        <TextField
          label="Email"
          required={true}
          margin="dense"
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
        <TextField
          label="Password"
          required={true}
          margin="dense"
          value={password}
          onChange={(pword) => setPassword(pword.target.value)}
          onFocus={() => setPasswordRules(true)}
          onBlur={() => setPasswordRules(false)}
          type={"password"}
          variant="outlined"
          placeholder="Password"
          id="password"
        />
        <Box>{passwordRules ? <PasswordRules /> : <></>}</Box>
        <TextField
          label="Confirm password"
          required={true}
          margin="dense"
          value={confirmPword}
          onChange={(cpword) => {
            setConfirmPword(cpword.target.value);
            setPasswordCheck(false);
          }}
          onBlur={() => setPasswordCheck(true)}
          type={"password"}
          variant="outlined"
          placeholder="Confirm password"
          id="confirmpassword"
        />
        <Box>
          {!passwordCheck || confirmPword === password ? (
            <></>
          ) : (
            <Typography textAlign={"center"} color="primary">
              Password fields need to match
            </Typography>
          )}
        </Box>
        <Button
          disabled={submitButton === false}
          size={"large"}
          sx={{
            marginTop: 3,
            marginBottom: 2,
            borderRadius: 10,
            width: 253.4,
          }}
          color="primary"
          variant="contained"
          type="submit"
          onClick={() => submitUser()}
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
