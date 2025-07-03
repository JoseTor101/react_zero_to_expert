import useCounter from "../hooks/useCounter";

const CounterWithCustomHook = () => {
  const { counter, increment, decrement, reset } = useCounter(20);

  return (
    <>
        <h1>Counter with Hook: {counter}</h1>
        <hr />
        <button className="btn btn-primary" onClick={increment}>+1</button>
        <button className="btn btn-primary" onClick={reset}>Reset</button>
        <button className="btn btn-primary" onClick={decrement}>-1</button>
    </>
  );
};

export default CounterWithCustomHook;
