import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Login from "./components/login";
import Header from "./components/header";
import AvailableUsers from "./components/available-users";
import History from "./components/history";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [yourName, setYourName] = useState("");
  const [step, setStep] = useState(1);
  const [wsUrl, setWsUrl] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [specificUser, setSpecificUser] = useState("all");
  const [messageHistoryStack, setMessageHistoryStack] = useState({ all: [] });

  const { sendJsonMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket(wsUrl, {}, !!wsUrl);

  const webSocket = getWebSocket();

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setAvailableUsers(lastJsonMessage.clients);
      if (
        lastJsonMessage.to === yourName ||
        lastJsonMessage.to === "all" ||
        lastJsonMessage.from === yourName
      ) {
        const fromWho =
          lastJsonMessage.to === "all"
            ? "all"
            : lastJsonMessage.to === yourName
            ? lastJsonMessage.from
            : lastJsonMessage.to;
        setMessageHistoryStack((prev) => ({
          ...prev,
          [fromWho]: (prev[fromWho] || []).concat(lastJsonMessage),
        }));
      }
    }
  }, [lastJsonMessage, yourName, setMessageHistoryStack, setAvailableUsers]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const handleLogin = (event) => {
    event.preventDefault();
    setWsUrl("ws://chatbackendps.herokuapp.com");
    setStep(2);
  };

  const hanldeLogout = () => {
    webSocket.close();
    setStep(1);
    setWsUrl("");
    setYourName("");
  };

  const handleChooseUser = (user) => {
    setSpecificUser(user);
  };

  return (
    <div className="App">
      {step === 1 ? (
        <Login
          onSubmit={handleLogin}
          onChange={(event) => setYourName(event.target.value)}
          isButtonDisabled={!yourName}
          username={yourName}
        />
      ) : (
        <section className="container">
          <Header
            hanldeLogout={hanldeLogout}
            username={yourName}
            connectionStatus={connectionStatus}
          />
          <div className="content">
            <AvailableUsers
              availableUsers={availableUsers}
              username={yourName}
              chooseUser={handleChooseUser}
              choosedUser={specificUser}
            />
            <div className="chat-area">
              <History
                username={yourName}
                messageHistory={messageHistoryStack[specificUser]}
              />
              <form
                autoComplete="off"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendJsonMessage({
                    message,
                    from: yourName,
                    to: specificUser,
                  });
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
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
