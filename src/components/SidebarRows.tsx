import { SvgIconTypeMap } from "@mui/material";
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
        <div>
            <Icon />
        </div>
    )
}

export default SidebarRows
