import { Avatar, Link } from "@mui/material";
import { Typography } from "@mui/material";
import { Button, Paper } from "@mui/material";
import Popover from "@mui/material/Popover";
import React from "react";

const Welcome = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(anchorEl);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  console.log(open);

  return (
    <Paper>
      <Button onClick={handleClick}>
        <Avatar />
        <Typography sx={{ padding: 1.5 }}>Buzz</Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Link>Log Out</Link>
      </Popover>
    </Paper>
  );
};

export default Welcome;
