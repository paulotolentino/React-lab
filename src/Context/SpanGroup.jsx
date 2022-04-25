import { useContext } from "react";
import SpanArea from "./SpanArea";
import MyContext from "./Context";

const SpanGroup = () => {
  const { setValue, state } = useContext(MyContext);
  return (
    <>
      <SpanArea />
      Input:
      <input
        value={state.value}
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  );
};

export default SpanGroup;
