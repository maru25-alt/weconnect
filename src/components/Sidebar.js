import React, {useState, useEffect} from 'react';
import SidebarChat from './SidebarChat';
import AddUser from './AddUserModal';
import axios from '../store/axios';
import { useSelector, useDispatch} from 'react-redux';
import {selectUser, logout} from '../store/slices/userSlice';
import {selectMessageView} from '../store/slices/appSlice'
import UserMenu from './UserMenu'
import SearchIcon from '@material-ui/icons/Search';
import {useHistory } from 'react-router-dom'
import {pusher} from '../store/Pusher'

function Sidebar() {
    const [chats, setchats] = useState([]);
    const user = useSelector(selectUser);
    const view = useSelector(selectMessageView)
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setloading(true)
        axios.get(`/messages/chats/${user?.id}`)
        .then(res => {
             console.log(res.data)
             setchats(res?.data)
             setloading(false)
        })
        .catch(() => {
            setloading(false)
        })
    }, [user])

    useEffect(() => {
        var channel = pusher.subscribe('chatusers');
        channel.bind('InsertedConnection', function(data){
            const newConnection  = data[Object.keys(data)[0]]
            console.log(newConnection);
            setchats([...chats, newConnection[Object.keys(newConnection)[0]]])
        })
    }, [chats])

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        history.push('/signin')
        
    }

    return (
        <div  className={ view  ? `sidebar smallDeviceView` : "sidebar "}>
             <div className="sidebar__header">
                  <UserMenu user={user} handleLogout={handleLogout}/>
                  <AddUser/>
            </div>
            <div className="sidebar__search">
                <form >
                    <SearchIcon/>
                    <input type="text" name="" id="" placeholder="search"/>
                </form>
            </div>
            <div className="sidebar__chats">
                {loading ?  
                <div className="container d-flex justify-content-center">
                     <div className="spinner-grow spinner-grow-sm"></div>
                     <div className="spinner-grow spinner-grow-sm"></div>
                     <div className="spinner-grow spinner-grow-sm"></div>
                </div> : 
                <>
                 {chats && chats.map(res => {
                     return   <SidebarChat  
                               key={res._id} 
                               currentUser={user?.id} 
                               chat={res}/>
                 })}
                </>}
            </div>
        </div>
    )
}

export default Sidebar
