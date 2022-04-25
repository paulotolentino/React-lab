import SpanArea from "./SpanArea";

const SpanGroup = (props) => {
  return (
    <>
      <SpanArea value={props.value} type={props.type} active={props.active} />
      Input:
      <input
        type="text"
        value={props.value}
        onChange={(event) => props.setValue(event.target.value)}
      />
    </>
  );
};

export default SpanGroup;
