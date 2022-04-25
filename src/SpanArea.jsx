import Span3 from "./Span3";

const SpanArea = (props) => {
  return (
    <div>
      <Span3 value={props.value} type={props.type} active={props.active} />
    </div>
  );
};

export default SpanArea;
