import React from "react";
import "./App.css";

function App() {
  const [text, setText] = React.useState("");
  const [textToChangeMemiozedValue, setTextToChangeMemiozedValue] =
    React.useState("");

  const sum = () => {
    const a = textToChangeMemiozedValue;
    if (!a) return 0;
    if (a === "0") return null;
    return Number(a) / 2;
  };

  const memoizedSum = React.useMemo(() => {
    const a = textToChangeMemiozedValue;
    if (!a) return 0;
    if (a === "0") return null;
    return Number(a) / 2;
  }, [textToChangeMemiozedValue]);

  React.useEffect(() => {
    console.log("sum has changed");
  }, [sum]);

  React.useEffect(() => {
    console.log("memoizedSum has changed");
  }, [memoizedSum]);

  return (
    <div className="App">
      <p>{sum()}</p>
      <p>{memoizedSum}</p>
      No change memoizedSum
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      Change memoizedSum
      <input
        type="number"
        value={textToChangeMemiozedValue}
        onChange={(event) => setTextToChangeMemiozedValue(event.target.value)}
      />
    </div>
  );
}

export default App;
