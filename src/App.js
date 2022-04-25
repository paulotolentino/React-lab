import React from "react";
import Span from "./Span";
// import SpanGroup from "./SpanGroup";
import "./App.css";

function App() {
  const [text, setText] = React.useState("");
  const [textToSpan, setTextToSpan] = React.useState("");
  return (
    <div className="App">
      <Span value={textToSpan} />
      {/* <SpanGroup value={textToSpan} /> */}
      Não Span:
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      Span:
      <input
        type="text"
        value={textToSpan}
        onChange={(event) => setTextToSpan(event.target.value)}
      />
    </div>
  );
}

export default App;
