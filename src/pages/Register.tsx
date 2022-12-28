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
        <Box display={"flex"} flexDirection={"column"}>
            <Typography fontFamily={'Inter'} fontWeight={700} fontSize={32}>Create a new account</Typography>
            <TextField />
            <TextField />
            <TextField />
            <Button>Create account</Button>
        </Box>
      </form>
      
    </div>
  )
}

export default Register;
