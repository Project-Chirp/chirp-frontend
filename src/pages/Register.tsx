import React from 'react'
import "../styles/Register.css";
// import { InputLabel } from '@mui/material'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Register = () => {
  return (
    <div>
      <form>
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
            <Typography variant='h1' textAlign={"center"} fontFamily={'Inter'} fontWeight={700} fontSize={32}>Create a new account</Typography>
            <TextField margin='normal' type={'text'} variant='outlined' placeholder='First Name' id='firstname' />
            <TextField margin='normal' type={'text'} variant='outlined' placeholder='Last Name' id='lastname'/>
            <TextField margin='normal' type={'text'} variant='outlined' placeholder='Display Name' id='displayname'/>
            <TextField margin='normal' type={'email'} variant='outlined' placeholder='Email' id='email'/>
            <Typography variant='h2' textAlign={"center"} fontFamily={'Inter'} fontWeight={1000} fontSize={15}>Date of Birth</Typography>
            <TextField margin='normal' type={'date'} variant='outlined' placeholder='Date' id='date'/>
            <TextField margin='normal' type={'password'} variant='outlined' placeholder='Password' id='password'/>
            <TextField margin='normal' type={'password'} variant='outlined' placeholder='Confirm password' id='confirmpassword'/>
            <Button style={{ margin: 10, backgroundColor: "#22AA6F", borderRadius: 10}} size={"large"} sx={{fontFamily: 'Inter'}} variant='contained'>Create account</Button>
        </Box>
      </form>
      
    </div>
  )
}

export default Register;
