import "./header.css";

const Header = ({ hanldeLogout, username, connectionStatus }) => {
  return (
    <div className="header">
      <div className="login-info">
        <span>Entrou como {username}</span>
        <button type="button" onClick={hanldeLogout}>
          Sair
        </button>
      </div>
      <span>The WebSocket is currently {connectionStatus}</span>
    </div>
  );
};

export default Header;
