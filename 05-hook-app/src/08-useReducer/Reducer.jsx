import React, { useEffect } from "react";
import { runReducerDemo } from "./intro-reducer";

function Reducer() {
  useEffect(() => {
    runReducerDemo();
  }, []);

  return (
    <div>
      <h1>Reducer App</h1>
    </div>
  );
}

export default Reducer;