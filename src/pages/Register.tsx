import "../styles/Register.css";
import { Typography } from "@mui/material/";

const Register = () => {
  return (
    <main>
      <Typography
        variant="h1"
        textAlign={"center"}
        fontWeight={700}
        fontSize={32}
        paddingBottom={5}
      >
        Take me to Tweeter
      </Typography>
    </main>
    // <main>
    //   <Box
    //     display={"flex"}
    //     flexDirection={"column"}
    //     maxWidth={400}
    //     alignItems={"center"}
    //     justifyContent={"center"}
    //     margin={"auto"}
    //     marginTop={5}
    //     padding={3}
    //     width={1000}
    //   >
    //     <Typography
    //       variant="h1"
    //       textAlign={"center"}
    //       fontWeight={700}
    //       fontSize={32}
    //       paddingBottom={5}
    //     >
    //       Create a new account
    //     </Typography>
    //     <TextField
    //       label="First Name"
    //       margin="dense"
    //       value={firstName}
    //       onChange={(fname) => setFirstName(fname.target.value)}
    //       type={"text"}
    //       variant="outlined"
    //       placeholder="First Name"
    //       id="firstname"
    //       required={true}
    //     />
    //     <TextField
    //       label="Last Name"
    //       required={true}
    //       margin="dense"
    //       value={lastName}
    //       onChange={(lname) => setLastName(lname.target.value)}
    //       type={"text"}
    //       variant="outlined"
    //       placeholder="Last Name"
    //       id="lastname"
    //     />
    //     <TextField
    //       label="Display Name"
    //       required={true}
    //       margin="dense"
    //       value={displayName}
    //       onChange={(dName) => {
    //         setDisplayName(dName.target.value.substring(0, 20));
    //         setDNameCheck(false);
    //       }}
    //       onBlur={() => setDNameCheck(true)}
    //       type={"text"}
    //       variant="outlined"
    //       placeholder="Display Name"
    //       id="displayname"
    //     />
    //     <LocalizationProvider dateAdapter={AdapterDayjs}>
    //       <DatePicker
    //         renderInput={(props) => (
    //           <TextField
    //             sx={{ width: 253.4 }}
    //             margin="dense"
    //             variant="outlined"
    //             id="date"
    //             placeholder="Date of Birth"
    //             {...props}
    //           />
    //         )}
    //         label="Date of Birth"
    //         value={dob}
    //         onChange={(newValue) => {
    //           newValue && setDob(newValue);
    //         }}
    //         maxDate={new Date()}
    //       />
    //     </LocalizationProvider>
    //     <DisplayNameRules />
    //     <TextField
    //       label="Email"
    //       required={true}
    //       margin="dense"
    //       value={email}
    //       onChange={(email) => {
    //         setEmail(email.target.value.replace(/\s+/g, ""));
    //       }}
    //       onBlur={() => setEmailCheck(true)}
    //       type={"email"}
    //       variant="outlined"
    //       placeholder="Email"
    //       id="email"
    //     />
    //     <EmailRules />
    //     <TextField
    //       label="Password"
    //       required={true}
    //       margin="dense"
    //       value={password}
    //       onChange={(pword) => setPassword(pword.target.value)}
    //       onFocus={() => setPasswordRules(true)}
    //       onBlur={() => setPasswordRules(false)}
    //       type={"password"}
    //       variant="outlined"
    //       placeholder="Password"
    //       id="password"
    //     />
    //     <Box>{passwordRules ? <PasswordRules /> : <></>}</Box>
    //     <TextField
    //       label="Confirm password"
    //       required={true}
    //       margin="dense"
    //       value={confirmPword}
    //       onChange={(cpword) => {
    //         setConfirmPword(cpword.target.value);
    //         setPasswordCheck(false);
    //       }}
    //       onBlur={() => setPasswordCheck(true)}
    //       type={"password"}
    //       variant="outlined"
    //       placeholder="Confirm password"
    //       id="confirmpassword"
    //     />
    //     <Box>
    //       {!passwordCheck || confirmPword === password ? (
    //         <></>
    //       ) : (
    //         <Typography textAlign={"center"} color="primary">
    //           Password fields need to match
    //         </Typography>
    //       )}
    //     </Box>
    //     <Button
    //       disabled={submitButton === false}
    //       size={"large"}
    //       sx={{
    //         marginTop: 3,
    //         marginBottom: 2,
    //         borderRadius: 10,
    //         width: 253.4,
    //       }}
    //       color="primary"
    //       variant="contained"
    //       type="submit"
    //       onClick={() => submitUser()}
    //     >
    //       Create account
    //     <Link
    //       variant="h6"
    //       color="inherit"
    //       fontSize={15}
    //     >
    //       Already have an account?
    //     </Link>
    //   </Box>
    // </main>
  );
};

export default Register;
