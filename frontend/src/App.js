import React from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

function App() {
  const [message, setMessage] = React.useState("");
  const [messageHistory, setMessageHistory] = React.useState([]);
  const [yourName, setYourName] = React.useState("");
  const [step, setStep] = React.useState(1);

  // TODO server IP
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    "ws://192.168.1.34:1337"
  );

  React.useEffect(() => {
    if (lastJsonMessage !== null) {
      console.log(lastJsonMessage);
      setMessageHistory((prev) => prev.concat(lastJsonMessage));
    }
  }, [lastJsonMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="App">
      {step === 1 ? (
        <div className="login-div">
          <form
            autocomplete="off"
            id="login"
            onSubmit={(event) => {
              event.preventDefault();
              setStep(2);
            }}
          >
            <label htmlFor="input-name">Digite seu nome:</label>
            <input
              type="text"
              id="input-name"
              value={yourName}
              onChange={(event) => setYourName(event.target.value)}
            />
            <button type="submit" disabled={!yourName}>
              Entrar
            </button>
          </form>
        </div>
      ) : (
        <>
          <span>Logado como {yourName}</span>
          <span>The WebSocket is currently {connectionStatus}</span>
          <div className="history">
            {messageHistory
              .map((message) => (
                <div
                  className={message.sender === yourName ? "me" : "other"}
                  key={message.id}
                >
                  {message ? message.message : null}
                </div>
              ))
              .reverse()}
          </div>
          <form
            autocomplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              sendJsonMessage({ message, sender: yourName });
              setMessage("");
            }}
          >
            <input
              type="text"
              id="input-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button
              type="submit"
              disabled={readyState !== ReadyState.OPEN || !message}
            >
              Enviar
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default React.memo(App);
