import React from "react";
import "./App.css";
import SpanGroup from "./SpanGroup";
import { MyContextProvider } from "./Context/Context";
import SpanGroupContext from "./Context/SpanGroup";

function App() {
  const [state, setState] = React.useState({
    value: "Valor 1",
    type: "Tipo 1",
    active: "está ativo",
  });
  const setValue = (newValue) => setState({ ...state, value: newValue });

  return (
    <div className="App">
      <SpanGroup
        value={state.value}
        setValue={setValue}
        type={state.type}
        active={state.active}
      />
      <MyContextProvider>
        <SpanGroupContext />
      </MyContextProvider>
    </div>
  );
}

export default App;
