import './App.css';

import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    dispatch({ type: 'ADD_MESSAGE', payload: message })
    console.log('messages: ', messages);
    setMessage('');
  }
  return (
    <div className="app">
        <div className="chat">
          <ul>
            <li>messgae1</li>
            <li>messgae2</li>
            <li>messgae3</li>
          </ul>
        </div>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
        <button onClick={()=>sendMessage()}>Send message</button>
    </div>
  );
}

export default App;
