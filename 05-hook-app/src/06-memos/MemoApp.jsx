import {useMemo, useState} from "react";
import Small from "./Small";

const printXtimes = (times) =>{
    for (let i = 0; i < times; i++) {
        console.log("Impreso " + times + " veces");
    }
}

const MemoApp = () => {
  const [value, setValue] = useState(0);

  const memoizedValue = useMemo(()=>  printXtimes(value), []);

 
  return (
    <div>
      <h1>Im memo parent</h1>
      <p>
        Im a child, named <Small value={"Andrew"} />
      </p>
      <b>Score: {value}</b>
      <hr />
      <button 
      className="btn btn-primary"
      onClick={() => setValue((c) => c+1)}
      >Change score</button>


      <p className="">{value} iterations</p>
    </div>
  );
};

export default MemoApp;
