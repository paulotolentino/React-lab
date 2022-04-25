import React from "react";
import "./App.css";

function App() {
  const [text, setText] = React.useState("");
  const [textToChangeMemiozedFn, setTextToChangeMemiozedFn] =
    React.useState("");
  const fn = () => {};

  const MemoizedFn = React.useCallback(fn, [textToChangeMemiozedFn]);

  React.useEffect(() => {
    console.log("fn has changed");
  }, [fn]);

  React.useEffect(() => {
    console.log("MemoizedFn has changed");
  }, [MemoizedFn]);

  return (
    <div className="App">
      No change MemoizedFn
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      Change MemoizedFn
      <input
        type="text"
        value={textToChangeMemiozedFn}
        onChange={(event) => setTextToChangeMemiozedFn(event.target.value)}
      />
    </div>
  );
}

export default App;
