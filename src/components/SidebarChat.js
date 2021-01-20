import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom';
import axios from '../store/axios';
import { getIntial, timeStamp, trimString} from '../utils'
import { useDispatch} from 'react-redux';
import {setMessageView} from '../store/slices/appSlice';
import {Avatar} from '@material-ui/core'

function SidebarChat({currentUser, chat}) {
    const [user, setuser] = useState({});
    const dispatch = useDispatch()


    useEffect(() => {
        let userId = currentUser === chat?.user1 ? chat?.user2 : chat?.user1;
        console.log(userId, "userld")
        if(currentUser){
            axios.get(`/users/${userId.trim()}`).then(res => {
                console.log(res)
                setuser({
                    name: res.data?.username,
                    lastMessage: chat?.messages[0]
                });
            }).catch(err => {
                console.log(err)
            })
        }
       
    }, [chat, currentUser])
   
    return (
             <NavLink 
                onClick={() => dispatch(setMessageView(true))}  
                activeStyle={{ backgroundColor: '#1d4354', color: "#fff" }} 
                to={`/${chat?._id}`} 
                className="sidebar__chat">
                    <div className="chat__avatar">
                        <Avatar className="avatar small__avatar">{getIntial(user?.name || "U")}</Avatar>

                    </div>
                    <div className="content">
                        <div className="content__top">
                            <h6>{trimString( user?.name || "Maru24" , 10)}</h6>
                            <div className="time">{timeStamp(user.lastMessage?.timestamp)}</div>
                        </div>
                        <p>
                           {trimString( user.lastMessage?.text || "last message...", 20)}
                        </p>
                    </div>
              </NavLink>
    )
}

export default SidebarChat
