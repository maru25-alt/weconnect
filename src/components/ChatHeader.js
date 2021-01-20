import React, {useEffect , useState} from 'react'
import axios from '../store/axios';
import {getIntial} from '../utils'
import { useDispatch} from 'react-redux';
import {setMessageView} from '../store/slices/appSlice';
import {Avatar, IconButton} from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function ChatHeader({id}) {
    const [user, setuser] = useState(null)
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setloading(true)
         axios.get(`/users/${id}`).then(doc => {
             console.log(doc, "chat")
             setuser({
                 name: doc.data?.username,
                 id: doc.data?._id,
             })
             setloading(false)
         })
         .catch(() => {
            setloading(false) ;
           
        })
    }, [id])

    return (
        <div className="chat__header">
         <button className="btn chatView" onClick={() => dispatch(setMessageView(false))}> 
            <ArrowBackIosIcon/>
         </button>
         {loading ? <div className="d-flex justify-content-end">
                     <div className="spinner-grow spinner-grow-sm"></div>
                     <div className="spinner-grow spinner-grow-sm"></div>
                     <div className="spinner-grow spinner-grow-sm"></div>
         </div> 
         : <>
            <Avatar 
            className="avatar small__avatar">
                {getIntial(user?.name || "U")}
            </Avatar>
            <div className="username">
                <h6>{user?.name || "Username..."}</h6>
                <span>Last seen...</span>
            </div>
         </>}
         <div>
             <IconButton 
             className="btn"
             aria-controls="simple-menu" 
             onClick={handleClick}
             aria-haspopup="true"> 
               <MoreVertIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>UserID</MenuItem>
                <MenuItem onClick={handleClose}>{user?.id || "wjfoodfijojobgjosdfboos"}</MenuItem>
                
                </Menu>
         </div>
    </div>
    )
}

export default ChatHeader
