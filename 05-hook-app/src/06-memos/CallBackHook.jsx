import { useMemo, useState, useCallback } from "react";
import ShowIncrement from "./ShowIncrement";

const CallBackHook = () => {
  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => {
  setCounter((c) => c + 1);
}, []);

  return (
    <div>
      <h1>useCallBack Hook: {counter} </h1>
      <ShowIncrement increment={increment} />
    </div>
  );
};

export default CallBackHook;
