import React from "react";
import MyContext from "./Context";

const Span3 = () => {
  const { state } = React.useContext(MyContext);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>Type: {state.type}</span>
      <span>Value: {state.value}</span>
      <span>Active: {state.active}</span>
    </div>
  );
};

export default Span3;
