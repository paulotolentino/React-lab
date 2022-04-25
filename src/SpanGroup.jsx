import React from "react";
import Span from "./Span";

const SpanGroup = ({ value }) => value.split("").map((v) => <Span value={v} />);

// export default React.memo(SpanGroup, (prevProps, nextProps) => {
//   const areEqual = JSON.stringify(prevProps) === JSON.stringify(nextProps);
//   console.log("areEqual", areEqual);
//   return areEqual;
// });

export default SpanGroup;
