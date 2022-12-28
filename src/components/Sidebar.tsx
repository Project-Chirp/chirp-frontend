import React from 'react'
import SidebarRows from './SidebarRows.tsx';

//importing the icons for the navbar
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Sidebar() {
  return (
    <div>
        <img className='h-1- w-10' src='https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png' />

        <SidebarRows Icon={HomeIcon} title="Home" />
        <SidebarRows Icon={MailIcon} title="Inbox" />
        <SidebarRows Icon={AccountCircleIcon} title="USer" />
    </div>
  )
}

export default Sidebar
