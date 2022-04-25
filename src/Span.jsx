import React from "react";

const Span = ({ value }) => <span>{value}</span>;

// export default React.memo(Span, (prevProps, nextProps) => {
//   const areEqual = JSON.stringify(prevProps) === JSON.stringify(nextProps);
//   console.log("areEqual", areEqual);
//   return areEqual;
// });

export default Span;
