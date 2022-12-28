import { SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, {SVGProps} from "react";

//interface is a way of defining a type
interface Props{
    Icon:( OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; })// => JSX.Element
    title: string
}

function SidebarRows({Icon,title}:Props)
{
    return(
        <div style={{display:'flex',alignItems:'center',margin:'30px'}}>
            <Icon className="h-6 w-6"/>
            <Typography variant='h1' fontFamily={'Inter'} fontSize={15} paddingLeft={2}>{title}</Typography>
        </div>
    )
}

export default SidebarRows
