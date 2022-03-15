import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MakeSocketAction } from "react-redux-socket/client";
import "./App.css";
import { sendMessage } from "./store/messages";

function App(props) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const [message, setMessage] = useState({ value: "" });

  const handleSendMessage = (message) => () => {
    const { value } = message;
    dispatch(sendMessage({ value }));
  };
  // const sendMessage = () => {
  //   // dispatch({ type: 'ADD_MESSAGE', payload: message })
  //   console.log("messages: ", messages);
  //   dispatch(
  //     MakeSocketAction({
  //       type: "SEND_MESSAGE",
  //     })
  //   );
  //   setMessage("");
  // };
  return (
    <div className="app">
      <h1>Please, open many tabs and DevConsole</h1>
      <div className="chat">
        <ul>
          {messages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message.value}
        onChange={(e) => setMessage({ value: e.target.value })}
      />
      <button onClick={handleSendMessage(message)}>Send message</button>
    </div>
  );
}

export default App;
