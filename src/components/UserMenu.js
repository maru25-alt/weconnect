import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import {getIntial} from '../utils'

export default function SimpleMenu({user, handleLogout}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    handleLogout();
    setAnchorEl(null);
  }

  return (
    <div>
          <Avatar 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick} 
            className="avatar large__avatar">
                {getIntial(user?.username)}
          </Avatar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <div className="container">
             <Avatar className="avatar large__avatar">{getIntial(user?.username)}</Avatar>
             <span>USERNAME:  {user?.username}</span>   <br/>
              <span>USERID: {user?.id}</span>
          </div>
          <div className="container">
               <Button variant="contained"  color="secondary" onClick={onLogout}>Logout</Button>
          </div>
       
      </Menu>
    </div>
  );
}
