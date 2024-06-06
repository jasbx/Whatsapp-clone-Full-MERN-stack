import React from 'react';
import './chat.css';
import {useState} from 'react'
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import TagFacesIcon from '@mui/icons-material/TagFaces';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import LinkIcon from '@mui/icons-material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
const Chat = ({massge}) => {
  const [input,SetMsg]=useState("")
  const senMassege= async(e)=>{
    e.preventDefault();
  await axios.post('http://localhost:3001/new/msg/',{
     name:"APP DEMO",
     message:input,
     recived:false,
     timestamps:"just Now !"
   })
   window.location.reload()

   SetMsg("")

  }
  
  return (
    <div className='chat'>
  <div className='chat_header'>
   <Avatar
   src='data:image/jpeg;base64,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'
   />
   <div className='chat_header_info'>
    <h3>Mr Meew</h3>
    <p className='active'>Active Now</p>
   </div>

   <div className='chat_header_right'>
   <SearchIcon className='icon'/>
    
    <LinkIcon className='icon'/>
    <MoreVertIcon className='icon'/>
   </div>
   
  </div>
  <div className='chat_body'>
    {massge.map((msg)=>
( <p className={`chat_name ${msg.recived && 'chat_resever'}`}>
 <span className='chat_msg'>{msg.name}</span>
{msg.message}
 <span className='chat_time'>
   {msg.timestamps}
 </span>
 
 
 </p>
    ))}
  </div>
  <div className='chat_footer'>
    <TagFacesIcon/>
    <form >
      <input type="text" value={input} placeholder='Type a message...' onChange={(e)=>SetMsg(e.target.value)}></input>
      <button
      type="submit"
      
      onClick={senMassege}
      >
        send a messgae
      </button>
    </form>
    <KeyboardVoiceIcon/>
  </div>
    </div>
  )
}

export default Chat
