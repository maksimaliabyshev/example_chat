import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { MakeSocketAction } from "react-redux-socket/client";
import "./App.css";
import { sendMessage } from "./store/messages";

function App(props) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const [message, setMessage] = useState("");

  const handleSendMessage = (message) => () => {
    if (message) dispatch(sendMessage({ value: message }));
    setMessage("");
    executeScroll();
  };

  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });

  return (
    <div className="app" ref={myRef}>
      <h1>Please, open many tabs and open DevConsole</h1>
      <div className="chat">
        <ul>
          {messages.map((m, i) =>
            m.includes("User connect") ? (
              <li style={{ color: "green", fontSize: "0.7em" }} key={i}>
                {m}
              </li>
            ) : m.includes("User leave") ? (
              <li style={{ color: "red", fontSize: "0.7em" }} key={i}>
                {m}
              </li>
            ) : (
              <li key={i}>{m}</li>
            )
          )}
        </ul>
      </div>
      <input
        type="text"
        value={message ?? ""}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage(message)}>Send message</button>
    </div>
  );
}

export default App;
