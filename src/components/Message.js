import React from 'react'
import {timeStamp} from '../utils'

function Message({message , currentUser}) {
    return (
        <div className={ currentUser ===  message?.sender ? "message send__message " : "message "}>
            <div>{message?.text || "lorendspo pfkpob kvpkb pkpkfpgbk pkoop bpvokpkbvpk pbpocp"}</div>
            <div className="time">
               {timeStamp(message?.timestamp)}
            </div>
        </div>
    )
}

export default Message
