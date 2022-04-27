import "./history.css";

const History = ({ username, messageHistory = [] }) => {
  return (
    <div className="history">
      {messageHistory
        .map((message) => (
          <div
            className={message.from === username ? "me" : "other"}
            key={message.id}
          >
            {message ? message.message : null}
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default History;
