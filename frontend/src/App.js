import React from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

function App() {
  const [message, setMessage] = React.useState("");
  const [messageHistory, setMessageHistory] = React.useState([]);
  const [yourName, setYourName] = React.useState("");
  const [step, setStep] = React.useState(1);
  const [wsUrl, setWsUrl] = React.useState("");

  const { sendJsonMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket(wsUrl, {}, !!wsUrl);

  const webSocket = getWebSocket();

  React.useEffect(() => {
    if (lastJsonMessage !== null) {
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
            autoComplete="off"
            id="login"
            onSubmit={(event) => {
              event.preventDefault();
              setWsUrl("ws://chatbackendps.herokuapp.com");
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
          <div>
            <span>Entrou como {yourName}</span>
            <button
              type="button"
              onClick={() => {
                webSocket.close();
                setStep(1);
                setWsUrl("");
              }}
            >
              Sair
            </button>
          </div>
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
            autoComplete="off"
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
