import "./available-users.css";

const AvailableUsers = ({
  availableUsers,
  username,
  chooseUser,
  choosedUser,
}) => {
  return (
    <div className="available-users">
      <span
        className={"all" === choosedUser ? "selected" : ""}
        onClick={() => chooseUser("all")}
      >
        Todos
      </span>
      {availableUsers.map((user) => (
        <span
          className={
            user === username ? "hide" : user === choosedUser ? "selected" : ""
          }
          key={user}
          onClick={() => chooseUser(user)}
        >
          {user}
        </span>
      ))}
    </div>
  );
};

export default AvailableUsers;
