import React, {useState, useEffect, useRef} from 'react'
import Message from './Message'
import axios from '../store/axios';
import { useSelector} from 'react-redux';
import {selectUser} from '../store/slices/userSlice';
import ChatHeader from './ChatHeader';
import {selectMessageView} from '../store/slices/appSlice';
import {useParams} from 'react-router-dom'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import {pusher} from '../store/Pusher';

function Chat() {
    const [messages, setmessages] = useState([]);
    const {id} = useParams();
    const [user2, setuser2] = useState("");
    const user = useSelector(selectUser);
    const [text, settext] = useState("")
    const messagesEndRef = useRef(null)
    const view = useSelector(selectMessageView)
    const [loading, setloading] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
     var channel = pusher.subscribe('messages');
      channel.bind('InsertMessage', function(data){
       const newMessage =(data[Object.keys(data)[0]]);
       console.log(newMessage);
       console.log("new");
       setmessages([...messages, newMessage[Object.keys(newMessage)[0]] ])
   });
   return () => {
    channel.unbind_all();
    channel.unsubscribe();
    };
  }, [messages])


 useEffect(scrollToBottom, []);
    console.log(id , "id")
    useEffect(() => {
            console.log("getting chats")
            setloading(true)
            axios.get(`/messages/chat/${id?.trim()}`)
            .then(doc => {
                if(doc.data.success === false){
                   console.log("ERROR")
                }
                else{
                    console.log(doc, "doc")
                    console.log(user?.id , "user")
                    setmessages(doc.data.messages);
                    if(doc.data?.user1 === user?.id){
                        setuser2(doc.data?.user2)
                    }
                    else{
                        setuser2(doc.data?.user1)
                    }
                }
                setloading(false) 
            })
            .catch(() => {
                setloading(false) ; 
            })
    }, [id, user])
    
    const handleSendMessages = (e) => {
        e.preventDefault();
        if(text){
            axios.put(`/messages/addmessage/${id}` , 
            {messages: [{sender: user?.id, text: text}, ...messages]}).then(res => {
                setmessages(res.data?.messages);
                settext("")
            })
        }
    }
   
    return (
        <div className={view ? "chat" : "chat smallDeviceView"}>
           <ChatHeader id={user2}/>
           <div className="chat__messages">
              {loading ?
               <div className="d-flex justify-content-center">
                     <div className="spinner-grow spinner-grow-sm"></div>
                     <div className="spinner-grow spinner-grow-sm"></div>
                     <div className="spinner-grow spinner-grow-sm"></div>
               </div> 
               :
               <>
                {messages && messages.map(message =>  
                    <Message 
                    key={message?._id}
                    message={message} 
                    currentUser={user?.id}/>)
                    .reverse()} 
                      <div ref={messagesEndRef} />
                </>
                }
               
          </div>
          <div className="chat__sendForm">
          <form 
              onSubmit={handleSendMessages} 
              >
                  <input 
                  value={text} 
                  onChange={e => settext(e.target.value)} 
                  autoFocus={true} 
                  placeholder="Type here..." 
                  type="text" name="" id=""/>
                  <IconButton type="submit" className="btn">
                      <SendIcon/>
                 </IconButton>
              </form>
          </div>
          
        </div>
       
    )
}

export default Chat
