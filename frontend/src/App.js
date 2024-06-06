import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://localhost:3001/msg"
  )
      .then(res => res.json())
      .then(data => setData(data))
  }, [])
//   useEffect(() => {
//     // Enable pusher logging - don't include this in production
//   const pusher = new Pusher('9ed9a6c45fccf50b1fb9', {
//       cluster: 'eu'
//     });


//     const channel = pusher.subscribe('masseges');
//     channel.bind('inserted', (msg)=> {
   
//       setData([...data,msg])
//     })
   
//  return ()=>{
//    channel.unbind_all();
//    channel.unsubscribe();

//  }
//   }, [data])
  return (
    <div className='App'>
      <div className='app_body'>
        <Sidebar />
        <Chat massge={data} />
      </div>

    </div>
  );
}

export default App;
