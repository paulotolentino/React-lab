import "./login.css";

const Login = ({ onSubmit, onChange, isButtonDisabled, username }) => {
  return (
    <div className="login-div">
      <form autoComplete="off" id="login" onSubmit={onSubmit}>
        <label htmlFor="input-name">Digite seu nome:</label>
        <input
          type="text"
          id="input-name"
          value={username}
          onChange={onChange}
        />
        <button type="submit" disabled={isButtonDisabled}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
