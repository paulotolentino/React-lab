const Span3 = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>Type: {props.type}</span>
      <span>Value: {props.value}</span>
      <span>Active: {props.active}</span>
    </div>
  );
};

export default Span3;
