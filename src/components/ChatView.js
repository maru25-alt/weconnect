import React from 'react'
import Chat from './Chat'
import DefaultView from './DefaultView';

function ChatView({match}) {
    let id = match.params.id;
    return (
        <>
            {id === "default" ?  <DefaultView/>  : <Chat id={id}/>}
        </>
    )
}

export default ChatView
