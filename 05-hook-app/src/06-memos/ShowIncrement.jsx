import React from "react";

const ShowIncrement = ({ increment }) => {
  console.log("Me redibujé :(");
  return (
    <button
      className="btn btn-primary"
      onClick={() => increment()}
    >
      Increment
    </button>
  );
};

export default React.memo(ShowIncrement);