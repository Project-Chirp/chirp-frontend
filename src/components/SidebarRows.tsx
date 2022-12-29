import { Button, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
import { Link as Routerlink } from "react-router-dom";

//interface is a way of defining a type
interface SidebarRowProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  title: string;
  link: string;
}

function SidebarRows({ Icon, title, link }: SidebarRowProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "30px" }}>
      <Button component={Routerlink} to={link} sx={{ color: "black" }}>
        <Icon className="h-6 w-6" />
        <Typography
          variant="h1"
          fontFamily={"Inter"}
          fontSize={15}
          paddingLeft={2}
        >
          {title}
        </Typography>
      </Button>
    </div>
  );
}

export default SidebarRows;
