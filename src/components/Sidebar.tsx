import React from 'react'
import SidebarRows from './SidebarRows.tsx';

//importing the icons for the navbar
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Sidebar() {
  return (
    <div>
        <img style={{width:'50px'}}
        
        src='https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png' alt=""/>

        <SidebarRows Icon={HomeIcon} title="Home" />
        <SidebarRows Icon={MailIcon} title="Inbox" />
        <SidebarRows Icon={AccountCircleIcon} title="User" />
    </div>
  )
}

export default Sidebar
