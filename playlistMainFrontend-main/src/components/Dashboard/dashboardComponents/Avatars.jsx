import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function Avatars() {
  return (
    <AvatarGroup style={{height: '20px'}}>
      <Avatar sx={{ bgcolor: deepOrange[500], width:'25px', height: '25px'}}>A</Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500],width:'25px', height: '25px' }}>R</Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500],width:'25px', height: '25px' }}>N</Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500],width:'25px', height: '25px' }}>A</Avatar>
    </AvatarGroup>
  );
}
  


